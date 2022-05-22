---
title: 'Go测试Testing'
author: InkCat
tags:
    - go单元测试
categories:
    - 技术
    - go
date: '2022-05-21T23:31:18+08:00'
draft: false
# 支持在首页上隐藏某篇文章
hiddenFromHomePage: false
---

**本文着重讲解些关于 `Testing` 框架的理论**

## 1.测试规范

在 `go` 语言中编写一个测试用例，需要满足以下条件:

-   **文件必须是 `xxx_test.go` 命名**
-   **测试函数必须是 大写 `Test` 开头**
-   **函数只有一个参数：t \*testing.T**

## 2.关于 Testing 框架

前面简单讲了一下怎么编写测试用例，现在主要讲下 Testing 的用法。

-   **测试用例有几种形式？四种**

    ```go
    // 基本测试用例
    TestXxxx(t *testing.T)
    // 压力测试的测试用例
    BenchmarkXxxx(b *testing.B)
    // 测试控制台输出的例子
    Example_Xxx()
    // 测试 Main 函数
    TestMain(m *testing.M)
    ```

-   **关于 `T` 类型（单元测试）**
    ![GoLearnDay-2022-05-21-23-43-03](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-21-23-43-03.png)
-   **关于 `B` 类型（基准/压力测试）**
    ![GoLearnDay-2022-05-21-23-58-29](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-21-23-58-29.png)

-   **关于 `Example` 测试**
    ![GoLearnDay-2022-05-22-00-40-54](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-22-00-40-54.png)

## 3.测试用例写法

-   **单元测试**

    求和需要实现 `Sum` 函数，并对其编写测试用例。

    创建 sum.go 文件，代码如下：

    ```go
    package array
    func Sum(numbers int) int {
        sum := 0
        for i := 0; i <= numbers; i++ {
            sum += i
        }
        return sum
    }

    ```

    再创建 sum_test.go 文件，代码如下：

    ```
    package array

    import (
        "reflect"
        "testing"
    )

    func TestSum(t *testing.T) {
        t.Run("collection of any size", func(t *testing.T) {
            num := 10
            got := Sum(num)
            want := 55
            if got != want {
                t.Errorf("got %d want %d given, %v", got, want, num)
            }
        })
    }
    ```

    运行测试`go test -run ^TestSum$ -v`，结果显示 OK 说明测试用例通过
    ![GoLearnDay-2022-05-21-23-50-56](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-21-23-50-56.png)

-   **基准/压力测试**

    创建文件 repeat.go，代码如下：

    ```
    package repeat

    const repeatCount = 5

    func Repeat(character string) string {
        var repeated string
        for i := 0; i < repeatCount; i++ {
            repeated += character
        }
        return repeated
    }

    ```

    创建 repeat_test.go 文件，代码如下

    ```
    package repeat

    import "testing"

    func BenchmarkRepeat(b *testing.B) {
        for i := 0; i < b.N; i++ {
            Repeat("a")
        }
    }
    ```

    运行`go test -benchmem`，结果显示 ok 则测试通过。
    ![GoLearnDay-2022-05-22-00-10-26](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-22-00-10-26.png)
    以上结果说明运行一次这个函数需要 `248.5` 纳秒（电脑 CPU `r7 4800h`）。这挺不错的，为了测试它运行了 `4889391` 次。  
    _*注意：基准测试默认是顺序运行的。*_

-   **`Example` 测试（验证）**

    一个示例函数以 Example 开头，如果示例函数包含以 “Output:” 开头的行注释，在运行测试时，go 会将示例函数的输出和 “Output:” 注释中的值做比较。  
    如果示例函数没有上述输出注释，该示例函数只会被编译而不会被运行。

    创建 adder.go 文件，代码如下

    ```
    package adder

    // Add takes two integers and returns the sum of them
    func Add(x, y int) int {
        return x + y
    }
    ```

    创建 adder_test.go 文件，代码如下

    ```
    package adder

    import (
        "fmt"
        "testing"
    )

    const repeatCount = 5

    func ExampleAdd() {
        sum := Add(1, 5)
        fmt.Println(sum)
        // Output: 6
    }

    ```

    运行`go test -run ^ExampleAdd$ -v`，结果显示 OK 则测试通过
    ![GoLearnDay-2022-05-22-00-29-28](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/GoLearnDay-2022-05-22-00-29-28.png)

关于测试主函数 Main 暂时没用过，本文不做讲解，可查看参考链接学习。

## 参考链接

-   [地鼠文档-关于 Testing](https://www.topgoer.cn/docs/golangstandard/golangstandard-1cmkt2lv1lojf)
-   **[learn-go-with-tests](https://studygolang.gitbook.io/learn-go-with-tests/)**
