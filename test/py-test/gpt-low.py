from PythonAdapter import reg_func as reg, run
from test import ask_ai, clear, save, load

if __name__ == "__main__":
    reg(ask_ai)
    reg(clear)
    reg(save)
    reg(load)
    run(file_server=True)
