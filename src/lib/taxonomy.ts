// The controlled lists from CLAUDE.md section 9. One place, used by the content schema, the filters and the category pages.
export const categories = [
  'AI',
  'Open Source & GitHub',
  'Automation & Productivity',
  'Software & Tools',
  'Building Products',
  'Business & Innovation',
] as const;
export const types = ['Review', 'Comparison', 'Guide', 'Experiment', 'Build Note', 'Insight', 'Visual', 'Infographic'] as const;
// Series: ongoing sequences of articles (not categories). A controlled list, so a typo cannot create a new series.
export const series = ['Building Durbeen in Public', 'GitHub Mastery', 'Repo Reviews', 'AI for Engineers'] as const;
export const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const projectStatuses = ['In progress', 'Planned', 'Complete', 'Live'] as const;

/** URL part for a category: "Open Source & GitHub" -> "open-source-github". Also used for series names. */
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
