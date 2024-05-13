from PythonAdapter import reg_func as reg, run


@reg
def add(a, b):
    return a + b


@reg
def sub(a, b):
    return a - b


mock_content = [{"role": "Assistant", "content": "你好"}]


@reg
def mock_ask_ai(msg):
    mock_content.append({"role": "User", "content": msg})
    mock_content.append(
        {
            "role": "Assistant",
            "content": "I am a mock AI, I can't answer your question.",
        }
    )
    return mock_content


if __name__ == "__main__":
    run(file_server=True)
