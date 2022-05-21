---
title: Hugo搭建博客
date: 2022-05-20T14:20:28+08:00
lastmod: 2022-05-20T14:20:28+08:00
author: InkCat
categories:
    - 日常
tags:
    - 博客
# nolastmod: true
draft: false
---

## 1.下载 hugo

[release 下载页面](https://github.com/gohugoio/hugo/releases)

可选 32 或 64 下载
![hugo下载](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/example-2022-05-20-18-15-04.png)

压缩包解压后，将 hugo.exe 所在目录添加到**环境变量 PATH**中
cmd 终端中执行`hugo version`，出现版本号即安装成功
![example-2022-05-20-18-15-44](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/example-2022-05-20-18-15-44.png)

## 2.BlogSite

-   **当前目录建立 Blog 目录**  
    `hugo new site Blog`
-   **为 Blog 添加主题**(个人使用 maupassant 主题)  
    [官方主题](https://themes.gohugo.io/)
-   **进入 Blog 目录**  
    `git clone https://github.com/flysnow-org/maupassant-hugo.git themes\maupassant`
-   **Blog\config.toml 文件中添加 maupassant 主题配置**
    ```
    theme=maupassant
    ```
-   **发布文章**(此命令会创建 home.md 文件到 Blog/content/posts 目录中)  
    `hugo new posts/home.md`
-   **启动 Blog 站点**  
    `hugo server`

## 3.github + picgo （图床配置）

本人使用 vscode 开发 markdown，图片粘贴上传很不方便，因此使用 github+picgo 作为图片存储

#### github 新建 public 仓库 xxx

生成 Token [地址](https://github.com/settings/tokens)

#### vscdoe 安装 picgo 插件

![example-2022-05-20-18-25-18](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/example-2022-05-20-18-25-18.png)

## 4.使用 picgo 上传图片

win 电脑在 vscode 界面下有两个快捷键（大小写不敏感）

-   Ctrl+Alt+u 上传剪贴板图片并在光标处粘贴图片链接
-   Ctrl+Alt+e 打开资源管理器选择图片上传
