import { ReactNode } from 'react';
import { Schema } from './schema';
export interface BaseVariable<T> {
  name: keyof T;
  label: string;
  value?: T[keyof T];
}

export interface BaseCallback {
  name: string;
  label: string;
}

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
  props?: PropsType & React.RefAttributes<HTMLElement>;
  // 用户可配置组件属性
  variables: BaseVariable<PropsType & React.RefAttributes<HTMLElement>>[];
  // 配置面板组件
  configPanel?: React.FC<{ schema: Schema }>;
  // 默认的 schema
  defaultSchema: Schema;
}
