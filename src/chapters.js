import { chapters, photos } from './config.js';
import { esc } from './album.js';

export function initNav(pages, book) {
  const startOf = Object.fromEntries(pages.filter(p => p.chapterStart).map(p => [p.chapter, p.index]));
  const select = document.getElementById('chapter-select');
  select.innerHTML = `<option value="cover">Cover</option>` + chapters.map(c => `<option value="${c.id}">${c.id}. ${esc(c.title)}</option>`).join('');
  const goChapter = id => { const i = id === 'cover' ? 0 : startOf[id]; book.goTo(i % 2 === 0 && i > 0 ? i - 1 : i); };
  select.onchange = () => goChapter(select.value === 'cover' ? 'cover' : +select.value);
  document.getElementById('book').addEventListener('click', e => {
    const b = e.target.closest('[data-goto-chapter]'); if (b) goChapter(+b.dataset.gotoChapter);
  });
  // Thumbnails: one per spread (left+right), labelled with page numbers.
  const th = document.getElementById('thumbs-list');
  const first = pg => pg.photos && pg.photos[0];
  const items = [];
  for (let i = 0; i < pages.length; i += (i === 0 ? 1 : 2)) {
    const a = pages[i], b = pages[i + 1];
    const p = first(a) || (b && first(b));
    items.push({ i, label: i === 0 ? 'Cover' : `${i}–${i + 1}`, p, ch: a.chapter || (b && b.chapter) });
  }
  th.innerHTML = items.map(t => `<button class="thumb" data-i="${t.i}" ${t.p ? `data-id="${t.p.id}"` : ''} aria-label="Go to pages ${t.label}">${t.p ? `<img loading="lazy" decoding="async" src="${esc(t.p.image)}" alt="">` : '<span class="tn"></span>'}<small>${t.label}</small></button>`).join('');
  th.addEventListener('click', e => { const b = e.target.closest('.thumb'); if (b) { book.goTo(+b.dataset.i); } });
  return { update(idx) {
    const pg = pages[idx]; const ch = pg.chapter || (pages[idx + 1] && pages[idx + 1].chapter);
    select.value = ch ? String(ch) : 'cover';
    th.querySelectorAll('.thumb').forEach(b => { const on = +b.dataset.i === (idx === 0 ? 0 : (idx % 2 ? idx : idx - 1)); b.classList.toggle('on', on); if (on) th.scrollTo({ left: b.offsetLeft - th.clientWidth / 2 + b.offsetWidth / 2, behavior: 'smooth' }); });
  } };
}
