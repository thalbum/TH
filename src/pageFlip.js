import { PageFlip } from 'page-flip';

export function createBook(host, pageEls, { onFlip } = {}) {
  const pf = new PageFlip(host, {
    width: 560, height: 760, size: 'stretch',
    minWidth: 260, maxWidth: 760, minHeight: 360, maxHeight: 1010,
    showCover: true, usePortrait: true, mobileScrollSupport: false,
    flippingTime: matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 950,
    maxShadowOpacity: 0.55, drawShadow: true, swipeDistance: 30, clickEventForward: true, startPage: 0
  });
  pf.loadFromHTML(pageEls);
  const total = pf.getPageCount();
  const api = {
    pf, total,
    get index() { return pf.getCurrentPageIndex(); },
    next: () => pf.flipNext(), prev: () => pf.flipPrev(),
    goTo(i) { i = Math.max(0, Math.min(total - 1, i)); pf.flip(i); },
    jump(i) { pf.turnToPage(Math.max(0, Math.min(total - 1, i))); },
    get portrait() { return pf.getOrientation() === 'portrait'; }
  };
  pf.on('flip', e => onFlip && onFlip(e.data));
  return api;
}
