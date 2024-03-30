# 在 PyJs Lowcode 中管理状态变量和回调函数

PyJs Lowcode 支持将 Python 函数作为回调，如何在前端管理内部状态变量和回调函数需要一定设计。这篇文档介绍 `py-js-lowcode` 中的做法。

## 状态变量

在 PyJs Lowcode 中，一个组件可使用的状态变量是由组件的 `states` 属性定义的。`states` 属性是一个对象，对象的键是状态变量的名称，值是状态变量的初始值。其 TypeScript 类型定义如下

```typescript
// 将自定义组件的 props 与 React 原生 Ref 属性合并
type CombineProps<T> = T & React.RefAttributes<HTMLElement>;

// state 值类型
export interface BaseState<T> {
  // 在全局 state 管理器中的 id，未注册则为 null
  globalId: string | null;
  // config panel 中展示给用户的 label
  label: string;
  // 默认值，初始化时使用
  defaultValue: T[keyof T];
}

export interface BaseComponent<ComponentType, PropsType> {
  // ...
  // 组件 state
  states?: Record<
    keyof CombineProps<PropsType>,
    BaseState<CombineProps<PropsType>>
  >;
}
```

可以注意到，states 中的键是组件的 props 的键，这样可以很方便地在组件中使用状态变量，即 state 直接绑定到组件中相同名称的 props 上。

假设有一个开关组件 `Switch`，其 props 中有一个 `checked` 属性表示开关值。那么他的 states 对象如下

```typescript
const switchStates = {
  states: {
    checked: {
      globalId: null,
      label: '开关值',
      defaultValue: false,
    },
  },
};
```
