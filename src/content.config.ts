// Content collections. The build FAILS if an article's frontmatter breaks any rule below.
// Source of truth for the rules: CLAUDE.md section 9.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import tags from './content/tags.json';

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

const score = z.number().int().min(1).max(5);

const insights = defineCollection({
  // Files starting with "_" (like _template.mdx) are ignored.
  loader: glob({ base: './src/content/insights', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(120, 'description must be 120-160 characters').max(160, 'description must be 120-160 characters'),
      number: z.number().int().positive(),
      category: z.enum(categories),
      type: z.enum(types),
      level: z.enum(levels),
      tags: z.array(z.string()).min(3, 'use 3-5 tags').max(5, 'use 3-5 tags'),
      series: z.string().optional(),
      author: z.literal('Fahad Ehsan').default('Fahad Ehsan'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      lastVerified: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      heroImage: z.string().optional(),
      heroAlt: z.string().optional(),
      ogImage: z.string().optional(),
      draft: z.boolean().default(false),
      affiliate: z.boolean().default(false),
      canonicalSource: z.string().url().optional(),
      scorecard: z
        .object({ setup: score, docs: score, maintenance: score, safety: score, verdict: z.string().min(1) })
        .optional(),
    })
    .superRefine((d, ctx) => {
      const allowed = new Set<string>(tags);
      for (const t of d.tags) {
        if (!allowed.has(t)) {
          ctx.addIssue({ code: 'custom', path: ['tags'], message: `tag "${t}" is not in src/content/tags.json` });
        }
      }
      if (d.heroImage && !d.heroAlt) {
        ctx.addIssue({ code: 'custom', path: ['heroAlt'], message: 'heroAlt (alt text) is required when heroImage is set' });
      }
      if (d.scorecard && d.type !== 'Review') {
        ctx.addIssue({ code: 'custom', path: ['scorecard'], message: 'scorecard is only for type: Review' });
      }
    }),
});

export const collections = { insights };
