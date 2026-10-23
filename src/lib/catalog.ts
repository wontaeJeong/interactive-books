import { getCollection, type CollectionEntry } from 'astro:content';

export type BookData = CollectionEntry<'books'>['data'];
export type Chapter = CollectionEntry<'chapters'>;
export type LibraryBook = BookData & { slug: string; chapters: Chapter[] };

export const categories = {
  ai: '인공지능',
  engineering: '개발·엔지니어링',
  life: '생활·경제',
} as const;

export function href(path = ''): string {
  // A project GitHub Pages site lives under /interactive-books/.
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function chapterSlug(chapter: Chapter) {
  return chapter.id.split('/').at(-1) ?? chapter.id;
}

export async function getLibrary(): Promise<LibraryBook[]> {
  const [bookEntries, chapters] = await Promise.all([
    getCollection('books', ({ data }) => data.status === 'published'),
    getCollection('chapters', ({ data }) => !data.draft),
  ]);
  return bookEntries.map(({ id, data }) => {
    const slug = id.replace(/\/book$/, '');
    return {
      ...data,
      slug,
      chapters: chapters
        .filter(({ data: c }) => c.book === slug)
        .sort((a, b) => a.data.chapter - b.data.chapter),
    };
  }).sort((a, b) => a.order - b.order);
}
