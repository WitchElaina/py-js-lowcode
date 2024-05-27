from test import ask_ai, clear
import gradio as gr

text = ""
res = ""
temperture_val = 0.7
top_p_val = 0.9

models = [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-davinci",
    "gpt-4.0-turbo",
]

history = []


def ask_ai_text(text):
    global temperture_val, top_p_val, res
    response = ask_ai(text, temperture_val, top_p_val)
    ret = ""
    for i in response:
        ret += i["role"] + ":\n" + i["content"] + "\n\n"
    res = ret
    return res


def clear_chat():
    global text, res
    text = ""
    res = ""
    clear()
    return res


def save_chat(name):
    global text, res, history
    history.append({"name": name, "res": res})
    print(history)
    return history


def get_chat_name_list():
    global history
    chat_name_list = []
    for i in history:
        chat_name_list.append(i["name"])
    print("list", chat_name_list)
    return chat_name_list


def get_history_chat(name):
    global text, res
    for i in history:
        if i["name"] == name:
            text = i["text"]
            res = i["res"]
            return "", res
    return "", ""


with gr.Blocks() as demo:
    gr.Markdown("# 多会话文字生成式AI Demo")
    gr.Markdown("### 消息记录")
    output = gr.TextArea(
        value=res,
        label="Output",
    )
    gr.Markdown("### 输入区域")
    with gr.Blocks() as inputs:
        with gr.Row():
            with gr.Column(scale=5):
                input = gr.TextArea(
                    value=text,
                    label="Input Text",
                    elem_id="input-area",
                )
            with gr.Column(scale=1):
                run = gr.Button(
                    value="发送",
                    render=True,
                    elem_id="button-send",
                    elem_classes="trad-btn trad-btn-primary trad-btn-lg",
                )
                run.click(
                    ask_ai_text,
                    inputs=[input],
                    outputs=output,
                )
                clear_button = gr.Button(
                    value="清空历史记录",
                    render=True,
                    elem_id="button-clear",
                    elem_classes="trad-btn trad-btn-danger trad-btn-lg",
                )
                clear_button.click(
                    clear_chat,
                    inputs=[],
                    outputs=output,
                )
                regenerate = gr.Button(
                    value="确认参数",
                    render=True,
                    elem_id="button-regenerate",
                    elem_classes="trad-btn trad-btn-default trad-btn-lg",
                )
                regenerate.click(
                    ask_ai_text,
                    inputs=[input],
                    outputs=output,
                )
    with gr.Row():
        with gr.Column():
            gr.Markdown("### 调整参数")
            with gr.Blocks():
                temperture = gr.Slider(
                    elem_id="temperture",
                    value=temperture_val,
                    label="Temperature",
                    minimum=0.1,
                    maximum=1.0,
                    step=0.1,
                    interactive=True,
                    render=True,
                    elem_classes="trad-slider",
                )
                top_p = gr.Slider(
                    elem_id="top_p",
                    value=top_p_val,
                    label="Top P",
                    minimum=0.1,
                    maximum=1.0,
                    step=0.1,
                    interactive=True,
                    elem_classes="trad-slider",
                )
            gr.Markdown("### 模型选择")
            model = gr.Dropdown(
                label="Model",
                value="gpt-3.5-turbo",
                choices=models,
                interactive=True,
                render=True,
                elem_classes="trad-select",
            )
        with gr.Column():
            gr.Markdown("### 对话历史")
            with gr.Blocks():
                history_com = gr.Radio(
                    choices=history,
                    label="History",
                    interactive=True,
                    render=True,
                )
                load = gr.Button(value="加载历史会话")
                with gr.Row():
                    with gr.Column(
                        scale=5,
                        render=True,
                    ):
                        name = gr.Text(
                            value="",
                            label="会话名称",
                        )
                    with gr.Column(scale=1):

                        def refresh_choice(name):
                            save_chat(name)
                            new_choices = get_chat_name_list()
                            return gr.update(choices=new_choices)

                        save = gr.Button(
                            value="保存当前会话",
                            render=True,
                        )
                        save.click(
                            refresh_choice,
                            inputs=[name],
                            outputs=history_com,
                        )


if __name__ == "__main__":
    demo.launch()
