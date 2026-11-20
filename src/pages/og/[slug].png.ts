// One OG image per article (/og/<slug>.png) plus a default one (/og/default.png) for every other page.
import type { APIRoute } from 'astro';
import { getArticles, readingMinutes, type Article } from '../../lib/articles';
import { renderOg } from '../../lib/og';

export async function getStaticPaths() {
  const articles = await getArticles();
  return [
    { params: { slug: 'default' }, props: { article: undefined } },
    ...articles.map((article) => ({ params: { slug: article.id }, props: { article } })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const article = props.article as Article | undefined;
  const png = article
    ? await renderOg({
        label: `N°${String(article.data.number).padStart(3, '0')} · ${article.data.type.toUpperCase()} · ${readingMinutes(article)} MIN`,
        title: article.data.title,
      })
    : await renderOg({ label: 'DISCOVER → EVALUATE → BUILD → SHARE', title: 'Field notes from the edge of technology.' });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
