// Generates config/album.config.json ONCE. Refuses to overwrite your edits.
import fs from 'node:fs';
const out = 'config/album.config.json';
if (fs.existsSync(out) && !process.argv.includes('--force')) {
  console.log(`${out} already exists. Use --force to overwrite.`); process.exit(0);
}
const patternA = ['four-collage','four-collage','four-collage','four-collage','three-photo','three-photo','three-photo','full-page','feature'];
const patternB = ['two-photo','two-photo','panorama','two-photo','two-photo','feature','three-photo','three-photo','three-photo'];
const chapters = [], photos = [];
for (let c = 1; c <= 12; c++) {
  chapters.push({ id: c, title: `Chapter ${c} title`, intro: `Introductory message for chapter ${c}. Replace this text in config/album.config.json.`, featuredPhotoId: (c - 1) * 10 + 1 });
  const pat = c % 2 ? patternA : patternB;
  for (let i = 0; i < 10; i++) {
    const id = (c - 1) * 10 + i + 1, n = String(id).padStart(3, '0');
    photos.push({
      id, image: `images/photo${n}.jpg`, title: `Photo ${id} title`, caption: 'Add your caption here.',
      date: '', location: '', chapter: c, layout: i === 0 ? 'chapter-opener' : pat[i - 1], featured: i === 0
    });
  }
}
const cfg = {
  album: { title: 'Our Story', subtitle: 'A collection of 120 moments', coverImage: 'images/photo001.jpg',
    closingTitle: 'Thank you', closingMessage: 'Every picture here is a moment worth keeping.' },
  chapters, photos
};
fs.mkdirSync('config', { recursive: true });
fs.writeFileSync(out, JSON.stringify(cfg, null, 2));
console.log('Wrote', out, `(${photos.length} photos, ${chapters.length} chapters)`);
