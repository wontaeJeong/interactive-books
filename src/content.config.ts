import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const books = defineCollection({
  loader: glob({ pattern: '**/book.json', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    category: z.enum(['ai', 'engineering', 'life']),
    level: z.enum(['입문', '기초·심화', '중급']),
    cover: z.enum(['iris', 'ink', 'sage']),
    glyph: z.string(),
    volume: z.number().int().positive(),
    order: z.number().int(),
    status: z.enum(['published', 'draft']).default('published'),
  }),
});

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    book: z.string(),
    chapter: z.number().int().positive(),
    minutes: z.number().int().positive(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { books, chapters };
