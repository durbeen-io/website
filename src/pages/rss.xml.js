// RSS feed: every published article, newest first. Drafts never appear (see src/lib/articles.ts).
import rss from '@astrojs/rss';
import { getArticles, articleHref } from '../lib/articles';

export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: 'Durbeen',
    description: 'Field notes from the edge of technology: reviews, experiments, guides and build notes from an independent technology lab.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishDate,
      link: articleHref(a),
      categories: [a.data.category, ...a.data.tags],
      author: a.data.author,
    })),
    customData: '<language>en</language>',
  });
}
