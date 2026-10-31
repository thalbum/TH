import fs from 'fs';

const rawDimensions = JSON.parse(fs.readFileSync('./photo-dimensions.json', 'utf8'));

// Curated 7 Chapters specifically tailored for Trung-Ha and Adelaide Friends
const chapters = [
  {
    id: 1,
    title: "Friends Arrive in Adelaide — The Morning Glow",
    subtitle: "Bride & Groom Preparations with Close Friends",
    quote: "Laughter, excitement, and warm toasts in Adelaide as our closest friends help us prepare for forever.",
    badge: "Ch 01 • Adelaide Morning"
  },
  {
    id: 2,
    title: "The First Look & Friends' Joy",
    subtitle: "An Emotional Reveal Witnessed by Loved Ones",
    quote: "The breathless second our eyes met in Adelaide, surrounded by the joyful tears and cheers of our dearest companions.",
    badge: "Ch 02 • First Look"
  },
  {
    id: 3,
    title: "The Adelaide Ceremony & Sacred Vows",
    subtitle: "Promising Forever Before Family & Friends",
    quote: "Hand in hand, two hearts united as one beneath the Adelaide sky with our beloved friends cheering our 'I do.'",
    badge: "Ch 03 • The Vows"
  },
  {
    id: 4,
    title: "Strolling Adelaide with Our Friends",
    subtitle: "Bridal Party & Group Portraits Across the City",
    quote: "Cherished memories with the incredible friends who traveled from near and far to celebrate our love in Adelaide.",
    badge: "Ch 04 • Adelaide Friends"
  },
  {
    id: 5,
    title: "Adelaide Sunset & Intimate Romance",
    subtitle: "Golden Hour Portraits of Trung-Ha & Beloved",
    quote: "Bathed in Adelaide's golden evening light, stepping into the lifelong romance of husband and wife.",
    badge: "Ch 05 • City Romance"
  },
  {
    id: 6,
    title: "Heartfelt Toasts & Speeches from Friends",
    subtitle: "Dinner, Laughter & Clinking Glasses at the Reception",
    quote: "Stories of lifelong friendship, tears of nostalgia, and glasses raised high to Trung-Ha and Adelaide Friends.",
    badge: "Ch 06 • Friends' Toasts"
  },
  {
    id: 7,
    title: "Dancing with Friends & The Sparkler Farewell",
    subtitle: "First Dance, High-Energy Party & Lifelong Memories",
    quote: "Spinning on the dance floor surrounded by friends, walking out under a canopy of glowing sparklers into our forever.",
    badge: "Ch 07 • Forever Together"
  }
];

