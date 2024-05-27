from PythonAdapter import reg_func as reg, run
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    # 输入转发API Key，注意转发地址需要加/v1
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
)

messages = []
history = []


@reg
def ask_ai(msg, temperture, top_p):
    ret = []
    messages.append({"role": "user", "content": msg})
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=temperture,
        top_p=top_p,
        stream=False,
    )

    # 非流式输出获取结果
    print(completion.choices[0].message.content)
    messages.append(
        {"role": "assistant", "content": completion.choices[0].message.content}
    )

    for msg in messages:
        if msg["role"] == "user":
            ret.append({"role": "User", "content": msg["content"]})
        elif msg["role"] == "assistant":
            ret.append({"role": "Assistant", "content": msg["content"]})

    return ret


@reg
def clear():
    global messages
    messages = []
    return []


@reg
def save(name):
    global history, messages
    history.append({"name": name, "msgs": messages})
    ret = []
    for h in history:
        ret.append({"label": h["name"], "value": h["name"]})
    print(ret)
    return ret


@reg
def load(name):
    global messages
    for h in history:
        if h["name"] == name:
            messages = h["msgs"]
            return messages


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


mock_pics = [
    "https://www.loliapi.com/acg/pc/",
]


@reg
def mock_gen_pic():
    mock_pics.append("https://www.loliapi.com/acg/pc/")
    return mock_pics


if __name__ == "__main__":
    run(file_server=True)
