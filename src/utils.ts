import type { CollectionEntry } from "astro:content";
import { SITE } from "./config";

export type Post = CollectionEntry<"posts">;

/** 构建时的仓库子路径，根路径部署时为空字符串 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

/**
 * 给站内绝对路径补上仓库子路径。
 * 例如 href("/posts/x/") 在子路径部署下会变成 /Blog/posts/x/。
 */
export function href(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** 开发环境显示草稿，正式构建时自动排除 */
export function postFilter({ data }: Post) {
  return import.meta.env.PROD ? data.draft !== true : true;
}

/** 按发布时间从新到旧排序 */
export function sortByPubDate(a: Post, b: Post) {
  return b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf();
}

const dateFormatter = new Intl.DateTimeFormat(SITE.lang, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: SITE.timezone,
});

export function formattedDate(date: Date) {
  return dateFormatter.format(date);
}

export function yearOf(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: SITE.timezone,
  }).format(date);
}

/** 粗略估算阅读时长（中文按字数，英文按词数） */
export function readingTime(body = "") {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ");
  const cjk = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = (text.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 350 + words / 220));
}

export function postUrl(post: Post) {
  return href(`/posts/${post.id}/`);
}

export function tagUrl(tag: string) {
  return href(`/tags/${encodeURIComponent(tag)}/`);
}

export function categoryUrl(category: string) {
  return href(`/categories/${encodeURIComponent(category)}/`);
}

function countBy(values: string[]) {
  const counter = new Map<string, number>();
  for (const value of values) {
    counter.set(value, (counter.get(value) ?? 0) + 1);
  }
  return counter;
}

/** 统计所有标签及其文章数，按数量倒序 */
export function getUniqueTags(posts: Post[]) {
  const counter = countBy(posts.flatMap((post) => post.data.tags));
  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, SITE.lang));
}

/** 统计所有分类及其文章数，按数量倒序 */
export function getUniqueCategories(posts: Post[]) {
  const counter = countBy(posts.flatMap((post) => post.data.categories));
  return [...counter.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort(
      (a, b) =>
        b.count - a.count || a.category.localeCompare(b.category, SITE.lang),
    );
}

export function getPostsByTag(posts: Post[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getPostsByCategory(posts: Post[], category: string) {
  return posts.filter((post) => post.data.categories.includes(category));
}

/** 按年份分组，用于归档页 */
export function groupByYear(posts: Post[]) {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = yearOf(post.data.pubDatetime);
    const list = groups.get(year) ?? [];
    list.push(post);
    groups.set(year, list);
  }
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}
