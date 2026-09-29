// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import katex from "katex";

// 站点最终地址。换成自定义域名时，只改这一行（结尾带斜杠）。
const SITE_URL = "https://jasper-phd.github.io/";

// GitHub Pages 的仓库子路径。当前仓库叫 Blog，所以站点地址是
// https://jasper-phd.github.io/Blog/
//
// 如果把仓库改名成 Jasper-Phd.github.io（用户主页仓库），
// 只要把下面这行改成 "/"，就会变成 https://jasper-phd.github.io/
const BASE_PATH = process.env.BASE_PATH ?? "/Blog";

/**
 * 把 Markdown 里的 $行内公式$ 与 $$独立公式$$ 在构建阶段渲染成 KaTeX 静态 HTML。
 * 浏览器端不需要任何脚本，也不依赖外部 CDN。
 *
 * 这是一个很小的 hast 访问器插件（Sätteri 的原生 Markdown 管线会在
 * 遇到数学节点时输出 <code class="language-math"> 元素）。
 *
 * @type {any}
 */
const katexPlugin = {
  name: "katex",
  element: {
    filter: ["code"],
    /** @param {any} node */
    visit(node) {
      const raw = node.properties?.className;
      const classes = Array.isArray(raw) ? raw : String(raw ?? "").split(/\s+/);
      if (!classes.includes("language-math")) return;

      const children = /** @type {any[]} */ (node.children ?? []);
      const tex = children.map((child) => child.value ?? "").join("");
      const display = classes.includes("math-display");

      return {
        type: "raw",
        value: katex.renderToString(tex, {
          displayMode: display,
          throwOnError: false,
          strict: "ignore",
        }),
      };
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      features: { math: true },
      hastPlugins: [katexPlugin],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
