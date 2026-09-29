#!/usr/bin/env node
/**
 * 新建文章：npm run new "文章标题"
 * 会在 src/content/posts/ 下生成一个带日期前缀、默认草稿状态的 Markdown 文件。
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('用法：npm run new "文章标题"');
  process.exit(1);
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");

const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:00`;

const offsetMinutes = -now.getTimezoneOffset();
const sign = offsetMinutes >= 0 ? "+" : "-";
const absMinutes = Math.abs(offsetMinutes);
const timezone = `${sign}${pad(Math.floor(absMinutes / 60))}:${pad(absMinutes % 60)}`;

const slug =
  title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "") || "post";

const directory = join(process.cwd(), "src", "content", "posts");
mkdirSync(directory, { recursive: true });

const filePath = join(directory, `${date}-${slug}.md`);

if (existsSync(filePath)) {
  console.error(`文件已存在：${filePath}`);
  process.exit(1);
}

const template = `---
title: ${title}
description: ""
pubDatetime: ${date}T${time}${timezone}
categories: []
tags: []
featured: false
draft: true
---

<!-- 提示：写完把 draft 改成 false 才会发布。
     插图片写成 ![说明](../../assets/图片名.png)，图片放在 src/assets/ 目录，构建时自动压缩。 -->

在这里开始写正文。

`;

writeFileSync(filePath, template, "utf8");
console.log(`已创建 ${filePath}`);
