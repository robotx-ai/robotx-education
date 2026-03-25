import { mkdir, readdir, rm, stat, copyFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.join(process.cwd(), "content", "courses");
const targetRoot = path.join(process.cwd(), "public", "lesson-assets");

async function walkAndCopy(currentSource, currentTarget) {
  const entries = await readdir(currentSource, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(currentSource, entry.name);
    const targetPath = path.join(currentTarget, entry.name);

    if (entry.isDirectory()) {
      await mkdir(targetPath, { recursive: true });
      await walkAndCopy(sourcePath, targetPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (path.extname(entry.name).toLowerCase() !== ".pdf") {
      continue;
    }

    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
}

async function main() {
  const sourceExists = await stat(sourceRoot)
    .then(() => true)
    .catch(() => false);

  if (!sourceExists) {
    console.log("[sync-lesson-assets] source folder not found, skipping.");
    return;
  }

  await rm(targetRoot, { recursive: true, force: true });
  await mkdir(targetRoot, { recursive: true });
  await walkAndCopy(sourceRoot, targetRoot);
  console.log("[sync-lesson-assets] synced lesson PDFs to public/lesson-assets.");
}

main().catch((error) => {
  console.error("[sync-lesson-assets] failed:", error);
  process.exit(1);
});

