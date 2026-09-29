import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "../config";
import { postFilter, postUrl, sortByPubDate } from "../utils";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts", postFilter)).sort(sortByPubDate);
  const siteUrl = new URL(import.meta.env.BASE_URL, context.site ?? SITE.website);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
