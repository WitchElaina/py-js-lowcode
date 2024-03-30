import { ReactNode } from 'react';
import { Schema } from './schema';
export interface BaseVariable<T> {
  name: keyof T;
  label: string;
  value?: T[keyof T];
}

// state 值类型
export interface BaseState<T> {
  // 在全局 state 管理器中的 id，未注册则为 null
  globalId: string | null;
  // config panel 中展示给用户的 label
  label: string;
  // 默认值，初始化时使用
  defaultValue: T[keyof T];
}

export interface BaseCallback {
  name: string;
  label: string;
}

// 将自定义组件的 props 与 React 原生 Ref 属性合并
export type CombineProps<T> = T & React.RefAttributes<HTMLElement>;

/**
 * BaseComponent interface.
 * 定义一个基础的组件类型
 */
export interface BaseComponent<ComponentType, PropsType> {
  // 组件名称，用于唯一标识一个组件
  name: string;
  // 组件标签，i18n 展示
  label: string;
  // 组件实际的 React 组件
  component: ComponentType;
  // 组件的示例，用于组件库中展示缩略图
  example: ReactNode;
  // 组件属性，即 react 组件的 props
  props?: CombineProps<PropsType>;
  // 用户可配置组件属性
  variables: CombineProps<BaseVariable<PropsType>>[];
  // 配置面板组件
  configPanel?: React.FC<{ schema: Schema }>;
  // 默认的 schema
  defaultSchema: Schema;
  // 组件 state
  states?: Record<
    keyof CombineProps<PropsType>,
    BaseState<CombineProps<PropsType>>
  >;
}
