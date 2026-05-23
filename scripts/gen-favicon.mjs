/**
 * Generates public/favicon.ico (16×16 + 32×32) and public/favicon-192.png
 * using only Node built-in modules (no npm packages required).
 *
 * Design: purple gradient (#7c3aed → #5b21b6) rounded square + white play triangle.
 */

import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';

// ── CRC32 ─────────────────────────────────────────────────────────────────
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ── PNG builder ───────────────────────────────────────────────────────────
function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const crcInput = Buffer.concat([t, d]);
  const crcVal = crc32(crcInput);
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(d.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([lenBuf, t, d, crcBuf]);
}

function makePNG(size, drawPixel) {
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.writeUInt8(8, 8);   // bit depth
  ihdr.writeUInt8(6, 9);   // RGBA
  ihdr.writeUInt8(0, 10);  // compression
  ihdr.writeUInt8(0, 11);  // filter method
  ihdr.writeUInt8(0, 12);  // interlace

  const raw = [];
  for (let y = 0; y < size; y++) {
    raw.push(0); // filter: None
    for (let x = 0; x < size; x++) {
      raw.push(...drawPixel(x, y, size));
    }
  }

  const idat = deflateSync(Buffer.from(raw), { level: 9 });
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── ICO builder (embeds raw PNG data) ────────────────────────────────────
function makeICO(images) {
  // images: [{size, png}]
  const count = images.length;
  const dirSize = 6 + count * 16;
  let offset = dirSize;

  const iconDir = Buffer.allocUnsafe(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type = ICO
  iconDir.writeUInt16LE(count, 4);

  const entries = [];
  const blobs = [];

  for (const { size, png } of images) {
    const entry = Buffer.allocUnsafe(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2);   // color count (0 = use bit depth)
    entry.writeUInt8(0, 3);   // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    blobs.push(png);
    offset += png.length;
  }

  return Buffer.concat([iconDir, ...entries, ...blobs]);
}

// ── Icon pixel renderer ───────────────────────────────────────────────────
// Returns [r, g, b, a] for pixel (x, y) in an image of `size`
function drawIcon(x, y, size) {
  const cx = x + 0.5;
  const cy = y + 0.5;

  // Rounded rectangle mask
  const radius = size * 0.22;
  const half = size / 2;
  const ox = Math.abs(cx - half) - (half - radius);
  const oy = Math.abs(cy - half) - (half - radius);
  const outside = Math.max(ox, 0) ** 2 + Math.max(oy, 0) ** 2;
  if (outside > radius * radius) return [0, 0, 0, 0];

  // Soft anti-aliased edge
  const distToEdge = radius - Math.sqrt(outside);
  const alpha = Math.min(1, distToEdge * 2) * 255;

  // Purple gradient: #7c3aed (TL) → #5b21b6 (BR)
  const t = (cx + cy) / (size * 2);
  const bgR = Math.round(0x7c + (0x5b - 0x7c) * t);
  const bgG = Math.round(0x3a + (0x21 - 0x3a) * t);
  const bgB = Math.round(0xed + (0xb6 - 0xed) * t);

  // Play triangle vertices (relative to size)
  const s = size;
  const p1x = 0.31 * s, p1y = 0.25 * s;
  const p2x = 0.31 * s, p2y = 0.75 * s;
  const p3x = 0.74 * s, p3y = 0.50 * s;

  function sign(px, py, ax, ay, bx, by) {
    return (px - bx) * (ay - by) - (ax - bx) * (py - by);
  }
  const d1 = sign(cx, cy, p1x, p1y, p2x, p2y);
  const d2 = sign(cx, cy, p2x, p2y, p3x, p3y);
  const d3 = sign(cx, cy, p3x, p3y, p1x, p1y);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  const inTriangle = !(hasNeg && hasPos);

  const a = Math.round(alpha);
  if (inTriangle) return [255, 255, 255, a];
  return [bgR, bgG, bgB, a];
}

// ── Generate files ────────────────────────────────────────────────────────
mkdirSync('public', { recursive: true });

const png16  = makePNG(16,  (x, y, s) => drawIcon(x, y, s));
const png32  = makePNG(32,  (x, y, s) => drawIcon(x, y, s));
const png192 = makePNG(192, (x, y, s) => drawIcon(x, y, s));

const ico = makeICO([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
]);

writeFileSync('public/favicon.ico', ico);
writeFileSync('public/favicon-192.png', png192);

console.log(`favicon.ico  ${ico.length} bytes`);
console.log(`favicon-192.png  ${png192.length} bytes`);
