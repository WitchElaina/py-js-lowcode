from PythonAdapter import reg_func as reg, run


@reg
def add(a, b):
    return a + b


@reg
def sub(a, b):
    return a - b


if __name__ == "__main__":
    run(file_server=True)
