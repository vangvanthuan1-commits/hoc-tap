import { cp, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "app/public/legacy");
await mkdir(target, { recursive: true });
for (const file of await readdir(root))
  if (file.endsWith(".html"))
    await cp(path.join(root, file), path.join(target, file));
for (const file of ["video-c-lofi-nam-minh.mp4", "frames/slide_00.png"]) {
  const destination = path.join(target, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, file), destination);
}
console.log("Copied original study pages and their media to app/public/legacy.");
