// Single source of truth: config/album.config.json (edit that file, not this one).
import cfg from '../config/album.config.json';
export const album = cfg.album;
export const chapters = cfg.chapters;
export const photos = cfg.photos;
export default cfg;
