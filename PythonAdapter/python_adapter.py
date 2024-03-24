import os

import func_manager as fm
from logger import create_logger

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

# dotenv
from dotenv import load_dotenv

app = Flask(__name__)

# funtion manager实例
function_manager = fm.FunctionManager()

# logger实例
logger = create_logger("PyAdpt")


def reg_func(func):
    try:
        function_manager.register(func)
    except Exception as e:
        logger.error(f"Failed to register {func.__name__}: {e}")
    else:
        logger.info(f"{func.__name__} registered successfully.")
    return func


def exec_func(func_name, *args):
    try:
        func = function_manager.get(func_name)
    except Exception as e:
        logger.error(f"Failed to get {func_name}: {e}")
        raise e

    try:
        logger.info(f"Executing {func_name} with args: {args}")
        func(*args)
    except Exception as e:
        logger.error(f"Failed to execute {func_name}: {e}")
        raise e
    else:
        logger.info(f"{func_name} executed successfully.")

    return func(*args)


# Flask request handler
@app.get("/")
def rootPage():
    return "Hello World!"


@app.get("/list")
def list_all_functions():
    return jsonify(function_manager.get_func_detail_list())


@app.get("/list/name")
def list_all_function_names():
    return jsonify(function_manager.get_name_list())


@app.post("/exec")
def exec_function():
    data = request.get_json()
    func_name = data["name"]
    args = data["args"]
    try:
        result = exec_func(func_name, *args)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    else:
        return jsonify(result)


# 其他路由时，返回.目录下对应的文件
# 默认关闭此路由，业务需要时打开
# @app.route("/<path:filename>")
def get_file(filename):
    return send_file(filename)


def run(file_server=False):
    logger.info("Python Adapter Start")

    if file_server:
        logger.warning("File server is open, be careful with security.")
        app.get("/<path:filename>")(get_file)

    # CORS config
    CORS(app)

    # env config
    logger.info("Loading .env")
    load_dotenv()
    logger.info("Loading .env done")

    # start flask server
    logger.info("Flask Server Start")
    app.run(
        host=os.getenv("PY_ADAPTER_HOST" or "127.0.0.1"),
        port=os.getenv("PY_ADAPTER_PORT" or 6001),
    )
