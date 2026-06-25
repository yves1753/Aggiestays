import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const dir = "public/photos";
const files = await readdir(dir);
const targets = files.filter(f => /\.(png|jpe?g)$/i.test(f));
let savedBytes = 0, count = 0;
for (const f of targets) {
  const inp = join(dir, f);
  const out = join(dir, basename(f, extname(f)) + ".webp");
  const before = (await stat(inp)).size;
  try {
    await sharp(inp)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(out);
    const after = (await stat(out)).size;
    savedBytes += (before - after);
    count++;
    await unlink(inp);
  } catch (e) {
    console.error("Failed", f, e.message);
  }
}
console.log(`Converted ${count} images. Saved ${(savedBytes/1024/1024).toFixed(1)} MB`);
