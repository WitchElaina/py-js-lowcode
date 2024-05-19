import os

folder_to_calc = ["add", "callback", "change", "del", "style"]


def calcSum(file):
    # 初始化总毫秒数
    total_ms = 0
    # 逐行读取日志文件
    for line in file:
        # 切分每行记录，获取毫秒数部分并转换为浮点数
        ms_str = line.split(" ")[-2]
        ms = float(ms_str)
        # 将毫秒数累加到总数中
        total_ms += ms

    # 输出总毫秒数
    print("Total milliseconds:", total_ms)
    return total_ms


def calcAvg(folder_name):
    # 初始化总毫秒数和日志文件数量
    total_ms = 0
    total_files = 0
    # 遍历指定文件夹下的所有文件
    for filename in os.listdir(folder_name):
        # 如果文件名以.log结尾
        if filename.endswith(".log"):
            # 计算总毫秒数
            total_files += 1
            with open(folder_name + "/" + filename, "r", encoding="utf-8") as file:
                total_ms += calcSum(file)

    # 计算平均毫秒数
    avg_ms = total_ms / total_files
    # 输出平均毫秒数
    print(folder_name, " Average milliseconds:", avg_ms)


if __name__ == "__main__":
    for folder in folder_to_calc:
        calcAvg("log/lowcode/" + folder)
