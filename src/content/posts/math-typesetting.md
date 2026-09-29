---
title: 在 Markdown 里优雅地写数学公式
description: 用 KaTeX 在静态博客中渲染公式：行内公式、编号、多行对齐与矩阵。
pubDatetime: 2026-09-26T14:20:00+08:00
tags: [数学, 工具]
featured: true
draft: false
---

## 行内与独立公式

行内公式用一对美元符号包起来，比如质能方程 $E = mc^2$，它跟着正文走，不会破坏行高。

需要独占一行、居中显示时，用两对美元符号：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,\mathrm{d}x = \sqrt{\pi}
$$

这个高斯积分的结果是 $\sqrt{\pi}$，在概率论和物理里出现得极其频繁。

## 对齐与多行推导

多步推导用 `aligned` 环境，让等号对齐：

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0\varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## 矩阵与方程组

矩阵、向量都没问题：

$$
\mathbf{A} =
\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix},
\qquad
\det(\mathbf{A}) = \sum_{\sigma \in S_3} \operatorname{sgn}(\sigma) \prod_{i=1}^{3} a_{i,\sigma(i)}
$$

## 几点实践建议

1. 公式照旧写在 Markdown 里，构建时会被渲染成静态 HTML，浏览器不需要额外加载脚本。
2. 行内公式两侧留出空格，避免和其他字符粘在一起导致解析失败。
3. 下标里出现多个字符时记得加大括号，`a_{ij}` 而不是 `a_ij`。
4. 如果一个符号在文中反复出现，第一次出现时给一句解释，比堆砌定义有用得多。

