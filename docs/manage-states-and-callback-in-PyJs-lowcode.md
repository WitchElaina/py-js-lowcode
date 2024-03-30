# 在 PyJs-Lowcode 中管理状态变量和回调函数

PyJs-Lowcode 支持将 Python 函数作为回调，如何在前端管理内部状态变量和回调函数需要一定设计。这篇文档介绍 PyJs-Lowcode 中的做法。

## 状态变量

PyJs-Lowcode 中的状态变量是组件 `props` 的一部分，也就是说，原则上所有 `props` 都可以作为状态变量，即在程序运行时，所有 `props` 都可以被修改。但是暴露所有 `props` 作为状态变量会导致混乱，且对于一般用户，只需要修改部分 `props` 即可，因此需要对 `props` 进行标记，将用户可变的 `props` 作为状态变量。

简而言之，我们只需要标记出 **运行态** 下 **可写入（Write）** 的 `props` 即可。数据结构上，PyJs-Lowcode 使用一个 `states` 对象来存放这些 `props` 的键名称，TypeScript 类型定义如下

```typescript
// 将自定义组件的 props 与 React 原生 Ref 属性合并
type CombineProps<T> = T & React.RefAttributes<HTMLElement>;

export interface BaseComponent<ComponentType, PropsType> {
  // ...
  // 组件 state
  states: (keyof CombineProps<PropsType>)[];
}
```

以 `Input` 组件为例，其 `states` 为 `['value']`，表示用户可以配置 `value` 作为变量，其他属性不可修改。

## 回调函数

上一章我们了解到了 PyJs-Lowcode 中的 props 在运行态下的权限如下：

- 所有 `props` 都是可读的（Read）
- 被标记为 `states` 的可读写（Read & Write）

想要修改 states 中的值，必须通过回调函数。组件中定义了其支持的回调函数，类型如下

```typescript
// Component 类型中的定义
interface UserEventContent {
  // 展示给用户的事件说明标签
  label: string;
}

type UserEvent = Record<string, UserEventContent>;

interface BaseComponent<ComponentType, PropsType> {
  // ...
  // 用户事件
  userEvents: UserEvent;
}
```

在编辑态时，需要将配置信息保存到 Schema 中，Schema 中定义了具体的对应某事件做出什么操作，类型如下

```typescript
interface CallbackProps {
  // schema 中的 id
  id: string;
  // props 键名
  propName: string;
}

interface Callback {
  // Python 适配器中注册的函数名
  funcName: string;
  // 回调函数的参数，其中元素为 props 路径
  args: CallbackProps[];
  // 被回调函数的返回值更新的 states
  returnTo: CallbackProps;
}

// Schema 中的配置
interface Schema {
  // ...
  // 用户事件
  userEvents: Record<string, Callback[]>;
}
```
