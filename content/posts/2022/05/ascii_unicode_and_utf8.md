---
title: '字符编码：Ascii、unicode和utf8'
author: InkCat
tags:
    - 字符编码
categories:
    - 技术
date: '2022-05-24T11:52:04+08:00'
draft: false
# 支持在首页上隐藏某篇文章
hiddenFromHomePage: false
# lastmod:
---

## ASCII

`ASCII` 由电报码发展而来，是基于拉丁字母的一套电脑编码系统。
控制字符编号范围是0-31和127（`0x00-0x1F`和`0x7F`），共33个字符。（无法显示，主要是用来操控已经处理过的文字）
可显示字符编号范围是32-126（`0x20-0x7E`），共95个字符。（用户可见）
比如说空格`space`是32（二进制`0010 0000`）

局限在于只能显示26个基本拉丁字母、阿拉伯数字和英式标点符号。只能用于显示现代美国英语。解决了部分西欧语言的显示问题。

## Unicode

官方中文名称为**统一码**，是计算机科学领域的业界标准。它整理、编码了世界上大部分的文字系统，使得电脑可以用更为简单的方式来呈现和处理文字。
作为国际标准采纳于通用字符集，即 `ISO/IEC 10646`。

比如`\u4f60`表示汉字**你好**，`\u0041`表示英文字母**A**，`\u0031`表示阿拉伯数字**1**

## 非Unicode

在非Unicode环境下，由于不同国家和地区采用的字符集不一致，很可能出现无法正常显示所有字符的情况。
微软公司使用了 **代码页** 技术。UTF-7的代码页是65000，UTF-8的代码页是65001。
win电脑可以通过cmd终端-属性查看。
![ascii_unicode_and_utf8-2022-05-24-12-26-34](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/ascii_unicode_and_utf8-2022-05-24-12-26-34.png)


## UTF8

`UTF-8`（8-bit Unicode Transformation Format）是一种针对Unicode的可变长度字符编码，也是一种前缀码。它可以用一至四个字节对Unicode字符集中的所有有效编码点进行编码，**属于Unicode标准的一部分**。（**是属于Unicode实现的一种方式**）
`UTF-8`就是为了解决向后兼容ASCII码而设计，Unicode中前128个字符，使用与ASCII码相同的二进制值的单个字节进行编码，而且字面与ASCII码的字面一一对应，这使得原来处理ASCII字符的软件无须或只须做少部分修改，即可继续使用。


## 参考链接
[维基百科-ASCII](https://zh.wikipedia.org/wiki/ASCII)  
[维基百科-Unicode](https://zh.wikipedia.org/wiki/Unicode)  
[维基百科-UTF8](https://zh.wikipedia.org/wiki/UTF8)  
[Unicode-符号对应表](https://home.unicode.org/)
[Unicode-汉字编码表](http://www.chi2ko.com/tool/CJK.htm)
[阮一峰-字符编码笔记：ASCII，Unicode 和 UTF-8](https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)  