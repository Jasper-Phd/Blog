/**
 * 站点总配置 —— 想改博客名、作者、导航、社交链接，改这一个文件就够了。
 */
export const SITE = {
  /** 站点最终地址，结尾必须带斜杠 */
  website: "https://jasper-phd.github.io/",

  title: "LadyLiberty",
  tagline: "自由 · 理性 · 好奇心",
  description:
    "Jasper Li 的个人博客：记录研究笔记、工程实践与日常思考。",
  author: "Jasper Li",

  /** 页面语言与显示时区 */
  lang: "zh-CN",
  timezone: "Asia/Shanghai",

  /** GitHub 用户名 / 仓库 */
  githubUser: "Jasper-Phd",
  repo: "Jasper-Phd/Jasper-Phd.github.io",

  /** 首页每页显示几篇文章 */
  postsPerPage: 8,

  /** 顶部导航 */
  nav: [
    { text: "首页", href: "/" },
    { text: "标签", href: "/tags/" },
    { text: "归档", href: "/archives/" },
    { text: "关于", href: "/about/" },
  ],

  /** 社交链接（footer 与关于页使用） */
  social: [
    { name: "GitHub", href: "https://github.com/Jasper-Phd" },
    { name: "RSS", href: "/rss.xml" },
  ],

  /**
   * 评论系统 Giscus：免费、无服务器、数据存在你自己仓库的 Discussions 里。
   * 开启步骤见 README「开启评论」一节，把 enabled 改成 true 并填好两个 id 即可。
   */
  giscus: {
    enabled: false,
    repo: "Jasper-Phd/Jasper-Phd.github.io",
    repoId: "",
    category: "Announcements",
    categoryId: "",
    mapping: "pathname",
    reactionsEnabled: "1",
    inputPosition: "top",
  },

  /**
   * 访问统计：Cloudflare Web Analytics 免费且无 Cookie。
   * 在 Cloudflare 后台拿到 token 后填进来即可自动生效。
   */
  analytics: {
    cloudflareToken: "",
  },

  /** 文章版权声明 */
  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh",
  },
} as const;

export type Site = typeof SITE;
