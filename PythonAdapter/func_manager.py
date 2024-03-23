"""
Function Manager
- 用于管理用户注册的函数
"""

import inspect


class FunctionManager:
    def __init__(self):
        self.func_dict = {}

    def register(self, func):
        if func.__name__ in self.func_dict:
            raise Exception(f"Function {func.__name__} has been registered.")
        self.func_dict[func.__name__] = func

    def get(self, name):
        if name not in self.func_dict:
            raise Exception(f"Function {name} not found.")
        return self.func_dict[name]

    def get_all(self):
        return self.func_dict

    def get_name_list(self):
        return list(self.func_dict.keys())

    def get_func_detail_list(self):
        return [
            {
                "name": name,
                "args": get_func_args(func),
                "code": get_func_code(func),
            }
            for name, func in self.func_dict.items()
        ]

    def clear(self):
        self.func_dict.clear()


def get_func_name(func):
    return func.__name__


def get_func_args(func):
    return inspect.getfullargspec(func).args


def get_func_code(func):
    return inspect.getsource(func)
