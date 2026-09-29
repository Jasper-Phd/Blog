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
categories: [随笔]      # 分类，用于侧边栏统计与 /categories/ 页面
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

仓库 `Jasper-Phd/Jasper-Phd.github.io` 已完成首次配置：**Settings → Pages → Source 已设为 GitHub Actions**。之后只要推送代码到 `main` 分支，就会自动构建发布。

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
| `repo` | `Jasper-Phd/Jasper-Phd.github.io` |
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
| 侧边栏显示的邮箱与 GitHub | `src/config.ts` 的 `email`、`githubUser` |
| 友链 | `src/config.ts` 的 `friends`，留空则侧边栏不显示这一块 |
| 个人照片 | 替换 `src/assets/photo.jpg` 这一个文件即可 |
| 配色、字体、圆角、正文排版 | `src/styles/global.css` 顶部的变量区 |
| 站点地址 | `astro.config.mjs` 的 `SITE_URL` |
| 页面结构（首页、文章页、归档页……） | `src/pages/` |
| 文章可用的 frontmatter 字段 | `src/content.config.ts` |

## 侧边栏

左侧栏分上下两块：

- **上块**：博客名（居中）→ 作者署名 → 一句话简介 → 树枝装饰 → 导航（首页 / 分类 / 归档 / 标签 / 学术 / 资源 / 展示廊 / 关于，带图标）
- **下块**：照片 → 文章/分类/标签统计（均可点击）→ 邮箱与 GitHub（悬停有位移的传送效果）→ 友链 → 搜索 / 深浅色 / 语言 / RSS 工具行

宽屏下它**固定在左侧**：滚动右栏时左栏不动（`position: sticky`）。侧栏内容高度约 835px，在 1440×900 及以上分辨率能完整显示；屏幕更矮时侧栏内部可以滚动，但滚动条是隐藏的，所以不会多出一条竖线。窄屏下侧栏收进抽屉，由顶栏的菜单键唤出（点遮罩、按 Esc 或点任意链接都会关闭）。

> 加上八个导航项后侧栏内容约 980px 高，在 1920×1080 能完整显示；更矮的屏幕靠栏内滚动查看，同样没有可见滚动条。

下块里还会**按页面自动出现「目录」**，不需要目录的页面保持原样：

| 页面 | 目录 |
| --- | --- |
| 文章页 | 该文章的二、三级标题，点击跳转 |
| 关于页 | 页面内的各级标题 |
| 归档页 | 按年份跳转（年份多于一个时才出现） |
| 首页 / 分类 / 标签 / 搜索 / 404 | 不显示，左栏保持不变 |

目录超过一屏时内部可滚动（同样不显示滚动条），高度上限 `34vh`，不会把联系方式等区块挤出屏幕。文章页在窄屏下改为在正文里显示目录，因为那时左栏是收起的。

添加友链：

```ts
// src/config.ts
friends: [
  { name: "某某的博客", href: "https://example.com" },
],
```

个人照片放在 `src/assets/photo.jpg`，按 16:9 矩形展示，构建时会自动压缩并转成 WebP（1600×900 的原图 233KB，输出约 9KB），不需要手动压缩。

## 中英文切换

左栏工具行里有一个语言按钮（中文界面显示 `EN`，英文界面显示 `中`），点击即时切换界面文字，选择会记在浏览器里，下次访问保持。

实现方式是每处文案中英文各渲染一份，用 `html[data-lang]` 控制显示哪一个——所以切换不刷新页面、不闪烁，也不依赖额外脚本。文案统一用 `src/components/T.astro` 包裹：

```astro
<T zh="阅读全文" en="Read more" />
```

导航的中英文写在 `src/config.ts` 的 `nav` 里。

**注意**：切换的是界面文字，文章正文本身不会翻译。另外 `draft` 状态的说明、页面 `<title>` 与 SEO 描述仍以中文输出，因为那些在构建时就固定了。

## 页面

