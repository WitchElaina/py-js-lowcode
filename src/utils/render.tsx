import { Schema } from '../types/schema';
import { components } from '../components';
import { ReactNode, useEffect } from 'react';

export const RenderDesigner = (props: {
  schema: Schema;
  appendSchema: (schema: Schema, id: string) => void;
  createBlackNode?: (onDrop) => ReactNode;
}) => {
  const { schema, createBlackNode, appendSchema } = props;

  const Component = components[schema.componentNames].component;

  const onDrop = (item) => {
    console.log('组件内 onDrop', schema, item.component.defaultSchema);
    appendSchema(item.component.defaultSchema, schema.id);
  };

  return (
    <Component {...schema.props} key={schema.id}>
      {/* 非布局组件的children */}
      {schema.children === null && schema.props?.children}

      {/* 布局组件的children */}
      {Array.isArray(schema.children) &&
        schema.children.map((item, index) => (
          <RenderDesigner
            schema={item}
            createBlackNode={createBlackNode}
            appendSchema={appendSchema}
          />
        ))}

      {/* 布局组件 */}
      {schema.children !== null &&
        (createBlackNode ? createBlackNode(onDrop) : null)}
    </Component>
  );
};
