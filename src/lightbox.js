import { photos } from './config.js';
import { placeholderSrc, formatDate, esc } from './album.js';

export function initLightbox() {
  const lb = document.getElementById('lightbox');
  const img = lb.querySelector('img'), cap = lb.querySelector('.lb-cap');
  let cur = 0;
  const show = i => {
    cur = (i + photos.length) % photos.length;
    const p = photos[cur];
    img.onerror = () => { img.onerror = null; img.src = placeholderSrc(p); };
    img.src = p.image; img.alt = p.title;
    cap.innerHTML = `<b>${esc(p.title)}</b><span>${esc(p.caption)}</span><em>${[formatDate(p.date), p.location].filter(Boolean).map(esc).join(' · ')}</em>`;
  };
  const open = id => { show(photos.findIndex(p => p.id === +id)); lb.hidden = false; lb.querySelector('.lb-close').focus(); };
  const close = () => { lb.hidden = true; };
  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = () => show(cur - 1);
  lb.querySelector('.lb-next').onclick = () => show(cur + 1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
    e.stopImmediatePropagation();
  }, true);
  // Open on a clean tap/click of a photo (not on a drag that turns a page).
  let down = null;
  const book = document.getElementById('book');
  book.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; }, true);
  book.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t;
    down = null;
    const f = e.target.closest && e.target.closest('figure.ph');
    if (f && moved < 6 && dt < 500) open(f.dataset.id);
  }, true);
  return { open, close };
}