// Rich, authentic captions for each photo
const romanticCaptions = [
  "A quiet breath of wonder before stepping into our new life together in Adelaide.",
  "Delicate wedding details chosen with heartfelt love and morning excitement.",
  "A glowing smile with close friends lighting up every corner of the morning.",
  "Surrounded by love, laughter, and the gentlest morning Adelaide light.",
  "Fastening the final touches on an unforgettable morning with our bridal party.",
  "Eyes sparkling with excitement as friends gather around.",
  "A tender touch, a peaceful moment of prayer and gratitude before the ceremony.",
  "Radiant in white, celebrated by our closest friends in Adelaide.",
  "Dressed in elegance, ready to meet the love of my life.",
  "Cherished laughter shared with the friends who know us best.",
  "A quiet moment of reflection, so thankful for everyone who traveled to be here.",
  "Every detail whispering a promise of timeless elegance.",
  "Standing on the threshold of our greatest adventure together.",
  "Soft whispers of encouragement and happy tears from our bridesmaids.",
  "The unforgettable grace of a morning filled with boundless hope.",
  "Ready to take the step that changes everything forever.",
  // Chapter 2: First Look & Friends' Joy
  "Turning around to see my beautiful bride for the very first time.",
  "That breathtaking heartbeat when our eyes first met in Adelaide.",
  "A tender embrace that felt like finally coming home.",
  "Smiling through happy tears as our friends watch on with joy.",
  "Walking together, fingers intertwined, completely unstoppable.",
  "A secret whisper of love shared only between bride and groom.",
  "Golden sunlight kissing a romance written in the stars.",
  "An intimate glance that speaks more than a thousand words.",
  "Wrapped in each other's arms, peaceful, safe, and complete.",
  "The purest laugh, the easiest and happiest smile in the world.",
  "Side by side, exactly where we were always meant to be.",
  "Cherishing the warmth of holding hands forever.",
  "A timeless portrait of love in its truest, most authentic form.",
  "Stepping into each other's embrace with joyful certainty.",
  "Love reflected in every gentle smile and tender touch.",
  "Whispering vows that will last through all our lifetimes.",
  "Every road has led us straight to this magical Adelaide moment.",
  "Forever looks brightest when I look into your eyes.",
  // Chapter 3: The Adelaide Ceremony & Sacred Vows
  "Walking down the petal-strewn aisle to the sweet melody of our dreams.",
  "Gazing into your eyes as we speak our sacred promises.",
  "Two lives, two stories, blending seamlessly into one destiny.",
  "The exchange of wedding rings — circular, eternal, and unbroken.",
  "With this ring, I give you my whole heart, soul, and future.",
  "A quiet nod, a deep breath, and a joyful, lifelong 'I do.'",
  "The joyful seal of our first kiss as husband and wife!",
  "Cheered on by the warm applause and happy tears of all our Adelaide friends.",
  "Hand in hand, husband and wife, radiant and united.",
  "Walking together down the aisle in joyous triumph.",
  "Heartfelt blessings from our parents, brimming with love and pride.",
  "Sealing our marriage vows under the beautiful open South Australian sky.",
  "The sacred silence when two souls become inseparable.",
  "United in faith, hope, and everlasting companionship.",
  "The beginning of a covenant written in pure light and love.",
  "Signing our certificate with radiant, beaming smiles.",
  "Just married! Overflowing with pure and boundless happiness.",
  "The entire ceremony erupts in congratulations and heartfelt love.",
  // Chapter 4: Strolling Adelaide with Our Friends
  "Surrounded by our incredible Adelaide friends who made this day unforgettable.",
  "Laughter and cheers with our beloved bridal party.",
  "Posing with the friends who have walked beside us through every chapter of life.",
  "A group portrait of genuine friendship, boundless joy, and celebration in Adelaide.",
  "The groomsmen sharing a hearty laugh and brotherhood with Trung-Ha.",
  "The bridesmaids radiant with joy, celebrating their dearest friend.",
  "Unforgettable memories with our closest circle of friends in Adelaide.",
  "Toasts, hugs, and high fives with the friends who mean the world to us.",
  "Walking together through the Adelaide parklands with our bridal squad.",
  "A playful, candid moment that captures the spirit of true friendship.",
  "Generations of family and lifelong friends united in celebration.",
  "Smiling wide with the best crew anyone could ever ask for.",
  "Friends traveling from near and far to stand proudly with us today.",
  "Shared smiles, joyful chatter, and memories we will treasure forever.",
  "The bridal party looking sharp, elegant, and full of life.",
  "Heartfelt embraces that speak to years of deep friendship.",
  "Every friend here holds an irreplaceable place in our hearts.",
  "Lifting a glass with our crew to love, laughter, and lifelong friendship.",
  // Chapter 5: Adelaide Sunset & Intimate Romance
  "Strolling through scenic Adelaide, radiant with newfound joy as newlyweds.",
  "Golden hour glow painting the Adelaide skyline in warm amber hues.",
  "A quiet, tender moment for the newlyweds amidst the city.",
  "The gentle breeze carrying the bridal veil like a dream in motion.",
  "Standing proud and deeply in love against the South Australian backdrop.",
  "Walking hand in hand through the historic Adelaide avenues.",
  "A romantic portrait bathed in the soft glow of twilight.",
  "Elegance and poise in the heart of Adelaide.",
  "Every corner of the city feeling magical on our wedding day.",
  "Capturing the quiet romance between two people meant for each other.",
  "Sunbeams filtering through the trees, blessing our steps.",
  "Looking forward to a lifetime of adventures together.",
  "A picture-perfect moment of grace, beauty, and romance.",
  "Leaning in for a gentle kiss as the afternoon light softens.",
  "The warmth of your hand in mine — my favorite place in the world.",
  "Adelaide will always hold a special place in our love story.",
  "A breathtaking capture of love in full bloom.",
  "Ready to head into the evening celebration with our friends.",
  // Chapter 6: Heartfelt Toasts & Speeches from Friends
  "Entering the reception room to a thunderous standing ovation!",
  "Cheers and applause from our beloved friends and family tables.",
  "A stunning reception ballroom adorned in champagne gold and ivory candlelight.",
  "Emotional, tearful, and witty speeches that touched every heart.",
  "The best man's hilarious memories bringing down the house in laughter.",
  "The maid of honor's touching words celebrating lifelong sisterhood.",
  "Clinking glasses and heartfelt toasts echoing across the venue.",
  "Sharing our first wonderful meal together as husband and wife.",
  "Warm congratulations, tight hugs, and blessings at every table.",
  "The exquisite wedding cake crafted to sweet perfection.",
  "Cutting our cake together, hand over hand, smiling from ear to ear.",
  "A sweet taste of our newly begun shared life.",
  "Friends and family mingling in an atmosphere of pure joy.",
  "Generations united on the celebratory floor.",
  "Capturing spontaneous candid moments of laughter and happiness.",
  "Glasses raised high: Here's to Trung-Ha and Adelaide Friends!",
  "A festive, vibrant room buzzing with high spirits and love.",
  "Cherishing every heartfelt word spoken by our loved ones.",
  // Chapter 7: Dancing with Friends & The Sparkler Farewell
  "Stepping onto the dance floor for our romantic first dance.",
  "Swaying together in our own private universe of love and melody.",
  "Soft fairy lights twirling across the room like stars.",
  "A graceful dip, drawing enthusiastic cheers from our friends.",
  "Parents joining the dance, sharing tender, unforgettable moments.",
  "The dance floor opens up and erupts in high-energy celebration!",
  "Friends dancing, singing along, and celebrating with all their hearts.",
  "Twinkling night lights and unforgettable nighttime magic.",
  "Spinning together under a canopy of warm romantic amber.",
  "A night overflowing with energy, rhythm, laughter, and love.",
  "Sparklers illuminating our joyful stroll through our cheering friends.",
  "Warm goodbyes and tight embraces from our favorite people in the world.",
  "Looking out at the Adelaide night sky — husband and wife forever.",
  "This is just the glorious beginning of our forever journey together."
];

