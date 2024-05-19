from test.codes.test import ask_ai
import gradio as gr


def a(arg):
    return arg


def b(arg):
    return arg


def c(arg):
    return arg


def ask_ai_text(text):
    response = ask_ai(text)
    ret = ""
    for i in response:
        ret += i["role"] + ":\n" + i["content"] + "\n\n"
    return ret


demo = gr.Interface(
    fn=a,
    inputs=[
        "number",
        "text",
        "text",
        "text",
    ],
    outputs=["text"],
)
demo.launch()
