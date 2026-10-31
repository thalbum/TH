# Trung-Ha and Adelaide Friends — 3D Photo Album & Slideshow

A luxury 3D interactive photo album and cinematic slideshow celebrating **Trung-Ha and Adelaide Friends** (*Our Journey Together in Adelaide*), featuring:
- 📖 **Interactive 3D Hardcover Album** with uncropped photo matting and page-turn physics.
- 🎬 **Rock-Solid Cinematic Slideshow** with uncropped full-aspect rendering, ambient blurred backdrops, and Ken Burns zoom effects.
- 📸 **Photo Story Recap & Highlights** with chapter story cards, instant chapter & orientation filters, and HD inspection.
- 🎹 **Identified Background Piano Music**: Romantic wedding piano solos with live animated soundwave equalizer and melody switcher.
- 🌸 **Ambient Floating Rose Petals & Golden Bokeh** with interactive cursor physics.

---

## ✨ Features & Structure

### 1. Album Title & Story Chapters
- **Title Layout (Centered in 3 Rows)**:
  * Row 1: **Trung-Ha**
  * Row 2: **and**
  * Row 3: **Adelaide Friends**
- **Subtitle**: `Our Journey Together in Adelaide`
- **Private Access Code**: `TH` (case-insensitive login gateway for private use)
- **Cover Photograph**: `TH/TH (70).jpg` (High-resolution 4000x6000 portrait photograph)
- **Curated Chapters (118 Uncropped Photographs)**:
  1. **Chapter 01: Friends Arrive in Adelaide — The Morning Glow** (16 photos)
     *Bride & Groom Preparations with Close Friends*
     *"Laughter, excitement, and warm toasts in Adelaide as our closest friends help us prepare for forever."*
  2. **Chapter 02: The First Look & Friends' Joy** (18 photos)
     *An Emotional Reveal Witnessed by Loved Ones*
     *"The breathless second our eyes met in Adelaide, surrounded by the joyful tears and cheers of our dearest companions."*
  3. **Chapter 03: The Adelaide Ceremony & Sacred Vows** (18 photos)
     *Promising Forever Before Family & Friends*
     *"Hand in hand, two hearts united as one beneath the Adelaide sky with our beloved friends cheering our 'I do.'"*
  4. **Chapter 04: Strolling Adelaide with Our Friends** (18 photos)
     *Bridal Party & Group Portraits Across the City*
     *"Cherished memories with the incredible friends who traveled from near and far to celebrate our love in Adelaide."*
  5. **Chapter 05: Adelaide Sunset & Intimate Romance** (18 photos)
     *Golden Hour Portraits of Trung-Ha & Beloved*
     *"Bathed in Adelaide's golden evening light, stepping into the lifelong romance of husband and wife."*
  6. **Chapter 06: Heartfelt Toasts & Speeches from Friends** (18 photos)
     *Dinner, Laughter & Clinking Glasses at the Reception*
     *"Stories of lifelong friendship, tears of nostalgia, and glasses raised high to Trung-Ha and Adelaide Friends."*
  7. **Chapter 07: Dancing with Friends & The Sparkler Farewell** (12 photos)
     *First Dance, High-Energy Party & Lifelong Memories*
     *"Spinning on the dance floor surrounded by friends, walking out under a canopy of glowing sparklers into our forever."*

---

### 2. Identified Background Piano Music
- **Synthesizer Engine**: High-fidelity Web Audio API acoustic piano solo engine (zero external MP3 download lag, 100% offline & server compatible).
- **Track 1 (Default)**:
  - **Title**: `Memories of Adelaide (Romantic Wedding Piano Solo)`
  - **Inspiration**: *Canon in D* & *A Thousand Years* (Acoustic Ballad Variation)
  - **Key & Tempo**: C Major / A Minor • 68 BPM (*Lento con amore*)
  - **Acoustics**: Warm arpeggios, gentle resonance, cathedral reverb
