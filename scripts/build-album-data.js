import fs from 'fs';
import path from 'path';

const rawDimensions = JSON.parse(fs.readFileSync('./photo-dimensions.json', 'utf8'));

const chapters = [
  {
    id: 1,
    title: "The Prelude & Morning Glow",
    subtitle: "Anticipation & Morning Preparations",
    quote: "In the quiet morning moments before forever, anticipation blossoms into pure joy.",
    range: [0, 16] // 16 photos
  },
  {
    id: 2,
    title: "First Look & Romantic Embrace",
    subtitle: "When Two Hearts Met",
    quote: "The entire world fell away the instant our eyes met — a silent promise kept forever.",
    range: [16, 34] // 18 photos
  },
  {
    id: 3,
    title: "The Sacred Vows & Rings",
    subtitle: "Our Promises of a Lifetime",
    quote: "Hand in hand, two souls united in sacred love and lifelong devotion.",
    range: [34, 52] // 18 photos
  },
  {
    id: 4,
    title: "Adelaide Radiance: Bridal Portraits",
    subtitle: "Golden Moments in Adelaide",
    quote: "Basking in the golden Adelaide sun, surrounded by laughter, beauty, and cherished friends.",
    range: [52, 70] // 18 photos
  },
  {
    id: 5,
    title: "Joyous Celebration & Heartfelt Toasts",
    subtitle: "Cheers to Love and Laughter",
    quote: "Surrounded by the warmth of family and dearest friends, raising our glasses to happiness.",
    range: [70, 88] // 18 photos
  },
  {
    id: 6,
    title: "The First Dance & Evening Twilight",
    subtitle: "Dancing Beneath the Starlight",
    quote: "Lost in the rhythm of our favorite melody, wrapped in warmth as night embraced the city.",
    range: [88, 104] // 16 photos
  },
  {
    id: 7,
    title: "Forever & Always",
    subtitle: "The Beginning of Our Eternity",
    quote: "This is not the end of a magical day, but the glorious beginning of our forever together.",
    range: [104, 118] // 14 photos
  }
];

const romanticCaptions = [
  "A quiet breath of wonder before stepping into our new life.",
  "Delicate details chosen with love and anticipation.",
  "A smile that lights up every corner of the heart.",
  "Surrounded by love, laughter, and the gentlest morning light.",
  "Fastening the final touch on an unforgettable morning.",
  "Eyes sparkling with excitement for the journey ahead.",
  "A tender touch, a peaceful moment before the celebration.",
  "Radiant in white, framed by pure happiness.",
  "Dressed in elegance, ready to meet my forever.",
  "Cherished laughter shared with the ones who know us best.",
  "A quiet prayer of gratitude for finding each other.",
  "Every detail whispering a promise of timeless elegance.",
  "Standing on the threshold of our greatest adventure.",
  "Soft whispers of encouragement and tears of pure joy.",
  "The unforgettable grace of a morning filled with hope.",
  "Ready to take the step that changes everything forever.",
  // Chapter 2
  "Turning around to see the love of my life.",
  "That breathtaking heartbeat when we first locked eyes.",
  "A tender embrace that felt like finally coming home.",
  "Smiling through happy tears, heart beating in rhythm.",
  "Walking together, fingers intertwined, unstoppable.",
  "A secret whisper shared only between bride and groom.",
  "Golden sunlight kissing a romance written in the stars.",
  "An intimate glance that speaks more than a thousand words.",
  "Wrapped in each other's arms, safe and complete.",
  "The purest laugh, the easiest smile in the world.",
  "Side by side, where we were always meant to be.",
  "Cherishing the warmth of holding hands forever.",
  "A timeless portrait of love in its truest form.",
  "Stepping into each other's embrace with joyful certainty.",
  "Love reflected in every gentle smile and tender touch.",
  "Whispering vows that will last through all our lifetimes.",
  "Every road has led us straight to this moment.",
  "Forever looks brightest when I look at you.",
  // Chapter 3
  "Walking down the aisle to the melody of our dreams.",
  "Gazing into your eyes as we speak our sacred promises.",
  "Two lives, two stories, blending into one destiny.",
  "The exchange of rings — circular, eternal, unbroken.",
  "With this ring, I give you my whole heart and future.",
  "A quiet nod, a deep breath, and a lifelong 'I do.'",
  "The joyful seal of our first kiss as husband and wife.",
  "Cheered by the warm cheers and tears of all we love.",
  "Hand in hand, husband and wife, radiant and united.",
  "Walking together down the petal-strewn aisle in triumph.",
  "Blessings from our parents, brimming with love and pride.",
  "Sealing our marriage vows under the open Adelaide sky.",
  "The sacred silence when two souls become inseparable.",
  "United in faith, hope, and everlasting companionship.",
  "The beginning of a covenant written in pure light.",
  "Signing our certificate with radiant, beaming smiles.",
  "Just married! Overflowing with pure happiness.",
  "The crowd erupts in congratulations and heartfelt love.",
  // Chapter 4
  "Adelaide scenery embracing our love in golden light.",
  "A stunning bridal portrait bathed in romantic warmth.",
  "Surrounded by our incredible bridal party and dearest friends.",
  "Laughter echoing through the gardens as the breeze dances.",
  "The wind carrying the veil like a dream in motion.",
  "Walking through Adelaide's scenic beauty hand in hand.",
  "An exquisite bridal look full of grace and charm.",
  "The handsome groom with his closest brothers in arms.",
  "The bridal party celebrating in style and boundless joy.",
  "A scenic backdrop for an unforgettable love story.",
  "Sunbeams filtering through the trees onto the newlyweds.",
  "Sharing a quiet kiss away from the bustling party.",
  "Playful moments and genuine laughter with friends.",
  "Golden hour glow painting everything in shades of amber.",
  "Elegance and poise in the heart of South Australia.",
  "Every corner of Adelaide feeling magical today.",
  "A bridal bouquet blooming with romance and charm.",
  "Standing tall and proud together, side by side.",
  // Chapter 5
  "Welcome to the reception! The party of a lifetime begins.",
  "Entering as Mr. and Mrs. to a standing ovation.",
  "Tables adorned in champagne gold, ivory, and candlelight.",
  "Heartfelt toasts from parents that touched every soul.",
  "Rousing laughter at the best man's witty memories.",
  "The maid of honor's touching words of lifelong sisterhood.",
  "Clinking glasses and cheers echoing across the room.",
  "Sharing our first meal together as husband and wife.",
  "Warm hugs and congratulatory embraces from every table.",
  "Delicious wedding cake crafted to sweet perfection.",
  "Cutting the cake together, hand over hand, smiling bright.",
  "A sweet taste of our newly begun shared future.",
  "Family generations gathered in joyous unity.",
  "Tears of nostalgia and smiles of endless gratitude.",
  "Capturing genuine candid moments of celebration.",
  "The festive atmosphere alive with music and celebration.",
  "Glasses raised high: Here's to Trung-Ha & Adelaide Friends!",
  "An atmosphere buzzing with cheer and celebratory spirit.",
  // Chapter 6
  "Stepping onto the dance floor for our romantic first dance.",
  "Swaying together in our own private universe of melody.",
  "Soft evening lights twirling across the ballroom.",
  "A graceful dip, drawing applause from our guests.",
  "Parents joining the dance, sharing tender moments of joy.",
  "The dance floor comes alive with high-energy celebration!",
  "Friends dancing, singing, and letting loose with delight.",
  "Glow of twilight and twinkling fairy lights in the evening.",
  "A lively celebration that will be remembered for decades.",
  "Uninhibited dancing, full hearts, and infectious laughter.",
  "Spinning together under a canopy of warm romantic amber.",
  "A night overflowing with energy, rhythm, and love.",
  "Cherishing every song as if the night could last forever.",
  "Golden glow reflecting in our smiling eyes.",
  "Unforgettable memories made on the celebratory floor.",
  "The joyous celebration continuing late into the night.",
  // Chapter 7
  "A quiet moment to catch our breath and savor this day.",
  "Looking out at the night sky, husband and wife forever.",
  "Sparklers illuminating our joyful farewell stroll.",
  "Warm goodbyes and tight embraces from our loved ones.",
  "Walking out into the starlit night, hearts so full.",
  "A final dip and romantic kiss beneath the moonlight.",
  "Stepping into our getaway car, ready for the honeymoon.",
  "Waving goodbye to our favorite people in the world.",
  "Two souls, one destiny, a lifetime of adventures ahead.",
  "The best is yet to come for Trung-Ha and Adelaide Friends.",
  "Forever grateful for everyone who shared our special day.",
  "Our love story has only just written its first chapter.",
  "Forever begins today, and forever will be beautiful.",
  "With all our love, Trung-Ha & Adelaide Friends."
];

