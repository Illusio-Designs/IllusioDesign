/**
 * Trigger a Phusion Passenger restart of the cPanel Node app.
 *
 * cPanel's "Setup Node.js App" runs each app under Passenger, which watches
 * the app's `tmp/restart.txt` file. Updating that file's mtime makes
 * Passenger gracefully recycle the workers on the next inbound request.
 *
 * This script uploads a fresh `tmp/restart.txt` over explicit FTPS — that
 * upload bumps the mtime, which is all Passenger needs.
 *
 * Pure Node.js — no dependencies (built-in `net` + `tls`), so the deploy
 * workflow does NOT need to `npm install` anything for this step.
 *
 * Env vars (set by the GitHub Actions workflow):
 *   FTP_HOST / FTP_SERVER   — FTP hostname
 *   FTP_PORT                — default 21
 *   FTP_USER / FTP_USERNAME — FTP account
 *   FTP_PASSWORD / FTP_PASS — FTP password
 *   FTP_BASE_DIR            — app root on the server (default "/")
 */

import net from "net";
import tls from "tls";

const config = {
  host: process.env.FTP_HOST || process.env.FTP_SERVER || "ftp.illusiodesigns.agency",
  port: Number(process.env.FTP_PORT || 21),
  user: process.env.FTP_USER || process.env.FTP_USERNAME || "Riya@illusiodesigns.agency",
  password: process.env.FTP_PASSWORD || process.env.FTP_PASS || "Rishi@1995",
  baseDir: process.env.FTP_BASE_DIR || "/",
};

// Absolute path of the file Passenger watches: <baseDir>/tmp/restart.txt
const restartFile = (config.baseDir.replace(/\/+$/, "") + "/tmp/restart.txt").replace(/\/{2,}/g, "/");

// Hard watchdog — the script must never hang a CI job.
const WATCHDOG_MS = 45000;
const watchdog = setTimeout(() => {
  console.error(`\n❌ Timed out after ${WATCHDOG_MS / 1000}s — aborting.`);
  process.exit(1);
}, WATCHDOG_MS);
watchdog.unref();

/** Reads FTP control replies, resolving one complete (possibly multi-line) reply at a time. */
function makeReplyReader(socket) {
  let buffer = "";
  const waiters = [];

  function tryResolve() {
    const lines = buffer.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const m = /^(\d{3}) /.exec(lines[i]);
      if (m) {
        const replyLines = lines.slice(0, i + 1);
        buffer = lines.slice(i + 1).join("\n");
        const waiter = waiters.shift();
        if (waiter) waiter.resolve({ code: Number(m[1]), text: replyLines.join("\n") });
        return tryResolve();
      }
    }
  }

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    tryResolve();
  });

  return () => new Promise((resolve) => {
    waiters.push({ resolve });
    tryResolve();
  });
}

function send(socket, command) {
  console.log("> " + (/^PASS /.test(command) ? "PASS ***" : command));
  socket.write(command + "\r\n");
}

async function command(socket, readReply, cmd, expected) {
  send(socket, cmd);
  const reply = await readReply();
  console.log("< " + reply.text);
  if (expected && !expected.includes(reply.code)) {
    throw new Error(`Unexpected reply ${reply.code} to "${cmd}"`);
  }
  return reply;
}

function parsePasv(text) {
  const m = /(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)/.exec(text);
  if (!m) throw new Error("Could not parse PASV reply: " + text);
  return { ip: `${m[1]}.${m[2]}.${m[3]}.${m[4]}`, port: Number(m[5]) * 256 + Number(m[6]) };
}

async function main() {
  console.log(`Triggering Passenger restart → ${config.host}:${config.port}  ${restartFile}`);

  // 1. Plain TCP connect, read banner.
  let control = net.connect({ host: config.host, port: config.port });
  await new Promise((res, rej) => {
    control.once("connect", res);
    control.once("error", rej);
  });
  control.setEncoding("utf8");
  let readReply = makeReplyReader(control);
  console.log("< " + (await readReply()).text);

  // 2. Explicit FTPS: upgrade the control channel to TLS.
  await command(control, readReply, "AUTH TLS", [234]);
  control = tls.connect({ socket: control, host: config.host, rejectUnauthorized: false });
  await new Promise((res, rej) => {
    control.once("secureConnect", res);
    control.once("error", rej);
  });
  control.setEncoding("utf8");
  readReply = makeReplyReader(control);
  const tlsSession = control.getSession();

  try {
    // 3. Authenticate + protect the data channel.
    await command(control, readReply, "USER " + config.user, [331, 230]);
    await command(control, readReply, "PASS " + config.password, [230]);
    await command(control, readReply, "PBSZ 0", [200]);
    await command(control, readReply, "PROT P", [200]);
    await command(control, readReply, "TYPE I", [200]);

    // 4. Make sure the tmp/ directory exists (ignore "already exists").
    const tmpDir = restartFile.slice(0, restartFile.lastIndexOf("/")) || "/";
    send(control, "MKD " + tmpDir);
    console.log("< " + (await readReply()).text);

    // 5. Passive mode + plain TCP data connection.
    const pasv = await command(control, readReply, "PASV", [227]);
    const { ip, port } = parsePasv(pasv.text);
    const dataPlain = net.connect({ host: ip, port });
    await new Promise((res, rej) => {
      dataPlain.once("connect", res);
      dataPlain.once("error", rej);
    });

    // 6. Send STOR first — Pure-FTPd accepts the data socket only after it
    //    sees the command — then TLS-wrap the data channel.
    send(control, "STOR " + restartFile);
    const payload = Buffer.from(`restart requested ${new Date().toISOString()}\n`);

    const data = tls.connect({
      socket: dataPlain,
      host: config.host,
      rejectUnauthorized: false,
      session: tlsSession, // session reuse required by Pure-FTPd
    });
    data.on("error", (e) => console.error("(data channel error: " + e.message + ")"));
    data.once("secureConnect", () => console.log("(data channel secured)"));
    // Writes are buffered by the TLS socket until the handshake completes,
    // so writing now (rather than waiting on 'secureConnect') is safe and
    // avoids any chance of missing that event.
    data.write(payload);
    data.end();

    const dataClosed = new Promise((res) => data.once("close", res));

    const open = await readReply(); // 150 / 125 Opening data connection
    console.log("< " + open.text);
    if (![150, 125].includes(open.code)) {
      throw new Error(`Unexpected reply ${open.code} to STOR`);
    }

    // The 226 on the control channel is the authoritative "upload done"
    // signal; also wait for the data socket to close so we exit cleanly.
    const done = await readReply(); // 226 Transfer complete
    console.log("< " + done.text);
    if (done.code !== 226 && done.code !== 250) {
      throw new Error(`Upload not confirmed (reply ${done.code})`);
    }
    await Promise.race([dataClosed, new Promise((r) => setTimeout(r, 3000))]);

    await command(control, readReply, "QUIT");
    console.log(`\n✅ Passenger restart triggered (${restartFile} updated).`);
  } catch (err) {
    console.error("\n❌ Restart trigger FAILED:", err.message);
    process.exitCode = 1;
  } finally {
    clearTimeout(watchdog);
    control.end();
  }
}

main().catch((err) => {
  console.error("\n❌ Could not connect:", err.message);
  clearTimeout(watchdog);
  process.exitCode = 1;
});
