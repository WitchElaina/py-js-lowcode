from test.codes.test import ask_ai
import gradio as gr


def ask_ai_text(text):
    response = ask_ai(text)
    ret = ""
    for i in response:
        ret += i["role"] + ":\n" + i["content"] + "\n\n"
    return ret


with gr.Interface() as demo:
    demo.add_textbox("text", label="Input Text")
    demo.add_textbox(ask_ai_text, label="Output Text")

demo.launch()