- **Track 2**:
  - **Title**: `Adelaide Vows (Canon & Romance in D)`
  - **Inspiration**: Pachelbel's *Canon in D* Harmonic Progression & Modern Wedding Hymn
  - **Key & Tempo**: D Major / B Minor • 66 BPM (*Andante espressivo*)
  - **Acoustics**: Majestic open chords, uplifting bass lines, warm acoustic presence
- **Interactive Music Controls**:
  - **Music Pill**: Displays track title, animated 4-band soundwave equalizer bars, and live play/mute toggle (`🔇` / `🎹`).
  - **Settings & Popover (⚙)**: Hover or click the gear icon to view the music identification card and switch between melodies in real time.
  - **Slideshow HUD Integration**: Displays current background music name on every slide.

---

### 3. Uncropped Photo Presentation
- Replaced harsh `object-fit: cover` cropping with **`.photo-matting`** containing **`object-fit: contain`**.
- Every photo (93 landscape, 25 portrait) retains 100% of its full framing — no cropped heads, feet, or side details.
- Ambient blurred background glows fill any negative space with soft romantic tones derived from the photograph itself.

---

### 4. Photo Story Recap & Highlights
- Replaced the previous 3D wall with an organized **Photo Story Recap**:
  - **Clickable Key Story Chapter Cards**:
    - High-resolution uncropped cover photo thumbnail for each chapter with zoom-on-hover.
    - Chapter badge (`Chapter 01` to `Chapter 07`), subtitle, and romantic quote.
    - **`📸 View Photos`**: Filters the gallery below to that chapter and scrolls smoothly down.
    - **`🎬 Slideshow`**: Launches the cinematic slideshow starting directly from this chapter's first slide.
    - **`📖 3D Album`**: Flips open the 3D book directly to this chapter's opening spread.
    - Card selection highlights with an active gold glow border.
  - **Filter Chips**: Filter by chapter (`All`, `Ch 1–7`) or orientation (`Landscape 93`, `Portrait 25`).
  - **Active Status Indicator**: Live counter showing visible photo count and active chapter title.
  - **All 118 Moments from Moment 1**: Strictly ordered sequentially from Moment 1 to Moment 118, each marked with a royal gold moment badge (`Moment 1` to `Moment 118`) and numerical tag (`#001` to `#118`).
  - **Full Uncropped Photo Grid**: Click any photo to view instant full-screen HD details with custom captions.
  - **Quick Reset**: "View All Moments (from Moment 1)" button for instant 1-click return to the complete gallery starting at Moment 1.

---

### 5. 4 Switchable Wedding Themes
- 👑 **Royal Ivory & Champagne Gold** (Default): Candlelit warmth, rich gold foil, espresso leather.
- 🌸 **Blush Rose Romance**: Soft blush velvet, rose gold foil, romantic floral ambiance.
- 🌌 **Midnight Starlight Gala**: Deep celestial midnight blue, platinum & gold foil.
- 🌿 **Emerald Botanical Garden**: Forest emerald velvet, antique botanical gold filigree.

---

## 🚀 How to Run

### Option 1: Direct Double-Click (Recommended)
Double-click **`start-album.bat`** in the project folder. It will start the local HTTP server and automatically launch your browser:
```
http://localhost:3000
```

### Option 2: Command Line (PowerShell / Command Prompt)
Run with Node or the built-in runtime:
```powershell
agy-node server.js
```
or
```powershell
node server.js
```

### Option 3: Direct File Opening
You can also directly open **`index.html`** in any web browser without running a server.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / Pause Slideshow |
| `←` / `→` | Previous / Next Page or Slide |
| `PageUp` / `PageDown` | Previous / Next Page or Slide |
| `Home` / `End` | Jump to First / Last Page or Slide |
| `M` | Play / Mute Background Piano Music |
| `F` | Toggle Fullscreen |
| `T` | Toggle 118-Photo Thumbnail Strip |
| `Escape` | Close Fullscreen HD Lightbox |
