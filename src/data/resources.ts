// Resources: a short starter list. Every URL was opened and checked on LAST_CHECKED (final address after redirects;
// content confirmed). Links are not checked automatically: the CI link check is offline and only covers this site.
// Re-check them in the monthly health check (CLAUDE.md phase 9). Never add a link you have not opened.
export const LAST_CHECKED = '20 Nov 2026';

export interface Resource {
  name: string;
  note: string;
  href: string;
}
export interface ResourceGroup {
  title: string;
  items: Resource[];
}

export const resources: ResourceGroup[] = [
  {
    title: 'Durbeen',
    items: [
      { name: 'Durbeen on GitHub', note: 'The Durbeen organisation.', href: 'https://github.com/durbeen-io' },
      { name: 'This website, on GitHub', note: 'The open source code of durbeen.io.', href: 'https://github.com/durbeen-io/website' },
    ],
  },
  {
    title: 'Built with',
    items: [
      { name: 'Astro documentation', note: 'The framework this website is built with.', href: 'https://docs.astro.build/en/getting-started/' },
      { name: 'Cloudflare Workers: static assets', note: 'How this website is hosted.', href: 'https://developers.cloudflare.com/workers/static-assets/' },
      { name: 'Pagefind', note: 'The search on this website. It runs without a server.', href: 'https://pagefind.app/' },
      { name: 'MarkItDown', note: 'A Python tool for converting files and office documents to Markdown. Used in TokenSave.', href: 'https://github.com/microsoft/markitdown' },
      { name: 'Noodlesoft, the maker of Hazel', note: 'Hazel runs rules on folders and files on a Mac. Used in TokenSave.', href: 'https://www.noodlesoft.com/' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { name: 'GitHub Docs: Hello World', note: "A short exercise that teaches GitHub's pull request workflow. A good first step.", href: 'https://docs.github.com/en/get-started/using-github/hello-world' },
      { name: 'Pro Git', note: 'The free book on Git.', href: 'https://git-scm.com/book/en/v2' },
      { name: 'TypeScript Handbook', note: 'The official introduction to TypeScript.', href: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { name: 'Claude Code documentation', note: "Anthropic's guide to Claude Code.", href: 'https://code.claude.com/docs/en/overview' },
    ],
  },
];
