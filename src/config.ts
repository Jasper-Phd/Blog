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

  /** 侧边栏「联系方式」里显示的邮箱 */
  email: "jasperli.phd@gmail.com",

  /** 建站日期，页脚据此显示站龄 */
  since: "2026-09-29",

  /** 关于页的时间轴；留空则不显示整块 */
  timeline: [
    { year: "2026", zh: "开始写这个博客", en: "Started this blog" },
  ] as { year: string; zh: string; en: string }[],

  /** 列表每页显示几篇文章 */
  postsPerPage: 3,

  /** 侧边栏导航 */
  nav: [
    { href: "/", zh: "首页", en: "Home", icon: "home" },
    { href: "/categories/", zh: "分类", en: "Categories", icon: "folder" },
    { href: "/archives/", zh: "归档", en: "Archive", icon: "archive" },
    { href: "/tags/", zh: "标签", en: "Tags", icon: "tag" },
    { href: "/academic/", zh: "学术", en: "Academics", icon: "academic" },
    { href: "/resources/", zh: "资源", en: "Resources", icon: "resources" },
    { href: "/gallery/", zh: "展示廊", en: "Gallery", icon: "gallery" },
    { href: "/about/", zh: "关于", en: "About", icon: "user" },
  ],

  /**
   * 友情链接。留空则侧边栏不显示这一块。
   * 添加格式：{ name: "站名", href: "https://example.com" }
   */
  friends: [] as { name: string; href: string }[],

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
    enabled: true,
    repo: "Jasper-Phd/Jasper-Phd.github.io",
    repoId: "R_kgDOUxd9vA",
    category: "Announcements",
    categoryId: "DIC_kwDOUxd9vM4DGn3a",
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

  /**
   * 页脚显示的访客数（不蒜子）。免费、无需注册。
   * 它会把访问者 IP 发给第三方用于去重，介意的话改成 false。
   */
  visitorCounter: true,

  /** 文章版权声明 */
  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh",
  },
} as const;

export type Site = typeof SITE;
