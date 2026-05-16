'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Full-featured WYSIWYG editor built on contentEditable — no external deps.
 * Controlled via `value` (HTML string) / `onChange`.
 */

const FONTS = ['Poppins', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Tahoma', 'Segoe UI'];
const SIZES = ['10', '12', '14', '16', '18', '24', '32', '48'];
const BLOCKS = [
  ['P', 'Paragraph'],
  ['H1', 'Heading 1'],
  ['H2', 'Heading 2'],
  ['H3', 'Heading 3'],
  ['H4', 'Heading 4'],
  ['BLOCKQUOTE', 'Quote'],
  ['PRE', 'Code block'],
];

/* Compact icon set */
const Svg = (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p} />;
const ic = {
  alignLeft: <Svg><path d="M3 6h18M3 12h12M3 18h15" /></Svg>,
  alignCenter: <Svg><path d="M3 6h18M6 12h12M5 18h14" /></Svg>,
  alignRight: <Svg><path d="M3 6h18M9 12h12M6 18h15" /></Svg>,
  alignJustify: <Svg><path d="M3 6h18M3 12h18M3 18h18" /></Svg>,
  ul: <Svg><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></Svg>,
  ol: <Svg><path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4l2-3H4" /></Svg>,
  outdent: <Svg><path d="M21 6H3M21 12H11M21 18H3M7 9l-4 3 4 3" /></Svg>,
  indent: <Svg><path d="M3 6h18M13 12h8M3 18h18M3 9l4 3-4 3" /></Svg>,
  link: <Svg><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></Svg>,
  unlink: <Svg><path d="M18.84 12.25l1.72-1.71a4 4 0 0 0-5.66-5.66l-1.71 1.72M5.17 11.75l-1.72 1.71a4 4 0 0 0 5.66 5.66l1.71-1.72M2 2l20 20" /></Svg>,
  image: <Svg><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></Svg>,
  video: <Svg><rect x="2" y="5" width="14" height="14" rx="2" /><path d="M22 8l-6 4 6 4V8z" /></Svg>,
  audio: <Svg><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></Svg>,
  table: <Svg><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></Svg>,
  hr: <Svg><path d="M3 12h18" /></Svg>,
  clear: <Svg><path d="M4 7V4h16v3M9 20h6M12 4v16" /><path d="M3 3l18 18" /></Svg>,
  code: <Svg><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></Svg>,
  print: <Svg><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></Svg>,
  expand: <Svg><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></Svg>,
  collapse: <Svg><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /></Svg>,
  undo: <Svg><path d="M3 7v6h6M3 13a9 9 0 1 0 3-7l-3 3" /></Svg>,
  redo: <Svg><path d="M21 7v6h-6M21 13a9 9 0 1 1-3-7l3 3" /></Svg>,
};

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start writing…',
  minHeight = 280,
}) {
  const ref = useRef(null);
  const savedRange = useRef(null);
  const [active, setActive] = useState({});
  const [block, setBlock] = useState('P');
  const [foreColor, setForeColor] = useState('#0d0d0d');
  const [hiliteColor, setHiliteColor] = useState('#ffe9a8');
  const [codeView, setCodeView] = useState(false);
  const [full, setFull] = useState(false);

  // Push external value into the DOM only when it genuinely differs.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = value || '';
    if (next === el.innerHTML) return;
    if (next === '' && (el.innerHTML === '' || el.innerHTML === '<br>')) return;
    el.innerHTML = next;
  }, [value]);

  const emit = useCallback(() => {
    let html = ref.current?.innerHTML || '';
    if (html === '<br>' || html === '<div><br></div>' || html === '<p><br></p>') html = '';
    onChange?.(html);
  }, [onChange]);

  const saveSel = useCallback(() => {
    const sel = typeof window !== 'undefined' ? window.getSelection() : null;
    if (sel && sel.rangeCount && ref.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSel = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    const r = savedRange.current;
    if (r && sel && el.contains(r.commonAncestorContainer)) {
      sel.removeAllRanges();
      sel.addRange(r);
    }
  }, []);

  const refresh = useCallback(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode || !el.contains(sel.anchorNode)) return;
    saveSel();
    const st = (c) => { try { return document.queryCommandState(c); } catch { return false; } };
    let b = '';
    try { b = (document.queryCommandValue('formatBlock') || '').toUpperCase(); } catch {}
    setBlock(b || 'P');
    setActive({
      bold: st('bold'), italic: st('italic'), underline: st('underline'),
      strikeThrough: st('strikeThrough'), subscript: st('subscript'), superscript: st('superscript'),
      insertUnorderedList: st('insertUnorderedList'), insertOrderedList: st('insertOrderedList'),
      justifyLeft: st('justifyLeft'), justifyCenter: st('justifyCenter'),
      justifyRight: st('justifyRight'), justifyFull: st('justifyFull'),
    });
  }, [saveSel]);

  useEffect(() => {
    document.addEventListener('selectionchange', refresh);
    return () => document.removeEventListener('selectionchange', refresh);
  }, [refresh]);

  const exec = useCallback((cmd, arg) => {
    restoreSel();
    try { document.execCommand(cmd, false, arg); } catch {}
    emit();
    refresh();
  }, [restoreSel, emit, refresh]);

  const insertHTML = useCallback((html) => {
    restoreSel();
    try { document.execCommand('insertHTML', false, html); } catch {}
    emit();
    refresh();
  }, [restoreSel, emit, refresh]);

  const setFont = (font) => exec('fontName', font);

  const setSize = (px) => {
    restoreSel();
    try {
      document.execCommand('fontSize', false, '7');
      ref.current?.querySelectorAll('font[size="7"]').forEach((f) => {
        f.removeAttribute('size');
        f.style.fontSize = `${px}px`;
      });
    } catch {}
    emit();
  };

  const setBlockFmt = (tag) => exec('formatBlock', tag);

  const addLink = () => {
    const url = window.prompt('Link URL:', 'https://');
    if (url) exec('createLink', url.trim());
  };

  const addImage = () => {
    const url = window.prompt('Image URL:');
    if (url) insertHTML(`<img src="${url.trim()}" alt="" style="max-width:100%" />`);
  };

  const addVideo = () => {
    const url = window.prompt('Video URL (YouTube, Vimeo or .mp4):');
    if (!url) return;
    const yt = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    const vm = url.match(/vimeo\.com\/(\d+)/);
    let embed;
    if (yt) embed = `<div class="rte-embed"><iframe src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen></iframe></div>`;
    else if (vm) embed = `<div class="rte-embed"><iframe src="https://player.vimeo.com/video/${vm[1]}" frameborder="0" allowfullscreen></iframe></div>`;
    else embed = `<video controls src="${url.trim()}" style="max-width:100%"></video>`;
    insertHTML(`${embed}<p><br></p>`);
  };

  const addAudio = () => {
    const url = window.prompt('Audio URL (.mp3 / .wav):');
    if (url) insertHTML(`<audio controls src="${url.trim()}"></audio><p><br></p>`);
  };

  const addTable = () => {
    const r = parseInt(window.prompt('Number of rows:', '2'), 10);
    const c = parseInt(window.prompt('Number of columns:', '2'), 10);
    if (!r || !c || r < 1 || c < 1) return;
    let h = '<table class="rte-table"><tbody>';
    for (let i = 0; i < r; i += 1) {
      h += '<tr>';
      for (let j = 0; j < c; j += 1) h += '<td><br></td>';
      h += '</tr>';
    }
    h += '</tbody></table><p><br></p>';
    insertHTML(h);
  };

  const print = () => {
    const w = window.open('', '_blank', 'width=900,height=650');
    if (!w) return;
    w.document.write(`<html><head><title>Document</title></head><body>${ref.current?.innerHTML || ''}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); w.close(); }, 200);
  };

  const tb = (title, on, node, activeKey) => (
    <button
      type="button"
      title={title}
      className={`rte-btn ${activeKey && active[activeKey] ? 'is-active' : ''}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={on}
    >
      {node}
    </button>
  );

  return (
    <div className={`rte ${full ? 'rte-full' : ''}`}>
      <div className="rte-toolbar">
        <div className="rte-group">
          {tb('Bold', () => exec('bold'), <b>B</b>, 'bold')}
          {tb('Italic', () => exec('italic'), <i>I</i>, 'italic')}
          {tb('Underline', () => exec('underline'), <u>U</u>, 'underline')}
          {tb('Strikethrough', () => exec('strikeThrough'), <s>S</s>, 'strikeThrough')}
          {tb('Subscript', () => exec('subscript'), <span>X<sub>2</sub></span>, 'subscript')}
          {tb('Superscript', () => exec('superscript'), <span>X<sup>2</sup></span>, 'superscript')}
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          <select className="rte-select" value="" onMouseDown={saveSel} onChange={(e) => { if (e.target.value) setFont(e.target.value); e.target.value = ''; }} title="Font family">
            <option value="">Font</option>
            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select className="rte-select rte-select-sm" value="" onMouseDown={saveSel} onChange={(e) => { if (e.target.value) setSize(e.target.value); e.target.value = ''; }} title="Font size">
            <option value="">Size</option>
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          <label className="rte-color" title="Text color" onMouseDown={saveSel}>
            <span className="rte-color-A">A</span>
            <span className="rte-color-bar" style={{ background: foreColor }} />
            <input type="color" value={foreColor} onChange={(e) => { setForeColor(e.target.value); exec('foreColor', e.target.value); }} />
          </label>
          <label className="rte-color" title="Highlight color" onMouseDown={saveSel}>
            <span className="rte-color-A rte-color-hl">A</span>
            <span className="rte-color-bar" style={{ background: hiliteColor }} />
            <input type="color" value={hiliteColor} onChange={(e) => { setHiliteColor(e.target.value); exec('backColor', e.target.value); }} />
          </label>
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          <select className="rte-select" value={block} onMouseDown={saveSel} onChange={(e) => setBlockFmt(e.target.value)} title="Paragraph format">
            {BLOCKS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          {tb('Align left', () => exec('justifyLeft'), ic.alignLeft, 'justifyLeft')}
          {tb('Align center', () => exec('justifyCenter'), ic.alignCenter, 'justifyCenter')}
          {tb('Align right', () => exec('justifyRight'), ic.alignRight, 'justifyRight')}
          {tb('Justify', () => exec('justifyFull'), ic.alignJustify, 'justifyFull')}
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          {tb('Numbered list', () => exec('insertOrderedList'), ic.ol, 'insertOrderedList')}
          {tb('Bullet list', () => exec('insertUnorderedList'), ic.ul, 'insertUnorderedList')}
          {tb('Decrease indent', () => exec('outdent'), ic.outdent)}
          {tb('Increase indent', () => exec('indent'), ic.indent)}
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          {tb('Insert link', addLink, ic.link)}
          {tb('Remove link', () => exec('unlink'), ic.unlink)}
          {tb('Insert image', addImage, ic.image)}
          {tb('Insert video', addVideo, ic.video)}
          {tb('Insert audio', addAudio, ic.audio)}
          {tb('Insert table', addTable, ic.table)}
          {tb('Horizontal rule', () => exec('insertHorizontalRule'), ic.hr)}
        </div>
        <span className="rte-divider" />

        <div className="rte-group">
          {tb('Clear formatting', () => exec('removeFormat'), ic.clear)}
          {tb('Undo', () => exec('undo'), ic.undo)}
          {tb('Redo', () => exec('redo'), ic.redo)}
          {tb('Print', print, ic.print)}
          <button
            type="button"
            title={codeView ? 'Visual editor' : 'Source code'}
            className={`rte-btn ${codeView ? 'is-active' : ''}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setCodeView((v) => !v)}
          >
            {ic.code}
          </button>
          <button
            type="button"
            title={full ? 'Exit fullscreen' : 'Fullscreen'}
            className={`rte-btn ${full ? 'is-active' : ''}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setFull((v) => !v)}
          >
            {full ? ic.collapse : ic.expand}
          </button>
        </div>
      </div>

      {/* Editable surface stays mounted so its content is never lost when
          toggling the source view; only its visibility changes. */}
      <div
        ref={ref}
        className="rte-area prose"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        style={{ minHeight, display: codeView ? 'none' : 'block' }}
        onInput={emit}
        onBlur={emit}
        onKeyUp={refresh}
        onMouseUp={refresh}
      />
      {codeView ? (
        <textarea
          className="rte-code"
          style={{ minHeight }}
          value={value}
          spellCheck={false}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : null}
    </div>
  );
}
