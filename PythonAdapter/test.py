import python_adapter as py_adapter


# Test Functions


def add(a, b):
    return a + b


def sub(a, b):
    return a - b


def addWithDefault(a, b=1):
    return a + b


if __name__ == "__main__":
    py_adapter.reg_func(add)
    py_adapter.reg_func(sub)
    py_adapter.reg_func(addWithDefault)
    py_adapter.run()

    print(py_adapter.exec_func("add", 1, 2))
    print(py_adapter.exec_func("sub", 1, 2))
    print(py_adapter.exec_func("addWithDefault", 1))
    print(py_adapter.exec_func("addWithDefault", 1, 2100))

    try:
        py_adapter.exec_func("not_exist_func")
    except Exception as e:
        print(e)
