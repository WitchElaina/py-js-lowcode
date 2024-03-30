export interface PythonCallback {
  // Python 适配器中注册的函数名
  funcName: string;
  // 函数参数
  args: string[];
  // 源代码
  sourceCode: string;
}
