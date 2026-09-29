# LadyLiberty

Jasper Li 的个人博客。纯静态站点，零服务器、零数据库、零费用。

## 技术栈

| 用途 | 方案 |
| --- | --- |
| 构建 | Astro 7（默认输出零 JavaScript） |
| 内容 | Markdown / MDX |
| 样式 | Tailwind CSS 4 |
| 公式 | KaTeX（构建时渲染成静态 HTML） |
| 代码高亮 | Shiki（浅色 / 深色双主题，构建时生成） |
| 全文搜索 | Pagefind（构建时生成索引，无后端） |
| 评论 | Giscus（基于 GitHub Discussions，可选） |
| 访问统计 | Cloudflare Web Analytics（可选） |
| 部署 | GitHub Actions → GitHub Pages |

## 本地开发

```bash
npm install       # 首次运行
npm run dev       # 打开 http://localhost:4321/
```

预览正式构建的效果（搜索功能只在构建后可用）：

```bash
npm run build
npm run preview
```

检查类型与内容配置：

```bash
npm run check
```

## 写一篇文章

```bash
npm run new "文章标题"
```

会在 `src/content/posts/` 里生成一个带日期前缀的文件，打开它开始写就行。

文件头部这段声明是必须的：

```yaml
---
title: 文章标题
description: 一句话摘要，用于列表页与搜索引擎
pubDatetime: 2026-09-29T10:00:00+08:00
tags: [随笔, 工具]
featured: false   # true 会出现在首页「精选」区
draft: true       # true 只在本地可见，不会发布
---
```

写完后把 `draft` 改成 `false`，然后推送：

```bash
git add .
git commit -m "新文章：文章标题"
git push
```

## 部署

### 方式一：GitHub Pages（已启用并部署）

仓库 `Jasper-Phd/Blog` 已完成首次配置：**Settings → Pages → Source 已设为 GitHub Actions**。之后只要推送代码到 `main` 分支，就会自动构建发布。

线上地址：<https://jasper-phd.github.io/>

> 注意：首次启用 Pages 必须由仓库管理员在设置里手动操作一次，流水线里的临时凭证没有这个权限。

### 为什么网址是根路径

仓库名是 `Jasper-Phd.github.io`，属于 GitHub 的「用户主页仓库」，站点直接位于根路径。如果哪天仓库换成别的名字，站点会变成子路径部署，只需改 `astro.config.mjs` 一行：

```js
const BASE_PATH = process.env.BASE_PATH ?? "/仓库名";
```

站点内所有链接都由 `src/utils.ts` 的 `href()` 统一拼接 `import.meta.env.BASE_URL`，因此子路径、根路径、自定义域名三种情况都不需要动其他代码。

### 方式二：Cloudflare Pages（带宽不限量，推荐后期切换）

1. 在 Cloudflare 控制台创建 Pages 项目，连接这个 GitHub 仓库
2. 构建命令填 `npm run build`，输出目录填 `dist`
3. 完成后会得到一个 `xxx.pages.dev` 的免费域名

换域名后记得同步修改 `astro.config.mjs` 里的 `SITE_URL` 和 `src/config.ts` 里的 `website`。robots、sitemap、RSS 都会自动跟着变。

## 评论（已启用 Giscus）

评论区已经接好，配置在 `src/config.ts` 的 `giscus` 字段里：

| 字段 | 当前值 |
| --- | --- |
| `repo` | `Jasper-Phd/Blog` |
| `repoId` | `R_kgDOUxd9vA` |
| `category` | `Announcements` |
| `categoryId` | `DIC_kwDOUxd9vM4DGn3a` |

评论数据存在你仓库的 Discussions 里。**某个页面第一次有人留言或添加表情时，才会为它创建对应的讨论**，所以在此之前 giscus 会在控制台提示 “Discussion not found”，这是正常的。

想换分类或换仓库，改这几个字段即可。换分类时注意：giscus 只支持 **Announcements 类型**的分类，因为只有它允许应用代替访客创建讨论。

> 提示：Giscus 依赖 GitHub 登录，中国大陆访问可能较慢。介意的可以换成 Waline 或 Twikoo。

## 开启访问统计

1. 在 Cloudflare 控制台进入 **Web Analytics**，添加站点拿到 token
2. 填入 `src/config.ts` 的 `analytics.cloudflareToken`

免费、无 Cookie，不会弹出同意横幅。

## 个性化

| 想改什么 | 改哪里 |
| --- | --- |
| 博客名、作者、简介、导航、社交链接 | `src/config.ts` |
| 配色、字体、圆角、正文排版 | `src/styles/global.css` 顶部的变量区 |
| 站点地址 | `astro.config.mjs` 的 `SITE_URL` |
| 页面结构（首页、文章页、归档页……） | `src/pages/` |
| 文章可用的 frontmatter 字段 | `src/content.config.ts` |

## 目录结构

```
├─ .github/workflows/deploy.yml   推送即构建发布
├─ public/                        原样输出的静态资源
├─ scripts/new-post.mjs           新建文章脚本
├─ src/
│  ├─ components/                 页头、页脚、文章卡、目录、评论
│  ├─ content/posts/              你的文章
│  ├─ content/pages/about.md      关于页
│  ├─ layouts/Layout.astro        页面骨架
│  ├─ pages/                      路由：/、/posts、/tags、/archives、/about、/search、/rss.xml、/robots.txt
│  ├─ styles/global.css           全部样式与设计变量
│  ├─ config.ts                   站点配置
│  └─ content.config.ts           内容字段定义
├─ astro.config.mjs               构建配置（含 KaTeX 公式插件）
└─ package.json
```

## 两个实现细节

**公式**：Astro 7 默认使用原生 Markdown 处理器（Sätteri），它内置数学语法解析。`astro.config.mjs` 里注册了一个很小的 hast 插件，把公式节点在构建阶段交给 KaTeX 渲染成静态 HTML，浏览器端不需要加载任何脚本，也不依赖外部 CDN。

**搜索**：`npm run build` 会先构建站点，再用 Pagefind 扫描生成的 HTML 建索引。**开发模式下搜索页不可用**，这是正常的。

**子路径**：站点所有内部链接都由 `src/utils.ts` 里的 `href()` 统一加上 `import.meta.env.BASE_URL`，因此部署在 `/Blog/` 子路径、根路径还是自定义域名下都不需要改代码。
