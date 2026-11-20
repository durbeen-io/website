// The controlled lists from CLAUDE.md section 9. One place, used by the content schema, the filters and the category pages.
export const categories = [
  'AI',
  'Open Source & GitHub',
  'Automation & Productivity',
  'Software & Tools',
  'Building Products',
  'Business & Innovation',
] as const;
export const types = ['Review', 'Comparison', 'Guide', 'Experiment', 'Build Note', 'Insight', 'Visual'] as const;
export const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const projectStatuses = ['In progress', 'Planned', 'Live'] as const;