| 路径 | 内容 |
| --- | --- |
| `/` | 首页文章列表 |
| `/categories/`、`/tags/`、`/archives/` | 分类、标签、归档 |
| `/academic/` | 学术，编辑 `src/content/pages/academic.md` |
| `/resources/` | 资源，编辑 `src/content/pages/resources.md` |
| `/gallery/` | 展示廊，图片放进 `src/assets/gallery/` 自动出现 |
| `/about/` | 关于，编辑 `src/content/pages/about.md` |

学术、资源、关于三个页面共用 `src/components/MarkdownPage.astro`，想再加一个同类页面，只需要建一个 `.md` 和一个几行的 `.astro`，再把导航项加进 `src/config.ts`。

## 绿色主题与自然元素

整站是森林绿主题，配色全部集中在 `src/styles/global.css` 顶部的变量区。**每种颜色承担固定的语义**，不是随便撒的：

| 变量 | 色值 | 用在哪 |
| --- | --- |
| `--accent` | 森林绿 | 主色：导航、当前项、标签、按钮、悬停态 |
| `--accent-2` | 暖阳金 | **分类**（文章页的分类胶囊）与页脚秋千 |
| `--accent-3` | 河水蓝 | **文本链接**：正文内链接、许可协议链接、返回链接；以及文章分隔的水波 |
| `--accent-4` | 花朵粉 | 纯装饰，只出现在页脚的花与底纹里 |

一句话记：**绿色是界面，金色是分类，蓝色是可点的文字，粉色只做装饰。**

页面背景是纯色，不铺任何底纹或渐变，避免干扰阅读。自然元素全部是 SVG 现画的矢量图形，不含图片资源，随主题自动变色、任意缩放都不糊：

- **树叶**：侧边栏品牌区下方的树枝、各级小标题前的叶子图标
- **小河与花朵**：页脚的小景；文章之间的分隔也是一小段水波，与页脚呼应

## 间距与版式规范

全站间距只允许用一套 4px 基准的刻度，写在 `global.css` 里：

| 变量 | 值 | | 变量 | 值 |
| --- | --- | --- | --- | --- |
| `--sp-1` | 4px | | `--sp-8` | 32px |
| `--sp-2` | 8px | | `--sp-12` | 48px |
| `--sp-3` | 12px | | `--sp-16` | 64px |
| `--sp-4` | 16px | | `--sp-24` | 96px |
| `--sp-6` | 24px | | | |

布局用的 margin、padding、gap 一律取自这套刻度（标记里的 Tailwind 类也只允许 `-1 / -2 / -3 / -4 / -6 / -8 / -12 / -16 / -24`）。字号、行高、控件尺寸属于另一套体系，不在此列。

## 图片规范

所有图片统一圆角 `--radius-sm`（10px）加一条 `--border` 描边。展示型图片（侧栏照片、展示廊）统一裁成 **16:9**；文章正文里的插图保留原始比例，只继承圆角和描边，不做裁切。

侧栏的两张卡片也拉开了层级：**上块（身份 + 导航）是极浅的绿底**（`--surface-tint`），下块保持白底，一眼能分清"名片"和"功能区"。

页面的空状态（比如展示廊还没有图片时）用统一处理：淡色图标 + 虚线边框 + 一句完整的话，不留一句光秃秃的提示。

## 玩法与彩蛋

### 四季自动换色

站点会根据访问时的真实月份切换配色，**始终是绿色基调**，只是色相随季节偏移：

| 月份 | 季节 | 主色 |
| --- | --- | --- |
| 3–5 月 | 春 | 新叶绿 + 樱粉辅助色 |
| 6–8 月 | 夏 | 森林绿（默认色） |
| 9–11 月 | 秋 | 转黄绿 + 秋阳橙 |
| 12–2 月 | 冬 | 冷杉青绿 + 冰蓝 |

底色也会跟着微调（春天偏清亮、秋天偏暖纸感）。想预览其它季节，加一个查询参数即可，不会写进浏览器存储：

```
https://jasper-phd.github.io/?season=spring
```

