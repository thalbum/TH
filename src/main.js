import '../styles/main.css';
import '../styles/album.css';
import '../styles/responsive.css';
import { album, photos } from './config.js';
import { buildPages, renderPages, coverFace, placeholderSrc } from './album.js';
import { createBook } from './pageFlip.js';
import { initNav } from './chapters.js';
import { initLightbox } from './lightbox.js';

const $ = s => document.querySelector(s);
document.title = `${album.title} — Photo Album`;

// Missing photographs fall back to a labelled placeholder (never a broken icon).
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName !== 'IMG' || t.dataset.fallback) return;
  const fig = t.closest('[data-id]');
  const p = fig && photos.find(x => x.id === +fig.dataset.id);
  if (p) { t.dataset.fallback = '1'; t.src = placeholderSrc(p); fig.classList.add('is-placeholder'); }
}, true);

// Opening screen
$('#cover-3d .cover-slot').innerHTML = coverFace();
const bk = $('#bk'), stage3d = $('#opening');
stage3d.addEventListener('pointermove', e => {
  const r = stage3d.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  bk.style.setProperty('--ry', `${-22 + x * 20}deg`); bk.style.setProperty('--rx', `${-y * 14}deg`);
});

const pages = buildPages();
const els = renderPages(pages);
$('#book').replaceChildren();
let book = null, nav = null;

function updateUI(idx) {
  const portrait = book.portrait;
  const n = pages.length;
  let label;
  if (idx === 0) label = 'Cover';
  else if (idx >= n - 1) label = 'Back cover';
  else label = portrait ? `Page ${idx}` : `Pages ${idx % 2 ? idx : idx - 1}–${idx % 2 ? idx + 1 : idx}`;
  $('#indicator').textContent = label;
  $('#prev').disabled = idx === 0; $('#next').disabled = idx >= n - 1;
  const stage = $('.book-stage');
  const prog = idx / (n - 1);
  stage.style.setProperty('--left-edge', `${(prog * 12).toFixed(1)}px`);
  stage.style.setProperty('--right-edge', `${((1 - prog) * 12).toFixed(1)}px`);
  stage.dataset.pos = idx === 0 ? 'front' : idx >= n - 1 ? 'back' : 'mid';
  stage.dataset.orient = portrait ? 'portrait' : 'landscape';
  const blk = document.querySelector('#book .stf__block');
  if (blk) {
    // The flip block is wider than the visible pages, so measure the real spread.
    const pw = Math.min(blk.offsetWidth / (portrait ? 1 : 2), blk.offsetHeight * 560 / 760);
    const cx = blk.offsetLeft + blk.offsetWidth / 2, half = portrait ? pw / 2 : pw;
    const bookEl = $('#book');
    bookEl.style.setProperty('--bl', (cx - half) + 'px');
    bookEl.style.setProperty('--bw', (half * 2) + 'px');
    stage.style.setProperty('--shift', (portrait ? 0 : pw / 2) + 'px');
  }
  nav && nav.update(idx);
}

function startReader() {
  $('#reader').hidden = false;
  if (!book) {
    book = createBook($('#book'), els, { onFlip: updateUI });
    nav = initNav(pages, book);
    initLightbox();
    $('#prev').onclick = () => book.prev();
    $('#next').onclick = () => book.next();
    $('#home').onclick = () => book.goTo(0);
    $('#thumbs-toggle').onclick = e => { const o = $('#thumbs').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
    addEventListener('resize', () => updateUI(book.index));
  }
  updateUI(0);
}

$('#btn-open').addEventListener('click', () => {
  $('#opening').classList.add('opening-now');
  const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1250;
  setTimeout(() => {
    startReader();
    $('#opening').classList.add('gone');
    setTimeout(() => { $('#opening').hidden = true; book.next(); }, 700);
  }, delay);
});
$('#cover-3d').addEventListener('click', () => $('#btn-open').click());

document.addEventListener('keydown', e => {
  if (!book || $('#reader').hidden || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { book.next(); e.preventDefault(); }
  else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { book.prev(); e.preventDefault(); }
  else if (e.key === 'Home') book.goTo(0);
  else if (e.key === 'End') book.goTo(pages.length - 1);
  else if (e.key === 't') $('#thumbs-toggle').click();
});
window.__album = { pages, get book() { return book; } };
