import func_manager as fm
from logger import create_logger

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


def run():
    logger.info("Python Adapter Start")

    # 从function manager中获取所有函数
    func_dict = function_manager.get_all()