const albumData = {
  meta: {
    title: "Trung-Ha and Adelaide Friends",
    subtitle: "Our Journey Together",
    location: "Adelaide, South Australia",
    coverPhoto: "TH/TH (1).JPEG",
    coverAlt: "Trung-Ha and Adelaide Friends Cover",
    totalPhotos: rawDimensions.length,
    closingTitle: "Forever & Always",
    closingMessage: "Thank you to our beloved family and friends for sharing in the joy of our journey together. Every photo here holds a treasured memory of love, laughter, and lifelong devotion."
  },
  chapters: chapters.map(ch => ({
    id: ch.id,
    title: ch.title,
    subtitle: ch.subtitle,
    quote: ch.quote,
    photoCount: ch.range[1] - ch.range[0]
  })),
  photos: rawDimensions.map((item, idx) => {
    // Find chapter
    const ch = chapters.find(c => idx >= c.range[0] && idx < c.range[1]) || chapters[chapters.length - 1];
    const isFirstInCh = idx === ch.range[0];
    const caption = romanticCaptions[idx] || "A treasured moment of our wedding day.";
    const title = `Moment ${idx + 1}`;

    let layout = 'bleed';
    if (isFirstInCh) {
      layout = 'chapter-opener';
    } else if (item.orientation === 'portrait') {
      layout = 'feature';
    } else {
      // Alternate layouts for dynamic magazine style
      const pattern = idx % 5;
      if (pattern === 1) layout = 'bleed';
      else if (pattern === 2) layout = 'two-photo';
      else if (pattern === 3) layout = 'feature';
      else if (pattern === 4) layout = 'two-photo';
      else layout = 'bleed';
    }

    return {
      id: idx + 1,
      file: item.file,
      name: item.name,
      width: item.w,
      height: item.h,
      aspect: item.aspect,
      orientation: item.orientation,
      chapter: ch.id,
      chapterTitle: ch.title,
      chapterSubtitle: ch.subtitle,
      title: title,
      caption: caption,
      layout: layout,
      featured: isFirstInCh || item.w >= 6000
    };
  })
};

// Write out JSON and JS
fs.writeFileSync('./src/albumData.json', JSON.stringify(albumData, null, 2), 'utf8');
fs.writeFileSync('./src/albumData.js', `// Generated album dataset
const albumData = ${JSON.stringify(albumData, null, 2)};
if (typeof window !== 'undefined') {
  window.ALBUM_DATA = albumData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = albumData;
}
`, 'utf8');

console.log('Successfully generated album data with 118 photos across 7 chapters!');
