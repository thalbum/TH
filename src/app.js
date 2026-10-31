/**
 * TRUNG-HA & ADELAIDE FRIENDS — WEDDING PHOTO ALBUM & 3D SLIDESHOW
 * Core Engine: Uncropped Photo Matting, Rock-Solid Slideshow, Photo Story Recap
 */

(function () {
  'use strict';

  // Ensure albumData is present
  const data = window.ALBUM_DATA || {
    meta: {
      title: "Trung-Ha and Adelaide Friends",
      subtitle: "Our Journey Together",
      location: "Adelaide, South Australia",
      coverPhoto: "TH/TH (70).jpg",
      closingTitle: "Forever & Always",
      closingMessage: "Thank you to our beloved family and friends for sharing in the joy of our journey together."
    },
    chapters: [],
    photos: []
  };

  const { meta, chapters, photos } = data;

  // App State
  const state = {
    currentView: 'cover', // 'cover' | 'book' | 'slideshow' | 'recap'
    currentSpreadIndex: 0,
    currentSlideIndex: 0,
    slideshowPlaying: false,
    slideshowSpeed: 4500, // ms
    slideshowTimer: null,
    audioPlaying: false,
    audioMuted: true,
    theme: 'ivory',
    lightboxIndex: 0,
    thumbsOpen: false,
    recapChapterFilter: 'all',
    recapOrientFilter: 'all'
  };

  // DOM Elements
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  /* =====================================================================
     1. BACKGROUND MUSIC — HTML5 AUDIO (Calm_Resolved.mp3)
     ===================================================================== */
  const albumAudio = (() => {
    let audioEl = null;
    let _isPlaying = false;

    function init() {
      if (!audioEl) {
        audioEl = new Audio('Calm_Resolved.mp3');
        audioEl.loop = true;
        audioEl.volume = 0.55;
      }
    }

    return {
      get isPlaying() { return _isPlaying; },
      init,
      start() {
        init();
        audioEl.play().then(() => {
          _isPlaying = true;
          state.audioMuted = false;
          updateMusicUI();
        }).catch(() => {});
      },
      stop() {
        if (audioEl) audioEl.pause();
        _isPlaying = false;
        state.audioMuted = true;
        updateMusicUI();
      },
      playPageTurnSFX() {} // no-op
    };
  })();

  const audio = albumAudio;

  function updateMusicUI() {
    const isPlaying = audio.isPlaying;

    const btn = $('#btn-sound-toggle');
    const icon = $('#music-icon');
    const trackTitle = $('#music-track-title');
    const popTrack = $('#music-pop-track');
    const ssMusic = $('#ss-music-name');

    if (btn) {
      btn.classList.toggle('music-playing', isPlaying);
      btn.title = isPlaying
        ? 'Playing: Calm Resolved (Click to Mute)'
        : 'Click to Play Background Music';
    }

    if (icon) {
      icon.textContent = isPlaying ? '🎵' : '🔇';
    }

    if (trackTitle) {
      trackTitle.textContent = 'Calm Resolved';
    }

    if (popTrack) {
      popTrack.textContent = 'Calm Resolved';
    }

    if (ssMusic) {
      ssMusic.textContent = 'Calm Resolved';
    }
  }

  /* =====================================================================
     2. CANVAS 3D PARTICLES (ROSE PETALS & GOLD BOKEH)
     ===================================================================== */
  class AmbientParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: -1000, y: -1000 };
      this.lastMouse = { x: 0, y: 0 };
      this.running = true;

      this.resize();
      window.addEventListener('resize', () => this.resize());

      window.addEventListener('pointermove', e => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      this.initParticles(45);
      this.loop();
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    initParticles(count) {
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle(true));
      }
    }

    createParticle(randomY = false) {
      const isPetal = Math.random() < 0.65;
      return {
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : -30,
        z: Math.random() * 0.7 + 0.3,
        size: isPetal ? (Math.random() * 12 + 10) : (Math.random() * 4 + 2),
        vx: (Math.random() - 0.5) * 0.8 + 0.3,
        vy: isPetal ? (Math.random() * 0.9 + 0.7) : (Math.random() * 0.4 + 0.3),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        isPetal: isPetal,
        opacity: Math.random() * 0.5 + 0.3
      };
    }

    loop() {
      if (!this.running) return;
      this.ctx.clearRect(0, 0, this.width, this.height);
      const time = performance.now() * 0.001;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const sway = Math.sin(time * p.swaySpeed * 10 + p.swayOffset) * 0.8;
        p.x += (p.vx + sway) * p.z;
        p.y += p.vy * p.z;
        p.rotation += p.rotSpeed;

        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 2;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.scale(p.z, p.z);

        if (p.isPetal) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, -p.size);
          this.ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.8, p.size * 0.6, 0, p.size);
          this.ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
          this.ctx.closePath();

          const petalGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          if (state.theme === 'blush') {
            petalGrad.addColorStop(0, `rgba(255, 200, 215, ${p.opacity})`);
            petalGrad.addColorStop(1, `rgba(235, 140, 160, ${p.opacity * 0.7})`);
          } else if (state.theme === 'midnight') {
            petalGrad.addColorStop(0, `rgba(220, 235, 255, ${p.opacity})`);
            petalGrad.addColorStop(1, `rgba(160, 190, 240, ${p.opacity * 0.6})`);
          } else if (state.theme === 'emerald') {
            petalGrad.addColorStop(0, `rgba(255, 245, 210, ${p.opacity})`);
            petalGrad.addColorStop(1, `rgba(220, 200, 150, ${p.opacity * 0.7})`);
          } else {
            petalGrad.addColorStop(0, `rgba(255, 240, 215, ${p.opacity})`);
            petalGrad.addColorStop(1, `rgba(225, 190, 130, ${p.opacity * 0.75})`);
          }
          this.ctx.fillStyle = petalGrad;
          this.ctx.fill();
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          glow.addColorStop(0, `rgba(255, 235, 160, ${p.opacity})`);
          glow.addColorStop(0.5, `rgba(212, 175, 55, ${p.opacity * 0.5})`);
          glow.addColorStop(1, 'transparent');
          this.ctx.fillStyle = glow;
          this.ctx.fill();
        }

        this.ctx.restore();

        if (p.y > this.height + 40 || p.x > this.width + 40) {
          this.particles[i] = this.createParticle(false);
        }
      }

      requestAnimationFrame(() => this.loop());
    }
  }

  /* =====================================================================
     3. 3D COVER MOUSE PARALLAX & OPENING
     ===================================================================== */
  function initCoverInteraction() {
    const stage = $('#view-cover');
    const bookCard = $('#hero-3d-card');
    if (!stage || !bookCard) return;

    const coverImg = $('.cover-photo-frame img');
    if (coverImg && meta.coverPhoto) {
      coverImg.src = meta.coverPhoto;
      if (meta.coverAlt) coverImg.alt = meta.coverAlt;
    }

    stage.addEventListener('pointermove', e => {
      if (state.currentView !== 'cover') return;
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const ry = -24 + x * 26;
      const rx = -y * 18;
      bookCard.style.setProperty('--ry', `${ry.toFixed(1)}deg`);
      bookCard.style.setProperty('--rx', `${rx.toFixed(1)}deg`);
    });

    stage.addEventListener('pointerleave', () => {
      bookCard.style.setProperty('--ry', '-24deg');
      bookCard.style.setProperty('--rx', '0deg');
    });

    $('#hero-book-box').addEventListener('click', openAlbumBook);
    $('#btn-open-book').addEventListener('click', openAlbumBook);
    $('#btn-start-slideshow').addEventListener('click', () => {
      switchView('slideshow');
    });
  }

  function openAlbumBook() {
    const card = $('#hero-3d-card');
    card.parentElement.classList.add('opening-album');
    audio.init();
    audio.playPageTurnSFX();

    setTimeout(() => {
      switchView('book');
      card.parentElement.classList.remove('opening-album');
    }, 1100);
  }

  /* =====================================================================
     4. 3D BOOK SPREADS ENGINE — UNCROPPED LUXURY FRAMING
     ===================================================================== */
  let bookSpreads = [];

  function buildBookSpreads() {
    bookSpreads = [];

    // Spread 0: Inside Cover & Table of Contents
    bookSpreads.push({
      type: 'title-spread',
      left: {
        type: 'title-page',
        title: meta.title,
        subtitle: meta.subtitle,
        location: meta.location,
        quote: "Two lives, two hearts, joined in friendship and united forever in love."
      },
      right: {
        type: 'contents-page',
        chapters: chapters
      }
    });

    // Generate spreads for each of the 7 chapters
    for (const ch of chapters) {
      const chPhotos = photos.filter(p => p.chapter === ch.id);
      if (chPhotos.length === 0) continue;

      // 1. Chapter Opener Spread: Left Chapter Quote & Intro, Right Featured uncropped photo
      const openerPhoto = chPhotos[0];
      bookSpreads.push({
        type: 'chapter-opener',
        chapterId: ch.id,
        left: {
          type: 'chapter-intro',
          number: String(ch.id).padStart(2, '0'),
          title: ch.title,
          subtitle: ch.subtitle,
          quote: ch.quote
        },
        right: {
          type: 'photo-page',
          photo: openerPhoto
        }
      });

      // Subsequent photos in this chapter: paired into facing pages
      const remaining = chPhotos.slice(1);
      for (let i = 0; i < remaining.length; i += 2) {
        const p1 = remaining[i];
        const p2 = remaining[i + 1];

        if (p2) {
          bookSpreads.push({
            type: 'photo-spread',
            chapterId: ch.id,
            left: { type: 'photo-page', photo: p1 },
            right: { type: 'photo-page', photo: p2 }
          });
        } else {
          bookSpreads.push({
            type: 'photo-spread',
            chapterId: ch.id,
            left: { type: 'photo-page', photo: p1 },
            right: {
              type: 'vignette',
              quote: ch.quote,
              chapterTitle: ch.title
            }
          });
        }
      }
    }

    // Final Closing Spread
    bookSpreads.push({
      type: 'closing-spread',
      left: {
        type: 'closing-page',
        title: meta.closingTitle,
        message: meta.closingMessage
      },
      right: {
        type: 'back-cover',
        title: meta.title
      }
    });
  }

  function renderPageHTML(pageData, side, pageNumber) {
    if (!pageData) return `<div class="album-photo-frame"></div>`;
    const folio = `<span class="page-folio ${side}">${pageNumber}</span>`;

    switch (pageData.type) {
      case 'title-page':
        return `
          <div class="spread-title-wrap">
            <div class="spread-ornament"></div>
            <div class="book-title-three-rows">
              <span class="title-row-1">Trung-Ha</span>
              <span class="title-row-2">and</span>
              <span class="title-row-3">Adelaide Friends</span>
            </div>
            <p class="spread-subtitle-p">${meta.subtitle}</p>
            <div style="width: 48px; height: 1px; background: var(--gold-primary); margin: 8px 0;"></div>
            <p class="spread-quote">"${pageData.quote}"</p>
            <p style="font-size: 13px; color: var(--gold-dark); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 10px;">${meta.location}</p>
          </div>
          ${folio}
        `;

      case 'contents-page':
        return `
          <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 10%;">
            <h2 style="font-family: var(--serif); font-size: 26px; text-align: center; margin-bottom: 20px; color: var(--ink);">Chapters of Our Story</h2>
            <div style="display: flex; flex-direction: column; gap: 9px;">
              ${pageData.chapters.map(c => `
                <div class="contents-item-btn" data-goto-chapter="${c.id}" style="display: flex; justify-content: space-between; align-items: baseline; padding: 6px 0; border-bottom: 1px dotted rgba(150, 118, 46, 0.4); cursor: pointer;">
                  <span style="font-family: var(--serif); font-size: 16px; color: var(--ink); font-weight: 500;">${c.title}</span>
                  <span style="font-size: 12px; color: var(--gold-dark); font-family: var(--sans);">${c.photoCount || 18} Photos</span>
                </div>
              `).join('')}
            </div>
          </div>
          ${folio}
        `;

      case 'chapter-intro':
        return `
          <div class="ch-opener-wrap">
            <div class="ch-number">${pageData.number}</div>
            <h2 class="ch-heading">${pageData.title}</h2>
            <div class="ch-rule"></div>
            <p class="ch-quote-text">"${pageData.quote}"</p>
          </div>
          ${folio}
        `;

      case 'photo-page':
        const p = pageData.photo;
        return `
          <div class="album-photo-frame">
            <div class="photo-matting" data-photo-id="${p.id}" title="Click to view high-resolution photo">
              <img src="${encodeURI(p.file)}" alt="${p.title}" decoding="async">
            </div>
            <div class="album-photo-caption">
              <b>${p.title}</b>
              <span>${p.caption}</span>
            </div>
          </div>
          ${folio}
        `;

      case 'vignette':
        return `
          <div class="spread-title-wrap">
            <div class="spread-ornament"></div>
            <p class="spread-quote">"${pageData.quote}"</p>
            <p style="font-family: var(--serif); font-size: 15px; color: var(--gold-dark); margin-top: 14px;">— ${meta.title}</p>
          </div>
          ${folio}
        `;

      case 'closing-page':
        return `
          <div class="spread-title-wrap">
            <div class="spread-ornament"></div>
            <h1 class="spread-title-h1">${pageData.title}</h1>
            <div style="width: 48px; height: 1px; background: var(--gold-primary); margin: 8px 0;"></div>
            <p class="spread-quote">${pageData.message}</p>
            <p style="font-family: var(--serif); font-size: 19px; color: var(--gold-dark); margin-top: 16px;">Trung-Ha and Adelaide Friends</p>
          </div>
          ${folio}
        `;

      case 'back-cover':
        return `
          <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--book-cover-bg); color: #fff; padding: 8%;">
            <div class="spread-ornament" style="border-color: var(--gold-primary);"></div>
            <h2 style="font-family: var(--serif); font-size: 24px; color: var(--gold-light); margin-top: 16px; letter-spacing: 0.08em;">${pageData.title}</h2>
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-primary); margin-top: 6px;">${meta.subtitle}</p>
          </div>
        `;

      default:
        return '';
    }
  }

  function renderSpread(index, direction = null) {
    if (index < 0 || index >= bookSpreads.length) return;

    state.currentSpreadIndex = index;
    const spread = bookSpreads[index];

    const leftContainer = $('#book-left-page');
    const rightContainer = $('#book-right-page');
    const flippingLeaf = $('#flipping-leaf');

    const leftPageNum = index * 2;
    const rightPageNum = index * 2 + 1;

    if (direction && flippingLeaf) {
      audio.playPageTurnSFX();
      flippingLeaf.style.display = 'block';
      flippingLeaf.className = `flipping-leaf ${direction === 'next' ? 'flip-forward' : 'flip-backward'}`;

      const leafFront = flippingLeaf.querySelector('.leaf-face.front');
      const leafBack = flippingLeaf.querySelector('.leaf-face.back');

      if (direction === 'next') {
        leafFront.innerHTML = rightContainer.innerHTML;
        leafBack.innerHTML = renderPageHTML(spread.left, 'left', leftPageNum);
      } else {
        leafFront.innerHTML = leftContainer.innerHTML;
        leafBack.innerHTML = renderPageHTML(spread.right, 'right', rightPageNum);
      }

      setTimeout(() => {
        flippingLeaf.style.display = 'none';
        flippingLeaf.className = 'flipping-leaf';
        leftContainer.innerHTML = renderPageHTML(spread.left, 'left', leftPageNum);
        rightContainer.innerHTML = renderPageHTML(spread.right, 'right', rightPageNum);
        bindPhotoClicks();
      }, 700);
    } else {
      leftContainer.innerHTML = renderPageHTML(spread.left, 'left', leftPageNum);
      rightContainer.innerHTML = renderPageHTML(spread.right, 'right', rightPageNum);
      bindPhotoClicks();
    }

    $('#book-prev-btn').disabled = index === 0;
    $('#book-next-btn').disabled = index === bookSpreads.length - 1;

    let indicatorText = `Pages ${leftPageNum} – ${rightPageNum}`;
    if (index === 0) indicatorText = "Cover & Dedication";
    else if (index === bookSpreads.length - 1) indicatorText = "Closing Pages";
    $('#book-page-indicator').textContent = indicatorText;

    if (spread.chapterId) {
      $('#book-chapter-sel').value = String(spread.chapterId);
    }
  }

  function bindPhotoClicks() {
    $$('[data-photo-id]').forEach(el => {
      el.addEventListener('click', e => {
        const id = parseInt(el.getAttribute('data-photo-id'), 10);
        const photoIdx = photos.findIndex(p => p.id === id);
        if (photoIdx !== -1) {
          openLightbox(photoIdx);
        }
      });
    });

    $$('[data-goto-chapter]').forEach(el => {
      el.addEventListener('click', () => {
        const chId = parseInt(el.getAttribute('data-goto-chapter'), 10);
        goToChapter(chId);
      });
    });
  }

  function goToChapter(chId) {
    const spreadIdx = bookSpreads.findIndex(s => s.chapterId === chId);
    if (spreadIdx !== -1) {
      renderSpread(spreadIdx, spreadIdx > state.currentSpreadIndex ? 'next' : 'prev');
    }
  }

  function initBookControls() {
    $('#book-prev-btn').addEventListener('click', () => {
      if (state.currentSpreadIndex > 0) {
        renderSpread(state.currentSpreadIndex - 1, 'prev');
      }
    });

    $('#book-next-btn').addEventListener('click', () => {
      if (state.currentSpreadIndex < bookSpreads.length - 1) {
        renderSpread(state.currentSpreadIndex + 1, 'next');
      }
    });

    $('#book-chapter-sel').addEventListener('change', e => {
      const chId = parseInt(e.target.value, 10);
      goToChapter(chId);
    });

    $('#book-right-page').addEventListener('click', e => {
      if (e.target.closest('[data-photo-id]') || e.target.closest('[data-goto-chapter]')) return;
      if (state.currentSpreadIndex < bookSpreads.length - 1) {
        renderSpread(state.currentSpreadIndex + 1, 'next');
      }
    });

    $('#book-left-page').addEventListener('click', e => {
      if (e.target.closest('[data-photo-id]') || e.target.closest('[data-goto-chapter]')) return;
      if (state.currentSpreadIndex > 0) {
        renderSpread(state.currentSpreadIndex - 1, 'prev');
      }
    });
  }

  /* =====================================================================
     5. ROCK-SOLID CINEMATIC SLIDESHOW ENGINE (UNCROPPED & RELIABLE)
     ===================================================================== */
  const preloadedImages = new Map();

  function preloadImage(url) {
    if (!url || preloadedImages.has(url)) return;
    const img = new Image();
    img.src = url;
    preloadedImages.set(url, img);
  }

  function renderSlideshowSlide(index) {
    if (index < 0 || index >= photos.length) return;
    state.currentSlideIndex = index;
    const p = photos[index];

    // 1. Update text details
    $('#slide-ch-badge').textContent = p.chapterBadge || `Chapter 0${p.chapter} • ${p.chapterTitle}`;
    $('#slide-caption-title').textContent = p.title;
    $('#slide-caption-desc').textContent = p.caption;
    $('#slide-counter-big').textContent = String(index + 1).padStart(3, '0');
    $('#slide-counter-total').textContent = `/ ${photos.length}`;

    // 2. Ambient Blurred Background
    const backdrop = $('#ss-ambient-bg');
    if (backdrop) {
      backdrop.style.backgroundImage = `url("${encodeURI(p.file)}")`;
    }

    // 3. Main Uncropped Photo
    const mainImg = $('#ss-main-img');
    if (mainImg) {
      mainImg.classList.add('transitioning');
      mainImg.src = encodeURI(p.file);
      mainImg.alt = `${p.title} - ${p.caption}`;
      mainImg.onload = () => {
        mainImg.classList.remove('transitioning');
      };
      // Fallback in case image is already cached
      if (mainImg.complete) {
        mainImg.classList.remove('transitioning');
      }
    }

    // 4. Preload adjacent slides for seamless transitions
    const nextIdx = (index + 1) % photos.length;
    const prevIdx = (index - 1 + photos.length) % photos.length;
    preloadImage(encodeURI(photos[nextIdx].file));
    preloadImage(encodeURI(photos[prevIdx].file));

    // 5. Sync Thumbnails
    syncThumbnailActive(index);

    // 6. Reset & Start Slide Timer / Progress Bar
    resetSlideTimer();
  }

  function resetSlideTimer() {
    clearTimeout(state.slideshowTimer);

    const progressBar = $('#ss-progress-bar');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }

    if (state.slideshowPlaying) {
      // Trigger smooth CSS progress bar fill
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressBar && state.slideshowPlaying) {
            progressBar.style.transition = `width ${state.slideshowSpeed}ms linear`;
            progressBar.style.width = '100%';
          }
        });
      });

      state.slideshowTimer = setTimeout(() => {
        if (state.slideshowPlaying) {
          nextSlide();
        }
      }, state.slideshowSpeed);
    }
  }

  function nextSlide() {
    const nextIdx = (state.currentSlideIndex + 1) % photos.length;
    renderSlideshowSlide(nextIdx);
  }

  function prevSlide() {
    const prevIdx = (state.currentSlideIndex - 1 + photos.length) % photos.length;
    renderSlideshowSlide(prevIdx);
  }

  function startSlideshow() {
    state.slideshowPlaying = true;
    const playIcon = $('#ss-play-icon');
    if (playIcon) playIcon.textContent = '⏸';
    resetSlideTimer();

    audio.init();
    if (!audio.isPlaying && !state.audioMuted) {
      audio.start();
    }
  }

  function pauseSlideshow() {
    state.slideshowPlaying = false;
    clearTimeout(state.slideshowTimer);
    const playIcon = $('#ss-play-icon');
    if (playIcon) playIcon.textContent = '▶';

    const progressBar = $('#ss-progress-bar');
    if (progressBar) {
      const computedWidth = window.getComputedStyle(progressBar).width;
      progressBar.style.transition = 'none';
      progressBar.style.width = computedWidth;
    }
  }

  function toggleSlideshow() {
    if (state.slideshowPlaying) {
      pauseSlideshow();
    } else {
      startSlideshow();
    }
  }

  function initSlideshowControls() {
    $('#ss-play-btn').addEventListener('click', toggleSlideshow);
    $('#ss-next-btn').addEventListener('click', nextSlide);
    $('#ss-prev-btn').addEventListener('click', prevSlide);
    $('#ss-arrow-next').addEventListener('click', nextSlide);
    $('#ss-arrow-prev').addEventListener('click', prevSlide);

    // Clicking photo stage toggles play/pause
    $('#ss-photo-stage').addEventListener('click', toggleSlideshow);

    // Clicking progress bar scrubs to percentage
    $('#ss-progress-track').addEventListener('click', e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const targetIndex = Math.floor(pct * photos.length);
      renderSlideshowSlide(Math.max(0, Math.min(photos.length - 1, targetIndex)));
    });

    $('#ss-speed-select').addEventListener('change', e => {
      state.slideshowSpeed = parseInt(e.target.value, 10);
      if (state.slideshowPlaying) resetSlideTimer();
    });

    $('#ss-fullscreen-btn').addEventListener('click', toggleFullscreen);

    // Auto-hide HUD on idle
    let hudTimer = null;
    const hud = $('#slideshow-hud');
    const viewport = $('#view-slideshow');

    viewport.addEventListener('pointermove', () => {
      hud.classList.remove('auto-hide');
      clearTimeout(hudTimer);
      hudTimer = setTimeout(() => {
        if (state.slideshowPlaying && state.currentView === 'slideshow') {
          hud.classList.add('auto-hide');
        }
      }, 3500);
    });
  }

  /* =====================================================================
     6. PHOTO STORY RECAP & HIGHLIGHTS ENGINE
     ===================================================================== */
  function initPhotoRecap() {
    // 1. Render Clickable Chapter Summary Cards with Lead Thumbnails
    const chGrid = $('#recap-chapters-grid');
    if (chGrid) {
      chGrid.innerHTML = chapters.map(ch => {
        const leadPhoto = photos.find(p => p.chapter === ch.id) || photos[0];
        return `
          <div class="recap-ch-card ${state.recapChapterFilter === String(ch.id) ? 'active' : ''}" data-ch-card="${ch.id}" title="Click to explore Chapter 0${ch.id}">
            <div class="recap-ch-thumb-wrap">
              <img src="${encodeURI(leadPhoto.file)}" alt="${ch.title}" decoding="async" class="recap-ch-thumb-img">
              <div class="recap-ch-thumb-overlay">
                <span class="recap-ch-num-badge">Chapter 0${ch.id}</span>
                <span class="recap-ch-photo-badge">${ch.photoCount || 18} Photos</span>
              </div>
            </div>
            <div class="recap-ch-body">
              <h3 class="recap-ch-title">${ch.title}</h3>
              <div class="recap-ch-subtitle">${ch.subtitle}</div>
              <p class="recap-ch-quote">"${ch.quote}"</p>
            </div>
            <div class="recap-ch-actions">
              <button class="btn-ch-action primary" data-action="photos" data-ch="${ch.id}" title="View all photos in this chapter">
                <span>📸</span> <span>View Photos</span>
              </button>
              <button class="btn-ch-action" data-action="slideshow" data-ch="${ch.id}" title="Play Slideshow starting at this chapter">
                <span>🎬</span> <span>Slideshow</span>
              </button>
              <button class="btn-ch-action" data-action="book" data-ch="${ch.id}" title="Open this chapter in 3D Album">
                <span>📖</span> <span>3D Album</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Card Click & Action Button Handlers
      $$('.recap-ch-card').forEach(card => {
        const chId = card.getAttribute('data-ch-card');

        card.addEventListener('click', (e) => {
          const actBtn = e.target.closest('.btn-ch-action');
          if (actBtn) {
            e.stopPropagation();
            const action = actBtn.getAttribute('data-action');
            if (action === 'slideshow') {
              const slideIdx = photos.findIndex(p => p.chapter === parseInt(chId, 10));
              switchView('slideshow');
              renderSlideshowSlide(slideIdx !== -1 ? slideIdx : 0);
              startSlideshow();
              return;
            } else if (action === 'book') {
              const spreadIdx = bookSpreads.findIndex(s => s.chapterId === parseInt(chId, 10));
              switchView('book');
              renderSpread(spreadIdx !== -1 ? spreadIdx : 0);
              return;
            }
          }

          // Otherwise, filter to this chapter
          filterRecapPhotos(chId, state.recapOrientFilter);

          // Smoothly scroll down to filter bar & photos
          const filterBar = $('#recap-filter-bar');
          if (filterBar) {
            filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      // View All 118 Photos Button
      const btnShowAll = $('#btn-recap-show-all');
      if (btnShowAll) {
        btnShowAll.addEventListener('click', () => {
          filterRecapPhotos('all', state.recapOrientFilter);
          const filterBar = $('#recap-filter-bar');
          if (filterBar) {
            filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }

    // 2. Render Full Uncropped Photos Grid
    renderRecapPhotoGrid();

    // 3. Filter Chips
    $$('#recap-ch-chips .recap-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.recapChapterFilter = btn.dataset.filter;
        filterRecapPhotos(state.recapChapterFilter, state.recapOrientFilter);
      });
    });

    $$('#recap-orient-chips .recap-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#recap-orient-chips .recap-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.recapOrientFilter = btn.dataset.orient;
        filterRecapPhotos(state.recapChapterFilter, state.recapOrientFilter);
      });
    });

    // 4. Hero Action buttons
    $('#btn-recap-play').addEventListener('click', () => {
      switchView('slideshow');
    });

    $('#btn-recap-book').addEventListener('click', () => {
      switchView('book');
    });
  }

  function renderRecapPhotoGrid() {
    const grid = $('#recap-photo-grid');
    if (!grid) return;

    // Ensure sorted strictly by moment ID 1..118 so Photo Recap starts with Moment 1
    const sorted = photos.slice().sort((a, b) => a.id - b.id);

    grid.innerHTML = sorted.map((p) => {
      const originalIdx = photos.findIndex(item => item.id === p.id);
      return `
        <div class="recap-photo-card" data-photo-idx="${originalIdx}" data-moment-id="${p.id}" data-ch="${p.chapter}" data-orient="${p.orientation}" title="Inspect Moment ${p.id} in HD">
          <div class="recap-card-img-wrap">
            <span class="recap-moment-pill">Moment ${p.id}</span>
            <img src="${encodeURI(p.file)}" alt="${p.title}" decoding="async">
          </div>
          <div class="recap-card-info">
            <div class="recap-card-top-row">
              <span class="recap-moment-num">#${String(p.id).padStart(3, '0')}</span>
              <span class="recap-card-tag">${p.chapterBadge || ('Chapter 0' + p.chapter)}</span>
            </div>
            <h4 class="recap-card-title">${p.title}</h4>
            <p class="recap-card-caption">${p.caption}</p>
          </div>
        </div>
      `;
    }).join('');

    // Click card opens Lightbox
    $$('.recap-photo-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-photo-idx'), 10);
        openLightbox(idx);
      });
    });
  }

  function filterRecapPhotos(chFilter, orientFilter) {
    state.recapChapterFilter = chFilter;
    state.recapOrientFilter = orientFilter;

    let visibleCount = 0;
    $$('.recap-photo-card').forEach(card => {
      const ch = card.getAttribute('data-ch');
      const orient = card.getAttribute('data-orient');

      const matchCh = chFilter === 'all' || ch === chFilter;
      const matchOrient = orientFilter === 'all' || orient === orientFilter;

      const isVisible = matchCh && matchOrient;
      card.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount++;
    });

    // Sync chapter cards active class
    $$('.recap-ch-card').forEach(card => {
      card.classList.toggle('active', card.dataset.chCard === String(chFilter));
    });

    // Sync chapter filter chips active class
    $$('#recap-ch-chips .recap-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === String(chFilter));
    });

    // Sync status bar
    const statusText = $('#recap-status-text');
    const statusCount = $('#recap-status-count');
    if (statusText) {
      if (chFilter === 'all') {
        statusText.textContent = 'Displaying All 118 Moments with Adelaide Friends (Starting from Moment 1)';
      } else {
        const ch = chapters.find(c => String(c.id) === String(chFilter));
        statusText.textContent = ch ? `Displaying Chapter 0${ch.id}: ${ch.title}` : 'Displaying Filtered Moments';
      }
    }
    if (statusCount) {
      statusCount.textContent = `${visibleCount} Photos Visible`;
    }
  }

  /* =====================================================================
     7. THUMBNAILS DRAWER
     ===================================================================== */
  function initThumbnails() {
    const strip = $('#thumb-strip');
    strip.innerHTML = '';

    photos.forEach((p, i) => {
      const item = document.createElement('div');
      item.className = `thumb-item ${i === 0 ? 'active' : ''}`;
      item.dataset.index = i;
      item.innerHTML = `
        <img src="${encodeURI(p.file)}" alt="${p.title}" decoding="async">
        <span class="thumb-item-num">${i + 1}</span>
      `;
      item.addEventListener('click', () => {
        if (state.currentView === 'slideshow') {
          renderSlideshowSlide(i);
        } else if (state.currentView === 'book') {
          const spreadIdx = bookSpreads.findIndex(s => 
            (s.left?.photo?.id === p.id) || (s.right?.photo?.id === p.id)
          );
          if (spreadIdx !== -1) {
            renderSpread(spreadIdx, spreadIdx > state.currentSpreadIndex ? 'next' : 'prev');
          }
        } else {
          openLightbox(i);
        }
      });
      strip.appendChild(item);
    });

    $('#btn-toggle-thumbs').addEventListener('click', toggleThumbnails);
    $('#thumb-drawer-close').addEventListener('click', toggleThumbnails);
  }

  function toggleThumbnails() {
    state.thumbsOpen = !state.thumbsOpen;
    $('#thumb-drawer').classList.toggle('open', state.thumbsOpen);
  }

  function syncThumbnailActive(index) {
    $$('.thumb-item').forEach((el, idx) => {
      el.classList.toggle('active', idx === index);
    });
    const activeEl = $(`.thumb-item[data-index="${index}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  /* =====================================================================
     8. HD LIGHTBOX VIEWER — UNCROPPED FULL RESOLUTION
     ===================================================================== */
  function openLightbox(index) {
    state.lightboxIndex = index;
    const p = photos[index];
    const lbImg = $('#lb-img');
    lbImg.src = encodeURI(p.file);
    lbImg.alt = `${p.title} - ${p.caption}`;
    $('#lb-title').textContent = p.title;
    $('#lb-desc').textContent = `${p.caption} • ${p.chapterBadge || ('Chapter 0' + p.chapter)}`;
    $('#lightbox-modal').classList.add('open');
  }

  function closeLightbox() {
    $('#lightbox-modal').classList.remove('open');
  }

  function initLightbox() {
    $('#lb-close-btn').addEventListener('click', closeLightbox);
    $('#lightbox-modal').addEventListener('click', e => {
      if (e.target === $('#lightbox-modal')) closeLightbox();
    });

    $('#lb-prev-btn').addEventListener('click', e => {
      e.stopPropagation();
      state.lightboxIndex = (state.lightboxIndex - 1 + photos.length) % photos.length;
      openLightbox(state.lightboxIndex);
    });

    $('#lb-next-btn').addEventListener('click', e => {
      e.stopPropagation();
      state.lightboxIndex = (state.lightboxIndex + 1) % photos.length;
      openLightbox(state.lightboxIndex);
    });
  }

  /* =====================================================================
     9. VIEW SWITCHING & NAVIGATION
     ===================================================================== */
  function switchView(viewName) {
    if (state.currentView === viewName) return;

    if (state.currentView === 'slideshow' && viewName !== 'slideshow') {
      pauseSlideshow();
    }

    state.currentView = viewName;

    $$('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });

    $('#view-cover').classList.toggle('active', viewName === 'cover');
    $('#view-book').classList.toggle('active', viewName === 'book');
    $('#view-slideshow').classList.toggle('active', viewName === 'slideshow');
    $('#view-recap').classList.toggle('active', viewName === 'recap');

    // Ensure window and root document scroll is strictly reset to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (viewName === 'book') {
      renderSpread(state.currentSpreadIndex);
    } else if (viewName === 'slideshow') {
      renderSlideshowSlide(state.currentSlideIndex);
      startSlideshow();
    } else if (viewName === 'recap') {
      filterRecapPhotos('all', 'all');
      const recapStage = $('#view-recap');
      if (recapStage) {
        recapStage.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        recapStage.scrollTop = 0;
      }
    }
  }

  function initViewSwitching() {
    $$('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        switchView(view);
      });
    });

    $('#brand-home').addEventListener('click', () => {
      switchView('cover');
    });
  }

  /* =====================================================================
     10. THEMES & SOUND TOGGLE
     ===================================================================== */
  function initThemePicker() {
    const btn = $('#btn-theme-picker');
    const dropdown = $('#theme-dropdown');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    window.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });

    $$('.theme-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.dataset.setTheme;
        state.theme = theme;
        if (theme === 'ivory') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }
        dropdown.classList.remove('open');
      });
    });
  }

  function initSoundToggle() {
    const btn = $('#btn-sound-toggle');
    const gear = $('#btn-music-gear');
    const popover = $('#music-details-popover');
    const trackSelect = $('#music-track-select');

    if (btn) {
      btn.addEventListener('click', (e) => {
        // If gear was clicked, toggle popover
        if (gear && (e.target === gear || gear.contains(e.target))) {
          e.stopPropagation();
          popover?.classList.toggle('open');
          return;
        }

        // Otherwise toggle play/pause
        if (audio.isPlaying) {
          audio.stop();
        } else {
          audio.start();
        }
      });
    }

    if (gear) {
      gear.addEventListener('click', (e) => {
        e.stopPropagation();
        popover?.classList.toggle('open');
      });
    }

    if (popover) {
      popover.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (trackSelect) {
      trackSelect.addEventListener('change', (e) => {
        const idx = parseInt(e.target.value, 10) || 0;
        audio.setTrack(idx);
        if (!audio.isPlaying) {
          audio.start();
        }
      });
    }

    // Close popover when clicking elsewhere
    window.addEventListener('click', (e) => {
      if (popover && !popover.contains(e.target) && !btn?.contains(e.target)) {
        popover.classList.remove('open');
      }
    });

    updateMusicUI();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /* =====================================================================
     11. KEYBOARD SHORTCUTS
     ===================================================================== */
  function initKeyboardNav() {
    window.addEventListener('keydown', e => {
      // If private access gate is active, don't trigger album shortcuts
      const gate = $('#private-access-gate');
      if (gate && !gate.classList.contains('unlocked')) return;

      if ($('#lightbox-modal').classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') $('#lb-next-btn').click();
        else if (e.key === 'ArrowLeft') $('#lb-prev-btn').click();
        return;
      }

      if (e.key === ' ' && state.currentView === 'slideshow') {
        e.preventDefault();
        toggleSlideshow();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (state.currentView === 'book') $('#book-next-btn').click();
        else if (state.currentView === 'slideshow') nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (state.currentView === 'book') $('#book-prev-btn').click();
        else if (state.currentView === 'slideshow') prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        $('#btn-sound-toggle').click();
      } else if (e.key === 't' || e.key === 'T') {
        toggleThumbnails();
      } else if (e.key === 'Home') {
        if (state.currentView === 'book') renderSpread(0, 'prev');
        else if (state.currentView === 'slideshow') renderSlideshowSlide(0);
      } else if (e.key === 'End') {
        if (state.currentView === 'book') renderSpread(bookSpreads.length - 1, 'next');
        else if (state.currentView === 'slideshow') renderSlideshowSlide(photos.length - 1);
      }
    });
  }

  /* =====================================================================
     12. PRIVATE ACCESS CODE GATE (CODE: adelaide)
     ===================================================================== */
  const ACCESS_CODE = "ADELAIDE";
  const STORAGE_KEY = "th_album_unlocked";

  function initPrivateAccess() {
    const gate = $('#private-access-gate');
    const form = $('#access-form');
    const input = $('#access-code-input');
    const errorEl = $('#access-error');
    const card = $('.access-card');
    const toggleEye = $('#btn-toggle-show-code');
    const lockBtn = $('#btn-lock-album');

    if (!gate) return;

    // Check if previously unlocked in this browser session
    const isUnlocked = sessionStorage.getItem(STORAGE_KEY) === 'true';
    if (isUnlocked) {
      gate.classList.add('unlocked');
    } else {
      gate.classList.remove('unlocked');
      setTimeout(() => input?.focus({ preventScroll: true }), 300);
    }

    function attemptUnlock() {
      if (!input) return;
      const val = (input.value || '').trim();

      if (val.toUpperCase() === ACCESS_CODE) {
        // SUCCESS
        if (errorEl) errorEl.textContent = '';
        sessionStorage.setItem(STORAGE_KEY, 'true');
        gate.classList.add('unlocked');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        audio.init(); // prepare audio context
      } else {
        // FAILED
        if (errorEl) {
          errorEl.textContent = val ? "Incorrect access code. Please enter 'adelaide' to enter." : "Please enter access code 'adelaide'.";
        }
        if (card) {
          card.classList.remove('shake-error');
          void card.offsetWidth; // trigger reflow
          card.classList.add('shake-error');
        }
        input.focus({ preventScroll: true });
        input.select();
      }
    }

    const submitBtn = $('#btn-access-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        attemptUnlock();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        attemptUnlock();
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          attemptUnlock();
        }
      });
      // Clear error on typing
      input.addEventListener('input', () => {
        if (errorEl) errorEl.textContent = '';
      });
    }

    // Toggle Show/Hide password
    if (toggleEye && input) {
      toggleEye.addEventListener('click', () => {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        toggleEye.textContent = isPassword ? '🔒' : '👁️';
      });
    }

    // Lock album button in top nav
    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        sessionStorage.removeItem(STORAGE_KEY);
        gate.classList.remove('unlocked');
        if (input) {
          input.value = '';
          setTimeout(() => input.focus(), 250);
        }
        if (errorEl) errorEl.textContent = '';
      });
    }
  }

  /* =====================================================================
     INITIALIZATION ON DOM READY
     ===================================================================== */
  function initApp() {
    const canvas = $('#ambient-canvas');
    if (canvas) new AmbientParticleSystem(canvas);

    buildBookSpreads();

    const chSel = $('#book-chapter-sel');
    if (chSel) {
      chSel.innerHTML = chapters.map(c => 
        `<option value="${c.id}">Chapter 0${c.id}: ${c.title}</option>`
      ).join('');
    }

    initPrivateAccess();
    initCoverInteraction();
    initBookControls();
    initSlideshowControls();
    initPhotoRecap();
    initThumbnails();
    initLightbox();
    initViewSwitching();
    initThemePicker();
    initSoundToggle();
    initKeyboardNav();

    renderSpread(0);
    renderSlideshowSlide(0);

    console.log(`Wedding Album Loaded: "${meta.title}" with ${photos.length} uncropped photos across ${chapters.length} chapters.`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
