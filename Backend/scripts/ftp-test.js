/**
 * FTP / explicit FTPS connection tester + directory lister
 * Pure Node.js — no dependencies (uses built-in `net` and `tls`).
 *
 * Run (from the Backend/ directory):
 *   node scripts/ftp-test.js            # lists "/"
 *   node scripts/ftp-test.js /uploads   # lists a specific remote path
 *
 * Optionally override credentials via env vars:
 *   FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS
 */

import net from "net";
import tls from "tls";

const config = {
  host: process.env.FTP_HOST || "ftp.illusiodesigns.agency",
  port: Number(process.env.FTP_PORT || 21),
  user: process.env.FTP_USER || "Riya@illusiodesigns.agency",
  password: process.env.FTP_PASS || "Rishi@1995",
};

const remotePath = process.argv[2] || "/";

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
        const reply = { code: Number(m[1]), text: replyLines.join("\n") };
        if (waiter) waiter.resolve(reply);
        return tryResolve();
      }
    }
  }

  socket.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    tryResolve();
  });

  return () =>
    new Promise((resolve) => {
      waiters.push({ resolve });
      tryResolve();
    });
}

function send(socket, command) {
  const shown = /^PASS /.test(command) ? "PASS ***" : command;
  console.log("> " + shown);
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
  const ip = `${m[1]}.${m[2]}.${m[3]}.${m[4]}`;
  const port = Number(m[5]) * 256 + Number(m[6]);
  return { ip, port };
}

async function main() {
  console.log("Connecting with:", { host: config.host, port: config.port, user: config.user });

  // 1. Plain TCP connect to the control channel.
  let control = net.connect({ host: config.host, port: config.port });
  await new Promise((res, rej) => {
    control.once("connect", res);
    control.once("error", rej);
  });
  control.setEncoding("utf8");
  let readReply = makeReplyReader(control);

  // 2. Read welcome banner.
  const banner = await readReply();
  console.log("< " + banner.text);

  // 3. Explicit FTPS: upgrade the control channel to TLS.
  await command(control, readReply, "AUTH TLS", [234]);
  control = tls.connect({
    socket: control,
    host: config.host,
    rejectUnauthorized: false, // accept self-signed / mismatched cert
  });
  await new Promise((res, rej) => {
    control.once("secureConnect", res);
    control.once("error", rej);
  });
  console.log("(control channel secured with TLS)");
  control.setEncoding("utf8");
  readReply = makeReplyReader(control);
  const tlsSession = control.getSession();

  try {
    // 4. Authenticate.
    await command(control, readReply, "USER " + config.user, [331, 230]);
    await command(control, readReply, "PASS " + config.password, [230]);
    console.log("\n✅ LOGIN SUCCESSFUL");

    // 5. Protect the data channel.
    await command(control, readReply, "PBSZ 0", [200]);
    await command(control, readReply, "PROT P", [200]);
    await command(control, readReply, "TYPE A", [200]);
    await command(control, readReply, "PWD");

    // 6. Enter passive mode and open the plain TCP data connection.
    const pasv = await command(control, readReply, "PASV", [227]);
    const { ip, port } = parsePasv(pasv.text);

    const dataPlain = net.connect({ host: ip, port });
    await new Promise((res, rej) => {
      dataPlain.once("connect", res);
      dataPlain.once("error", rej);
    });

    // 7. Send LIST FIRST. Pure-FTPd does not accept() the data connection
    //    (and so won't start the TLS handshake) until it receives LIST —
    //    awaiting the data-channel TLS handshake before this would deadlock.
    send(control, "LIST " + remotePath);

    // Now wrap the data socket in TLS, reusing the control channel's TLS
    // session (Pure-FTPd requires session reuse on the data channel).
    const data = tls.connect({
      socket: dataPlain,
      host: config.host,
      rejectUnauthorized: false,
      session: tlsSession,
    });

    let listing = "";
    data.on("data", (c) => (listing += c.toString("utf8")));
    const dataDone = new Promise((res) => data.once("close", res));

    const open = await readReply(); // 150 / 125 Opening data connection
    console.log("< " + open.text);
    if (![150, 125].includes(open.code)) {
      throw new Error(`Unexpected reply ${open.code} to LIST`);
    }

    await dataDone;
    const after = await readReply(); // 226 Transfer complete
    console.log("< " + after.text);

    console.log(`\nDirectory listing for "${remotePath}":`);
    const rows = listing.split(/\r?\n/).filter(Boolean);
    if (rows.length === 0) console.log("  (empty)");
    else rows.forEach((r) => console.log("  " + r));

    await command(control, readReply, "QUIT");
  } catch (err) {
    console.error("\n❌ FAILED:", err.message);
    process.exitCode = 1;
  } finally {
    control.end();
  }
}

main().catch((err) => {
  console.error("\n❌ CONNECTION FAILED:", err.message);
  process.exitCode = 1;
});
