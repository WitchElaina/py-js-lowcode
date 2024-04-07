# Python-JavaScript Lowcode Platform

个人毕设项目，支持 Python 作为直接回调的低代码平台。

![Python-JavaScript Lowcode Platform](/docs/img/preview.png)

## 运行

### 环境要求

- Node.js
  - 开发使用的稳定版本为 `v20.10.0`
  - 使用 `yarn v1.22.21` 作为包管理器
- Python
  - 开发使用的稳定版本为 `Python 3.9.6 [Clang 15.0.0 (clang-1500.1.0.2.5)] on darwin`

### 准备工作

拉取代码

```bash
git clone https://github.com/WitchElaina/py-js-lowcode.git
```

安装依赖

```bash
cd py-js-lowcode
yarn
```

安装 Python 依赖

```bash
# (推荐/可选) 创建虚拟环境
cd PythonAdapter
python -m venv .venv

# 激活虚拟环境
# Windows PowerShell
.venv\Scripts\Activate.ps1

# MacOS/Linux
. .venv/bin/activate
```

```bash
# 安装依赖
pip install -r requirements.txt
```

配置环境变量，将项目根目录 `.env.example` 文件复制一份为 `.env` ，并修改其中的配置。

### 启动项目

```bash
# 启动
yarn dev

# 启动 Python 适配器
# 有自己的需求，自行修改 test.py 文件，后续考虑上传到 PyPI 作为包导入
python PythonAdapter/test.py
```
