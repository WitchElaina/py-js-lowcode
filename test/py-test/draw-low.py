from test import generates
from PythonAdapter import reg_func as reg, run

paths = []


@reg
def generate(prompt, seed):
    path = generates(prompt=prompt, seed=seed)
    paths.append(path[0].split(".")[1] + ".png")
    return paths


if __name__ == "__main__":
    run(file_server=True)
