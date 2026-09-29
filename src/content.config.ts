import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

/**
 * 文章集合。每篇文章放在 src/content/posts/ 下，一个 .md 或 .mdx 文件。
 * 文件头部用 frontmatter 声明元信息，字段规则就写在这里。
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDatetime: z.coerce.date(),
    updatedDatetime: z.coerce.date().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    /** draft: true 的文章只在本地开发时可见，不会发布 */
    draft: z.boolean().default(false),
    /** featured: true 的文章会出现在首页精选区 */
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
  }),
});

export const collections = { posts, pages };
