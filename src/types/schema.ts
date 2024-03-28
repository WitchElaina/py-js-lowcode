import { components } from '../components';
import { BaseComponent } from './component';

/**
 * 低代码工程文件类型
 * @description 用于描述一个低代码工程文件的结构
 */
export interface Schema {
  // 组件id
  id?: string;
  // 组件名称
  componentNames: keyof typeof components;
  // 组件属性
  props: (typeof components)[keyof typeof components]['props'];
  // 组件标题
  title: string;
  // 组件状态变量
  states: Record<string, any>;
  // voidElementTag 是否是无子元素的标签
  voidElementTag?: boolean;
  // 子组件schema
  children: Schema[] | null;
}
