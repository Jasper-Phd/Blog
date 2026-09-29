---
title: 代码块、表格与图文混排
description: 展示正文里最常用的几种排版元素，顺便记录一个真实的小问题。
pubDatetime: 2026-09-22T20:05:00+08:00
categories: [技术]
tags: [工程, 工具]
featured: false
draft: false
---

## 带高亮的代码块

写代码时用三个反引号加语言名，构建阶段就会完成语法高亮，并把浅色与深色两套配色都打包进去：

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Reading:
    title: str
    tags: tuple[str, ...]
    minutes: int


def summarize(readings: list[Reading]) -> dict[str, int]:
    """按标签汇总阅读时长。"""
    total: dict[str, int] = {}
    for item in readings:
        for tag in item.tags:
            total[tag] = total.get(tag, 0) + item.minutes
    return dict(sorted(total.items(), key=lambda kv: kv[1], reverse=True))
```

行内代码用单个反引号，比如 `npm run build`，一眼就能和正文区分开。

## 表格

| 场景 | 用静态博客 | 用动态博客 |
| --- | --- | --- |
| 写技术笔记 | 非常合适 | 合适 |
| 需要登录后台 | 需要额外配置 | 开箱即用 |
| 每年成本 | 0 元 | 服务器 + 域名 |
| 被攻击风险 | 基本没有 | 需要持续打补丁 |

## 引用与提示

> 工具的价值在于让你几乎感觉不到它的存在。需要不断照料的东西，最后都会变成负担。

## 记一个真实的小问题

重构时遇到过一个很典型的毛病：本地开发时文章列表正常，构建出来的页面却少了几篇。原因是首页对文章做了排序和过滤，而过滤条件和列表页写得不一致，草稿在生产环境被排除后，分页数量就对不上了。

解决办法是把「哪些文章可见」这件事收敛成一个函数，所有页面都调用它：

```ts
export function postFilter({ data }: Post) {
  return import.meta.env.PROD ? data.draft !== true : true;
}
```

一个判断，一处定义，所有页面共用。这类问题几乎都不会再出现。

## 图片

图片放在 `src/assets/` 目录里，构建时会自动压缩并转成更省流量的格式：

```markdown
![示意图](../assets/example.png)
```

如果图片来自网络，记得在 Markdown 里写清楚来源，方便日后追溯。