另外，**傍晚 17:00–19:00** 访问时，浅色模式的纸面会自动偏暖一点。

### 交互

| 玩法 | 怎么触发 |
| --- | --- |
| 落叶 | 点击左栏品牌名下方那根小树枝 |
| 标题长叶子 | 鼠标悬停任意文章标题 |
| 随机一篇 | 左栏工具行的「风」图标按钮 |
| 深浅色涟漪 | 切换深浅色时，新配色从按钮位置像水波一样铺开 |
| 藤蔓阅读进度 | 文章页右侧那条细藤蔓随滚动生长，叶尖跟着走 |

深浅色涟漪和页面之间的过渡用的是浏览器原生的 View Transitions API。**不支持的浏览器会自动退回普通切换**，不会报错，也不会卡住。

### 本地阅读足迹

浏览器本地（`localStorage`，不上传任何数据）记录每篇文章读到百分之几。当你读到一半离开，下次打开站点时左栏会出现「继续阅读」，直接跳回上次的位置，并显示读到的百分比。

想清空记录：浏览器设置里清除本站数据即可。

### 标签星图

`/tags/` 页面顶部是一张关系图：节点是标签、大小代表文章数，两个标签出现在同一篇文章里就连一条线。布局在构建时用简单的力导向算好，输出的是纯静态 SVG，页面不加载任何图形库。下面的标签云照旧保留。

### 时间轴

关于页底部是一条纵向时间轴，内容写在 `src/config.ts` 的 `timeline` 里：

```ts
timeline: [
  { year: "2026", zh: "开始写这个博客", en: "Started this blog" },
],
```

留空数组即可整块隐藏。

### 站龄与打印

页脚会显示「本站已运行 N 天」，起算日期是 `src/config.ts` 的 `since`。

打印文章时会自动去掉侧栏、页脚、目录、评论和相邻文章，只留正文；正文里的外链会在括号里补上完整网址，方便纸质阅读时回溯。

想调浓淡，直接改对应组件里的 `opacity`；不想要某个元素，删掉对应组件即可。

## 文章列表

每页 3 篇（`src/config.ts` 的 `postsPerPage`），每篇的排版是：

1. **标题居中突出**
2. **一行居中的元信息**，用竖线分隔：

   ```
   📅 发表于 2026-09-29 | 📁 分类于 随笔 | 📄 字数统计：345 | 🕐 阅读时长约 1 分钟
   ```

   分类那一项是跳转链接，宽屏强制单行，窄屏自动折行。
3. **正文摘要**：由 `src/utils.ts` 的 `excerpt()` 从正文自动截取约 300 字，去掉标题行、代码块、公式和 Markdown 表格
4. **标签**
5. **「阅读全文」按钮**（标签与按钮在同一行，分居左右）

文章之间用「大段留白 + 居中短横线」分隔（默认 6rem，也就是两篇之间约 194px），底部是翻页控件，整体放在右栏的白色面板里。

左右两栏的比例是 288px : 720px（约 1 : 2.5），整个内容区最大宽度 1080px 并居中，因此侧边栏不会贴着屏幕左边缘。

> `featured` 字段仍然保留在 frontmatter 里，但列表页目前不展示「精选」标记——因为元信息行要限制在一行内，加上它会被挤到第二行。想恢复的话，在 `src/components/PostListItem.astro` 的 `.post-meta-line` 里加回 `.badge-featured` 即可。

## 目录结构

```
├─ .github/workflows/deploy.yml   推送即构建发布
├─ public/                        原样输出的静态资源
├─ scripts/new-post.mjs           新建文章脚本
├─ src/
│  ├─ components/                 侧边栏、窄屏顶栏、页脚、文章卡、目录、评论
│  ├─ content/posts/              你的文章
│  ├─ content/pages/about.md      关于页
│  ├─ layouts/Layout.astro        页面骨架
│  ├─ pages/                      路由：/、/posts、/categories、/tags、/archives、/about、/search、/rss.xml、/robots.txt
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
