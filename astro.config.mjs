import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// Project Pages: https://wontaeJeong.github.io/interactive-books/
// If you rename the GitHub repository, update REPO_NAME here.
const REPO_NAME = 'interactive-books';

export default defineConfig({
  site: 'https://wontaeJeong.github.io',
  base: `/${REPO_NAME}`,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), react()],
});
