import { ReactNode } from 'react';
import { Schema } from '../utils/useSchema';

export interface BaseVariable {
  name: string;
  label: string;
}

export interface BaseCallback {
  name: string;
  label: string;
}

/**
 * BaseComponent interface.
 * 定义一个基础的组件类型
 */
export interface BaseComponent<T> {
  name: string;
  label: string;
  component: T;
  example: ReactNode;
  variables?: Record<string, BaseVariable>;
  defaultSchema: Schema;
}
