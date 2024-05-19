from PythonAdapter import reg_func as reg, run
import generate

paths = []


@reg
def generate(prompt, seed):
    path, meta = generates(prompt=prompt, seed=seed)
    paths.append(path[0].split(".")[1] + ".png")
    return paths


if __name__ == "__main__":
    run(file_server=True)
