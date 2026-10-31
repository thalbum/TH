// npm run validate — checks config integrity and which photographs are present.
import fs from 'node:fs';
import path from 'node:path';
const cfg = JSON.parse(fs.readFileSync('config/album.config.json', 'utf8'));
const LAYOUTS = ['chapter-opener', 'full-page', 'feature', 'two-photo', 'three-photo', 'four-collage', 'panorama'];
const errors = [], warns = [];
const ids = new Set();
cfg.photos.forEach(p => {
  if (ids.has(p.id)) errors.push(`Duplicate photo id ${p.id}`); ids.add(p.id);
  if (!cfg.chapters.some(c => c.id === p.chapter)) errors.push(`Photo ${p.id}: unknown chapter ${p.chapter}`);
  if (!LAYOUTS.includes(p.layout)) errors.push(`Photo ${p.id}: unknown layout "${p.layout}" (use ${LAYOUTS.join(', ')})`);
  if (p.date && isNaN(new Date(p.date))) errors.push(`Photo ${p.id}: invalid date "${p.date}" (use YYYY-MM-DD)`);
});
cfg.chapters.forEach(c => {
  if (!ids.has(c.featuredPhotoId)) errors.push(`Chapter ${c.id}: featuredPhotoId ${c.featuredPhotoId} does not exist`);
  const n = cfg.photos.filter(p => p.chapter === c.id).length;
  if (n === 0) errors.push(`Chapter ${c.id} has no photographs`);
});
const missing = cfg.photos.filter(p => !fs.existsSync(path.join('public', p.image)));
if (missing.length) warns.push(`${missing.length} of ${cfg.photos.length} photographs not found in public/images (placeholders will be shown): ${missing.slice(0, 5).map(p => path.basename(p.image)).join(', ')}${missing.length > 5 ? ', …' : ''}`);
if (!fs.existsSync(path.join('public', cfg.album.coverImage))) warns.push(`Cover image ${cfg.album.coverImage} not found`);
console.log(`Photos: ${cfg.photos.length}  Chapters: ${cfg.chapters.length}  Present: ${cfg.photos.length - missing.length}`);
warns.forEach(w => console.log('WARN ', w)); errors.forEach(e => console.log('ERROR', e));
console.log(errors.length ? `\nValidation FAILED (${errors.length} errors)` : '\nConfiguration is valid.');
process.exit(errors.length ? 1 : 0);
