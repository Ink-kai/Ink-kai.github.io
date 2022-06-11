---
title: '记-centos文件系统损坏导致部分服务无法使用'
author: InkCat
tags: 
    -   centos7
    -   xfs_repair
categories: 
    -   linux
date: '2022-06-11T11:49:46+08:00'
draft: false
# 支持在首页上隐藏某篇文章
hiddenFromHomePage: false
# lastmod:
---

## 序
不得不处理了，再也不能通过重装解决这个问题了。
本地虚拟机安装的centos7系统出现故障了，修复的时候忘记录了，只能通过文字描述。本文图片不实，但是问题都是一样的

## 找到问题所在

登录centos系统后，提示以下错误
![centosSystemBug-2022-06-11-11-54-06](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-11-54-06.png)
**解释一下这段什么意思？**
> 第二行是说：xfs(dm-0)检测到元数据损坏。
> 生成的错误日志保存在“/run/in itramfs/rdsosreport.txt”

dm-0是centos系统中挂载的文件系统，可以通过`ls -l /dev/mapper`查看，`dm-0`是从/dev挂的一个软连接
![centosSystemBug-2022-06-11-12-02-22](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-02-22.png)

OK，找到问题所在。**文件系统`dm-0`元数据损坏**

## 解决问题
需要准备centos镜像文件，开机时进入到紧急救援模式。**一定要准备centos镜像iso**
![centosSystemBug-2022-06-11-12-08-17](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-08-17.png)
![centosSystemBug-2022-06-11-12-06-15](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-06-15.png)
按`c`进入命令模式，输入`exit`
![centosSystemBug-2022-06-11-12-09-34](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-09-34.png)
选择`troubleshooting`（解决故障）
![centosSystemBug-2022-06-11-12-10-06](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-10-06.png)
选择`rescue a centos system`（救援模式）
![centosSystemBug-2022-06-11-12-11-30](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-11-30.png)
选择`3`（进入shell）
> 大致翻译下：救援模式试图找到你的linux系统并挂载的以下目录：/mnt/sysimage。你可以对其进行更改你的系统
> 选择步骤`1`，继续执行此步骤。
> 选择步骤`2`，可以让你的文件系统保持只读状态
> 选择步骤`3`，进入内核（shell）
> 选择步骤`4`，重启
![centosSystemBug-2022-06-11-12-12-47](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-12-47.png)

**查看需要修复的文件系统`ls -l /dev/mapper`**
xfs_repair是对xfs系统进行修复的一个命令
![centosSystemBug-2022-06-11-12-28-31](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-28-31.png)
+ -d    紧急修复（针对文件系统，我也不是很清楚，但是文件系统只能使用该选项进行处理，否则无法修复file system）
+ -L    强制清空日志。生产环境勿用（请备份文件）

**先卸载文件系统`umount /dev/dm-0 -v`**
![centosSystemBug-2022-06-11-12-39-44](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-39-44.png)

**使用xfs_repair修复`xfs_repair -d /dev/dm-0`（这里必须使用到-d）**

![centosSystemBug-2022-06-11-12-27-18](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-27-18.png)
![centosSystemBug-2022-06-11-12-40-14](https://raw.githubusercontent.com/Ink-kai/PicGo/main/BlogImages/centosSystemBug-2022-06-11-12-40-14.png)

虽然最后还是提示：**`找不到有效的次要数据块。注意，secondary只是代表次要，metadata主要元数据已经修复`**

在我看来，次要数据块应该是用户数据和服务日志丢失

重启centos再进入系统就好了！！！