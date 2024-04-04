import { components } from '../components';

export interface CallbackProps {
  // schema 中的 id
  id: string;
  // props 键名
  propName: string;
}

export interface Callback {
  // Python 适配器中注册的函数名
  funcName: string;
  // 回调函数的参数，其中元素为 props 路径
  args: CallbackProps[];
  // 被回调函数的返回值更新的 states
  returnTo: CallbackProps;
}

/**
 * 低代码工程文件类型
 * @description 用于描述一个低代码工程文件的结构
 */
export interface Schema {
  // 组件 id
  id?: string;
  // 组件名称
  componentNames: keyof typeof components;
  // 组件属性
  props: (typeof components)[keyof typeof components]['props'] & {
    children?: unknown;
  };
  // 组件标题
  title: string;
  // voidElementTag 是否是无子元素的标签
  voidElementTag?: boolean;
  // 子组件 schema
  children: Schema[] | null;
  // 用户事件
  userEvents?: Record<string, Callback[]>;
}
