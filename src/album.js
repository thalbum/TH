// Turns the shared config into an ordered list of book pages and renders each as DOM.
import { album, chapters, photos } from './config.js';

const CAP = { 'full-page': 1, feature: 1, 'two-photo': 2, 'three-photo': 3, 'four-collage': 4, panorama: 1 };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function placeholderSrc(photo) {
  const n = String(photo.id).padStart(3, '0');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e9dcc2'/><stop offset='1' stop-color='#cdb68a'/></linearGradient></defs><rect width='1200' height='800' fill='url(#g)'/><rect x='40' y='40' width='1120' height='720' fill='none' stroke='#8a6d3b' stroke-width='3' stroke-dasharray='14 12'/><text x='600' y='370' text-anchor='middle' font-family='Georgia,serif' font-size='120' fill='#6b5238'>${n}</text><text x='600' y='450' text-anchor='middle' font-family='Arial,sans-serif' font-size='34' fill='#6b5238'>PLACEHOLDER</text><text x='600' y='500' text-anchor='middle' font-family='Arial,sans-serif' font-size='26' fill='#6b5238'>add images/photo${n}.jpg</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return isNaN(dt) ? d : dt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function buildPages() {
  const byId = Object.fromEntries(photos.map(p => [p.id, p]));
  const pages = [{ type: 'cover' }, { type: 'title' }, { type: 'contents' }];
  const padToLeft = ch => { if (pages.length % 2 === 0) pages.push({ type: 'blank', chapter: ch }); };
  for (const ch of chapters) {
    const startIdx = pages.length;
    const feat = byId[ch.featuredPhotoId] || photos.find(p => p.chapter === ch.id);
    pages.push({ type: 'chapter-intro', chapter: ch.id, chapterStart: true });
    pages.push({ type: 'chapter-photo', chapter: ch.id, photos: feat ? [feat] : [] });
    const rest = photos.filter(p => p.chapter === ch.id && (!feat || p.id !== feat.id));
    for (let i = 0; i < rest.length;) {
      const lay = rest[i].layout in CAP ? rest[i].layout : 'full-page';
      let n = 1;
      while (i + n < rest.length && rest[i + n].layout === lay && n < CAP[lay]) n++;
      const group = rest.slice(i, i + n);
      if (lay === 'panorama') {
        padToLeft(ch.id);
        pages.push({ type: 'pano-left', chapter: ch.id, photos: group }, { type: 'pano-right', chapter: ch.id, photos: group });
      } else pages.push({ type: 'photos', layout: lay, chapter: ch.id, photos: group });
      i += n;
    }
    padToLeft(ch.id);
    pages[startIdx].index = startIdx;
  }
  pages.push({ type: 'closing' }, { type: 'closing-right' }, { type: 'backcover' });
  pages.forEach((p, i) => (p.index = i));
  return pages;
}

function fig(p, cls = '') {
  const cap = [p.title && `<b>${esc(p.title)}</b>`, p.caption && esc(p.caption)].filter(Boolean).join(' ');
  const meta = [formatDate(p.date), p.location].filter(Boolean).map(esc).join(' · ');
  return `<figure class="ph ${cls}" data-id="${p.id}"><div class="frame"><img src="${esc(p.image)}" alt="${esc(p.title + '. ' + p.caption)}" loading="lazy" decoding="async"></div><figcaption>${cap}${meta ? `<span class="meta">${meta}</span>` : ''}</figcaption></figure>`;
}

function inner(pg, num) {
  const ch = chapters.find(c => c.id === pg.chapter);
  const folio = num > 0 ? `<span class="folio ${num % 2 ? 'l' : 'r'}">${num}</span>` : '';
  switch (pg.type) {
    case 'cover': case 'backcover': return '';
    case 'title': return `<div class="pg-title"><div class="orn"></div><h2>${esc(album.title)}</h2><p>${esc(album.subtitle)}</p></div>`;
    case 'contents': return `<div class="pg-contents"><h3>Contents</h3><ol>${chapters.map(c => `<li><button data-goto-chapter="${c.id}"><span class="t">${esc(c.title)}</span><span class="n">${c.id}</span></button></li>`).join('')}</ol></div>${folio}`;
    case 'chapter-intro': return `<div class="pg-intro"><div class="big">${String(ch.id).padStart(2, '0')}</div><h2>${esc(ch.title)}</h2><div class="rule"></div><p>${esc(ch.intro)}</p></div>${folio}`;
    case 'chapter-photo': return `<div class="pg-full">${pg.photos.map(p => fig(p, 'bleed')).join('')}</div>${folio}`;
    case 'photos': return `<div class="pg-photos lay-${pg.layout}">${pg.photos.map(p => fig(p)).join('')}</div>${folio}`;
    case 'pano-left': case 'pano-right': {
      const p = pg.photos[0], side = pg.type === 'pano-left' ? 'pl' : 'pr';
      return `<div class="pg-pano ${side}"><figure class="ph pano" data-id="${p.id}"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></figure>${side === 'pr' ? `<div class="pano-cap"><b>${esc(p.title)}</b> ${esc(p.caption)}</div>` : ''}</div>${folio}`;
    }
    case 'blank': return `<div class="pg-blank"><div class="orn"></div></div>${folio}`;
    case 'closing': return `<div class="pg-title"><div class="orn"></div><h2>${esc(album.closingTitle)}</h2><p>${esc(album.closingMessage)}</p></div>${folio}`;
    case 'closing-right': return `<div class="pg-blank"><div class="orn"></div><p class="end">${esc(album.title)}</p></div>${folio}`;
  }
  return '';
}

export function renderPages(pages) {
  return pages.map((pg, i) => {
    const el = document.createElement('div');
    const hard = pg.type === 'cover' || pg.type === 'backcover';
    el.className = `page pt-${pg.type}${hard ? ' hard' : ''}`;
    if (hard) el.dataset.density = 'hard';
    if (pg.chapter) el.dataset.chapter = pg.chapter;
    if (pg.type === 'cover') el.innerHTML = coverFace();
    else el.innerHTML = `<div class="paper">${inner(pg, i - 0)}</div>`;
    return el;
  });
}

export function coverFace() {
  return `<div class="cover-face"><div class="cover-photo"><img src="${esc(album.coverImage)}" alt="" onerror="this.parentNode.classList.add('nophoto')"></div><h1 class="foil">${esc(album.title)}</h1><p class="foil sub">${esc(album.subtitle)}</p></div>`;
}
export { esc };
