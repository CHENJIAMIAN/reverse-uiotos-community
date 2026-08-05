[English](./README.en.md)

# UIOTOS Community 逆向研究

<!-- codex-github-rules:bilingual-summary -->
> **中文简介**：UIOTOS 社区版零代码前端的逆向研究

> **English summary**: Reverse engineering research for the UIOTOS Community no-code frontend

---

本仓库记录 UIOTOS Community 前端零代码平台的逆向研究与可运行快照。UIOTOS 强调页面嵌套、逻辑连线和可视化搭建，适合不熟悉传统前端框架或开发环境的使用者构建 IoT、后台管理、SCADA、HMI 等 GUI 应用。

## 版本

- v1.0.301143：初始版本。

## UIOTOS 是什么

UIOTOS 是一个可页面嵌套的前端零代码工具。常见应用不需要编写代码或搭建开发环境，也不要求了解 JavaScript、C# 或 Qt 等前端开发语言。

### 设计动机

- 低代码仍要求基础开发知识和少量编码，门槛对后端、算法、硬件、电气、产品或设计背景的用户并不低。
- 传统平台依赖内置组件，功能扩展常需要升级组件；UIOTOS 可通过页面嵌套组合已有组件。
- Vue、amis、Qt 等通常用代码或 JSON 配置描述复杂界面；UIOTOS 的嵌套与连线更直接，强调所见即所得。

### 主要特点

- 容器可无限层级嵌套，无需 JSON 配置或代码。
- 可通过连线和解析字符串处理复杂 JSON 数据。
- 可将 jQuery Markdown、Element UI、amis 等既有 Web 资源封装成组件，再用于嵌套和连线。
- 配置可导出为 JSON，供其他框架使用。

### 适用范围

适合企业后台、IoT 应用、SCADA、大屏配置和工业 HMI。3D 数字孪生、移动端小程序、后端业务逻辑和专用文档工具并非主要目标，但可通过二次开发扩展。

## 社区版

社区版开放页面嵌套、属性继承和逻辑连线的核心实现，方便学习和参考。

- 上游开源仓库：[uiotos/uiotos-community](https://github.com/uiotos/uiotos-community)
- 上游许可证：Apache 2.0
- 核心代码：kernel/baseControls.js、kernel/iotosEngines.js、kernel/iotosCommon.js
- 技术栈：原生 JavaScript 和 ht.js 图形库

嵌套支持无限垂直层级、每层多个并存容器、组合式多页面嵌套、属性继承与覆盖，以及属性变化逐层向上冒泡重新执行逻辑。

## 快速开始

1. 在 Linux 或 Windows 安装最新版 [Node.js](https://url.nodejs.cn/download/)。
2. 克隆上游仓库：

~~~text
git clone https://github.com/uiotos/uiotos-community.git
~~~

3. 在 uiotos-community 目录启动服务：

~~~text
node .\uiotos\server\server.js
~~~

Windows 上可以双击 run.bat。通过 .\uiotos\server\config.ini 修改端口。

4. 服务启动后，在浏览器访问：

~~~text
http://localhost:8999
~~~

建议使用 Google Chrome。

## 使用与资料

- 示例地址：[203.189.6.3:8999](http://203.189.6.3:8999/) / [203.189.6.3:18999](http://203.189.6.3:18999/)
- [UIOTOS 用户手册](https://www.yuque.com/liuhuo-nc809/uiotos)

完整英文介绍、参考图片和上游说明见 [README.en.md](./README.en.md)。
