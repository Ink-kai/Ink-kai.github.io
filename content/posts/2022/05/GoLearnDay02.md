---
title: 'Go单元测试-总结'
author: InkCat
tags: 
    - go单元测试
categories: 
    - 技术
    - go
date: '2022-05-23T15:18:54+08:00'
draft: true
# 支持在首页上隐藏某篇文章
hiddenFromHomePage: false
# lastmod:
---

## **本文主要梳理下go测试的方法、技巧，不注重代码**

### go测试中的命令讲解

```go
// 对当前目录含有_test.go进行测试，-v是打印测试信息，可不加-v
go test -v
// run参数支持正则写法。例：Test_directiroy_Search，下面是运行Search函数结尾的测试（-bench同样）
go test -run=Search$ -v
// 测试代码覆盖率（代码覆盖率是指代码满足所写测试用例的比例） 
go test -cover
// 指定测试模式
// 默认set（语句）：did each statement run?
// count（计数）：how many times did each statement run?
// 并行时使用atomic（并行计数）：like count, but counts precisely in parallel programs
go test -covermode=count

// 导出覆盖率数据（导出文件类型自定义）
go test -coverprofile cover.txt -covermode=count
// 根据cover.txt查看每个测试函数的覆盖率
go tool cover -func cover.txt
// HTML查看
go tool cover -html cover.txt
```

对于测试的学习就暂时到此为止吧。学无止境，适可而止方是学习之道，等到深入使用时再去学习，一味地深入学习反而没有意义，要是都用不到的话学来干什么，对于我而言，技术这玩意什么有用我就学什么。

## 参考链接
[官方介绍-testing](https://go.dev/blog/cover)  
[官方源码-testing](https://pkg.go.dev/testing?utm_source=godoc#pkg-functions)
