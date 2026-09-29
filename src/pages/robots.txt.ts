import type { APIContext } from "astro";
import { SITE } from "../config";

export function GET(context: APIContext) {
  const siteUrl = new URL(import.meta.env.BASE_URL, context.site ?? SITE.website);

  const body = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
