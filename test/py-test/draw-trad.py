from gradio import gr
from test import DESCRIPTION, generates, quality_prompt, styles, config, utils, IS_COLAB

with gr.Blocks(css="style.css") as demo:
    title = gr.HTML(
        f"""<h1><span>{DESCRIPTION}</span></h1>""", elem_id="title", render=False
    )
    gr.Markdown(
        f"""Gradio demo for [cagliostrolab/animagine-xl-3.0](https://huggingface.co/cagliostrolab/animagine-xl-3.0)""",
        elem_id="subtitle",
        render=False,
    )
    gr.DuplicateButton(
        value="Duplicate Space for private use",
        elem_id="duplicate-button",
        visible=os.getenv("SHOW_DUPLICATE_BUTTON") == "1",
        render=False,
    )
    with gr.Row():
        with gr.Column():
            with gr.Row():
                prompt = gr.Text(
                    label="Prompt",
                    show_label=False,
                    max_lines=5,
                    placeholder="Enter your prompt",
                    container=False,
                )
                run_button = gr.Button("Generate", variant="primary", scale=0)
            result = gr.Gallery(
                label="Result",
                columns=1,
                height="512px",
                preview=True,
                show_label=False,
            )
        with gr.Column():
            with gr.Accordion(label="Advanced Settings", open=False):
                negative_prompt = gr.Text(
                    label="Negative Prompt",
                    max_lines=5,
                    placeholder="Enter a negative prompt",
                )
                with gr.Row():
                    add_quality_tags = gr.Checkbox(label="Add Quality Tags", value=True)
                    quality_selector = gr.Dropdown(
                        label="Quality Tags Presets",
                        interactive=True,
                        choices=list(quality_prompt.keys()),
                        value="Standard",
                    )
                style_selector = gr.Radio(
                    label="Style Preset",
                    container=True,
                    interactive=True,
                    choices=list(styles.keys()),
                    value="(None)",
                )
                aspect_ratio_selector = gr.Radio(
                    label="Aspect Ratio",
                    choices=config.aspect_ratios,
                    value="896 x 1152",
                    container=True,
                )
                with gr.Group(visible=False) as custom_resolution:
                    with gr.Row():
                        custom_width = gr.Slider(
                            label="Width",
                            minimum=MIN_IMAGE_SIZE,
                            maximum=MAX_IMAGE_SIZE,
                            step=8,
                            value=1024,
                        )
                        custom_height = gr.Slider(
                            label="Height",
                            minimum=MIN_IMAGE_SIZE,
                            maximum=MAX_IMAGE_SIZE,
                            step=8,
                            value=1024,
                        )
                use_upscaler = gr.Checkbox(label="Use Upscaler", value=False)
                with gr.Row() as upscaler_row:
                    upscaler_strength = gr.Slider(
                        label="Strength",
                        minimum=0,
                        maximum=1,
                        step=0.05,
                        value=0.55,
                        visible=False,
                    )
                    upscale_by = gr.Slider(
                        label="Upscale by",
                        minimum=1,
                        maximum=1.5,
                        step=0.1,
                        value=1.5,
                        visible=False,
                    )

                sampler = gr.Dropdown(
                    label="Sampler",
                    choices=config.sampler_list,
                    interactive=True,
                    value="Euler a",
                )
                with gr.Row():
                    seed = gr.Slider(
                        label="Seed", minimum=0, maximum=utils.MAX_SEED, step=1, value=0
                    )
                    randomize_seed = gr.Checkbox(label="Randomize seed", value=True)
                with gr.Group():
                    with gr.Row():
                        guidance_scale = gr.Slider(
                            label="Guidance scale",
                            minimum=1,
                            maximum=12,
                            step=0.1,
                            value=7.0,
                        )
                        num_inference_steps = gr.Slider(
                            label="Number of inference steps",
                            minimum=1,
                            maximum=50,
                            step=1,
                            value=28,
                        )
            with gr.Accordion(label="Generation Parameters", open=False, render=False):
                gr_metadata = gr.JSON(label="Metadata", show_label=False)
    use_upscaler.change(
        fn=lambda x: [gr.update(visible=x), gr.update(visible=x)],
        inputs=use_upscaler,
        outputs=[upscaler_strength, upscale_by],
        queue=False,
        api_name=False,
    )
    aspect_ratio_selector.change(
        fn=lambda x: gr.update(visible=x == "Custom"),
        inputs=aspect_ratio_selector,
        outputs=custom_resolution,
        queue=False,
        api_name=False,
    )
    gr.on(
        triggers=[
            prompt.submit,
            negative_prompt.submit,
            run_button.click,
        ],
        fn=utils.randomize_seed_fn,
        inputs=[seed, randomize_seed],
        outputs=seed,
        queue=False,
        api_name=False,
    ).then(
        fn=generates,
        inputs=[
            prompt,
            negative_prompt,
            seed,
            custom_width,
            custom_height,
            guidance_scale,
            num_inference_steps,
            sampler,
            aspect_ratio_selector,
            style_selector,
            quality_selector,
            use_upscaler,
            upscaler_strength,
            upscale_by,
            add_quality_tags,
        ],
        outputs=[result, gr_metadata],
        api_name="run",
    )

demo.queue(max_size=20).launch(debug=IS_COLAB, share=IS_COLAB)
