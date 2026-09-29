# 日常管理手册

## 原理

整个网站就是 GitHub 仓库里的一个个文件：文章是 `.md` 文本文件，其余是模板和样式。

```
你改文件  →  推送到 GitHub  →  GitHub 自动构建  →  一两分钟后线上更新
```

构建在 GitHub 的服务器上跑，**你的电脑不需要开机**。仓库本身就是数据库，也是备份。

## 三种管理方式

| 方式 | 适合场景 | 怎么做 |
| --- | --- | --- |
| 本地编辑器 | 日常写作，想实时预览 | 用 VS Code / Typora / Obsidian 打开 `桌面\Blog` 文件夹改文件，然后推送 |
| GitHub 网页版 | 临时改一处、换电脑、手机上 | 打开仓库 → 点进文件 → 右上角铅笔图标 → 改完点 Commit changes |
| GitHub Codespaces | 想在浏览器里完整开发 | 仓库页面 Code → Codespaces，免费额度够用，等于网页版 VS Code |

三种方式最后都是「改文件 → 提交到 main 分支 → 自动发布」，效果一样。

## 发表文章

### 第一步：新建文件

在 `桌面\Blog` 目录下打开终端，运行：

```powershell
npm run new "文章标题"
```

会在 `src/content/posts/` 下生成一个带日期前缀的文件，比如 `2026-09-29-文章标题.md`，默认是草稿状态。

也可以直接在 `src/content/posts/` 里手动新建一个 `.md` 文件，从现有文章复制一份头部。

### 第二步：写正文

文件头部必须有这一段，字段含义见下表：

```yaml
---
title: 文章标题
description: 一句话摘要，用于列表页和搜索引擎
pubDatetime: 2026-09-29T10:00:00+08:00
categories: [技术]
tags: [数学, 工具]
draft: false
---
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `description` | 否 | 摘要，显示在列表和搜索结果里 |
| `pubDatetime` | 是 | 发布时间，格式 `年-月-日T时:分:秒+08:00` |
| `updatedDatetime` | 否 | 修改时间，加了会在文章页显示「更新于」 |
| `categories` | 否 | 分类，会显示在标题下方，可点击 |
| `tags` | 否 | 标签，显示在摘要下方 |
| `featured` | 否 | 保留字段，当前版本列表页不展示 |
| `draft` | 否 | `true` 只在本地可见，不会发布 |

正文就是普通 Markdown：`##` 是二级标题、`**粗体**`、`> 引用`、三个反引号是代码块、`$公式$` 是数学公式。二级三级标题会自动出现在左栏目录里。

### 第三步：本地预览

```powershell
npm run dev
```

打开 <http://localhost:4321> 边写边看，保存即刷新。按 `Ctrl+C` 停止。

草稿状态在本地能正常看到，发布时会自动排除。

### 第四步：发布

先把 `draft` 改成 `false`，然后：

```powershell
git add .
git commit -m "新文章：文章标题"
git push
```

一两分钟后打开 <https://jasper-phd.github.io/> 就能看到。

## 修改文章

直接打开对应的 `.md` 文件改，然后 `git add . && git commit -m "修改：xxx" && git push`。

**网址不会变**——网址由文件名决定，与标题无关，所以改标题不会影响已有的链接和外链收录。想记录修改时间，加一行 `updatedDatetime`。

## 删除文章

删掉 `src/content/posts/` 下对应的 `.md` 文件，然后提交推送：

```powershell
git rm src/content/posts/要删的文章.md
git commit -m "删除：要删的文章"
git push
```

原来那一页会变成 404。

**如果只是暂时不想让人看到**，别删文件，把 `draft` 改成 `true` 再推送即可——线上消失，本地还在，以后随时改回来。

## 文件名就是网址

`src/content/posts/hello-ladyliberty.md` 对应 `https://jasper-phd.github.io/posts/hello-ladyliberty/`。

`npm run new` 生成的带日期前缀，网址会变成 `/posts/2026-09-29-标题/`。不想要日期就手动把文件重命名成 `标题.md`。

**改名等于换网址**，旧链接会失效，所以建议一开始就定好一个英文短名。

## 图片

| 用途 | 放哪里 | 怎么引用 |
| --- | --- | --- |
| 文章配图 | `src/assets/` | 正文写 `![说明](../../assets/图片名.png)` |
| 展示廊 | `src/assets/gallery/` | 不用引用，自动出现在 `/gallery/` |
| 个人照片 | `src/assets/photo.jpg` | 替换文件即可 |

所有图片在构建时自动压缩、转格式、生成多尺寸，**不需要你手动处理**。原图多大都行。

## 修改网站本身

| 想改什么 | 改哪里 |
| --- | --- |
| 博客名、作者、简介、邮箱、导航菜单 | `src/config.ts` |
| 配色、字体、间距 | `src/styles/global.css` 顶部的变量区 |
| 关于页 | `src/content/pages/about.md` |
| 学术页 | `src/content/pages/academic.md` |
| 资源页 | `src/content/pages/resources.md` |
| 时间轴 | `src/config.ts` 的 `timeline` |
| 友链 | `src/config.ts` 的 `friends` |
| 首页每页几篇 | `src/config.ts` 的 `postsPerPage` |
| 站点网址 | `astro.config.mjs` 的 `SITE_URL` |
| 评论开关 | `src/config.ts` 的 `giscus.enabled` |
| 访客计数开关 | `src/config.ts` 的 `visitorCounter` |

## 出问题怎么办

### 先确认是不是发布失败

打开仓库页面的 **Actions** 标签。绿勾是成功，红叉是失败——点进去能看到具体哪一步报错。

### 本地先自检

```powershell
npm run check    # 检查文章字段有没有填错、代码有没有语法问题
npm run build    # 完整构建一遍，本地能过线上基本能过
```

最常见的三种错误：

1. **日期格式写错**：必须是 `2026-09-29T10:00:00+08:00` 这种完整格式。
2. **字段缩进错位**：`---` 之间的字段必须顶格，同一层级缩进一致。
3. **`---` 没配对**：头部上下各要有一行 `---`。

### 推错了想撤回

方法一：在 GitHub 仓库页面点 **Commits**，找到上一个正常的提交，点进去，右上角选择 **Revert**，会生成一个反向提交，走一遍流程即可。

方法二：本地执行 `git revert HEAD` 然后 `git push`。

每次提交都是一个还原点，任何一次改动都能找回来。

## 备份

- **GitHub 仓库本身就是备份**，而且保留全部历史版本。
- 想额外存一份：仓库页面 **Code → Download ZIP**。
- `node_modules`（依赖）和 `dist`（构建产物）不用备份，都能重新生成。
- 真正要保住的是 `src/`（文章和模板）、`public/`、`src/assets/`（图片）和几个配置文件。

## 常用命令

```powershell
npm run new "标题"   # 新建文章
npm run dev          # 本地预览，边写边看
npm run build        # 完整构建（含搜索索引）
npm run check        # 检查错误
```

## 一条经验

每次推送都会触发一次自动构建，所以**攒几处修改一起推**，比改一个字推一次好。推送前跑一下 `npm run build`，本地通过线上基本就没问题。
