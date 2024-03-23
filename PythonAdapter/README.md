# Python Adapter

低代码平台的 Python 适配器。支持将 Python 函数注册给 python_adapter, 在任何外部系统上，通过 Http 请求调用这些函数。

## Quick Start

假设我们有一个 Python 函数 `add` 实现了两个数相加的功能（实际场景中，尤其是业务代码中，这些函数会更加复杂，且是业务逻辑的核心）：

```python
def add(a, b):
    return a + b
```

将其试想成复杂的业务代码，业务代码开发完成后，需要套 UI 上线，或作为微服务模块等，此时不可避免需要书写 API 接口，以供外部系统调用。使用 Python Adapter，我们可以不用书写这些重复代码，直接 API 化我们的业务代码。

```python
from python_adapter import reg_func, run

@reg_func
def add(a, b):
    return a + b

run()
```

随后直接运行我们的代码即可。

```shell
# 外部访问示例
curl --location 'localhost:6001/exec' \
--header 'Content-Type: application/json' \
--data '{
    "name": "add",
    "args": [6,7]
}'

# 输出
13
```

## Usage

> `PythonAdapter/test.py` 中包含了一个典型的示例

### 注册

两种注册方式，函数调用注册和装饰器注册（推荐）。

#### 装饰器注册

```python
from python_adapter import reg_func

# 注册（装饰器方式）
@reg_func
def add(a, b): # 编写好的业务代码
    return a + b
```

#### 函数调用注册

```python
from python_adapter import reg_func

# 编写好的业务代码
def add(a, b):
    return a + b

# 注册（函数调用方式）
reg_func(add)
```

### 启动

`run` 函数会启动一个 Http 服务，监听指定端口，等待外部系统的调用。在注册完所有函数后，调用 `run` 函数即可。

```python
from python_adapter import run

run()
```

#### 自定义 host 和 port

PythonAdapter 会优先读取环境变量 `PYTHON_ADAPTER_HOST` 和 `PYTHON_ADAPTER_PORT`，作为 host 和 port。如果没有设置，会使用默认值 `127.0.0.1` 和 `6001`。