const chapterRanges = [
  [0, 16],
  [16, 34],
  [34, 52],
  [52, 70],
  [70, 88],
  [88, 106],
  [106, 118]
];

const photos = rawDimensions.map((item, idx) => {
  let chIndex = chapterRanges.findIndex(r => idx >= r[0] && idx < r[1]);
  if (chIndex === -1) chIndex = chapterRanges.length - 1;
  const ch = chapters[chIndex];
  const isFirstInCh = idx === chapterRanges[chIndex][0];
  const caption = romanticCaptions[idx] || "A treasured moment with Trung-Ha & Adelaide Friends.";
  const title = `Moment ${idx + 1}`;

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
    chapterBadge: ch.badge,
    title: title,
    caption: caption,
    featured: isFirstInCh || item.w >= 6000
  };
});

const albumData = {
  meta: {
    title: "Trung-Ha and Adelaide Friends",
    subtitle: "Our Journey Together in Adelaide",
    location: "Adelaide, South Australia",
    coverPhoto: "TH/TH (70).jpg",
    coverAlt: "Trung-Ha and Adelaide Friends Cover",
    totalPhotos: photos.length,
    closingTitle: "Forever Friends & Lifelong Journey",
    closingMessage: "To our beloved family and wonderful friends who shared in the joy of our Adelaide wedding: thank you for filling our journey together with endless laughter, warmth, and lifelong memories.",
    musicTrack: {
      title: "Memories of Adelaide (Romantic Wedding Piano Solo)",
      inspiredBy: "Canon in D & A Thousand Years (Acoustic Ballad)",
      tempo: "68 BPM • Lento con amore",
      composer: "Wedding Acoustic Piano & Strings",
      description: "A gentle romantic piano prelude in C major, woven with cascading arpeggios, warm acoustic harmonics, and cathedral reverb."
    }
  },
  chapters: chapters.map((ch, i) => ({
    id: ch.id,
    title: ch.title,
    subtitle: ch.subtitle,
    quote: ch.quote,
    badge: ch.badge,
    photoCount: chapterRanges[i][1] - chapterRanges[i][0]
  })),
  photos: photos
};

fs.writeFileSync('./src/albumData.json', JSON.stringify(albumData, null, 2), 'utf8');
fs.writeFileSync('./src/albumData.js', `// Generated album dataset for Trung-Ha and Adelaide Friends
const albumData = ${JSON.stringify(albumData, null, 2)};
if (typeof window !== 'undefined') {
  window.ALBUM_DATA = albumData;
}
if (typeof globalThis !== 'undefined') {
  globalThis.ALBUM_DATA = albumData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = albumData;
}
`, 'utf8');

console.log('Successfully updated album data with Trung-Ha and Adelaide Friends chapters and music identification!');
