import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const directory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../app/dist",
);
const html = await readFile(path.join(directory, "index.html"), "utf8");
const version = createHash("sha256").update(html).digest("hex").slice(0, 12);
const worker = await readFile(path.join(directory, "sw.js"), "utf8");
const cacheDeclaration = /const CACHE = ["'][^"']+["'];/;
if (!cacheDeclaration.test(worker)) {
  throw new Error("Could not find the service worker cache declaration");
}
await writeFile(
  path.join(directory, "sw.js"),
  worker.replace(
    cacheDeclaration,
    `const CACHE = "thuan-study-${version}";`,
  ),
);
console.log(`Offline cache version: ${version}`);
