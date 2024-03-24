from python_adapter import reg_func as reg, run


@reg
def add(a, b):
    return a + b


@reg
def sub(a, b):
    return a - b


@reg
def addWithDefault(a, b=1):
    return a + b


@reg
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)


@reg
def quick_sort(arr: list[int]):
    # typecheck
    if not isinstance(arr, list):
        raise TypeError(f"quick_sort only accepts list, got {type(arr)}")

    for x in arr:
        if not isinstance(x, int):
            raise TypeError(f"quick_sort only accepts list of int, got {type(x)}")

    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]

        less_than_pivot = [x for x in arr[1:] if x <= pivot]
        greater_than_pivot = [x for x in arr[1:] if x > pivot]

        return quick_sort(less_than_pivot) + [pivot] + quick_sort(greater_than_pivot)


if __name__ == "__main__":
    run(file_server=True)
