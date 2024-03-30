import { components } from '../components';

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
}
