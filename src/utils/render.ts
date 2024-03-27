import { ReactElement, createElement } from 'react';
import { Schema } from '../types/schema';
import { components } from '../components';

export const render = (schema: Schema, blankNodeComponent): ReactElement => {
  const createSchemaElement = (schema: Schema): ReactElement => {
    const { componentNames, props, children } = schema;
    const Component = components[componentNames].component;

    // 对于一般的组件
    if (!Array.isArray(children)) {
      return createElement(Component, props, props.children);
    } else {
      return createElement(
        Component,
        props,
        children.map((child) => createSchemaElement(child)),
      );
    }
  };

  return createSchemaElement(schema);
};
