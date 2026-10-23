import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content/books/', import.meta.url);
const dirs = readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const errors = [];
const published = [];

for (const slug of dirs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`Invalid book slug: ${slug}`);
  const dir = new URL(`${slug}/`, root);
  const book = JSON.parse(readFileSync(new URL('book.json', dir), 'utf8'));
  if (!book.title || !book.subtitle || !book.description) errors.push(`${slug}: incomplete book metadata`);
  if (book.status === 'published') published.push(slug);
  const chapterNumbers = new Set();
  const chapters = readdirSync(dir).filter(f => /\.mdx?$/.test(f));
  for (const filename of chapters) {
    const content = readFileSync(new URL(filename, dir), 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) { errors.push(`${slug}/${filename}: missing YAML frontmatter`); continue; }
    const fm = Object.fromEntries(match[1].split(/\r?\n/).filter(line => line.includes(':')).map(line => {
      const i = line.indexOf(':'); return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }));
    if (fm.book !== slug) errors.push(`${slug}/${filename}: frontmatter book must be '${slug}'`);
    const number = Number(fm.chapter);
    if (!Number.isInteger(number) || number < 1) errors.push(`${slug}/${filename}: invalid chapter number`);
    if (chapterNumbers.has(number)) errors.push(`${slug}: duplicate chapter number ${number}`);
    chapterNumbers.add(number);
    if (!fm.title || !fm.description) errors.push(`${slug}/${filename}: title/description required`);
  }
  if (book.status === 'published' && chapters.length === 0) errors.push(`${slug}: published book has no chapters`);
}
if (errors.length) { console.error(errors.map(e => `- ${e}`).join('\n')); process.exit(1); }
console.log(`Verified ${dirs.length} books (${published.length} published).`);
