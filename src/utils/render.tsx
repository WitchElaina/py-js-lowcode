import { Schema } from '../types/schema';
import { components } from '../components';
import { ReactNode, useEffect } from 'react';

export const RenderDesigner = (props: {
  schema: Schema;
  setSchema: (schema: Schema) => void;
  createBlackNode?: (onDrop) => ReactNode;
}) => {
  const { schema, createBlackNode } = props;

  const Component = components[schema.componentNames].component;

  useEffect(() => {
    console.log('schema', schema);
  }, [JSON.stringify(schema)]);

  const onDrop = (item) => {
    console.log('组件内 onDrop', schema, item.component.defaultSchema);
    const newSchema = {
      ...schema,
      children: schema.children.push(item.component.defaultSchema),
    };
    props.setSchema(newSchema);
  };

  return (
    <Component {...schema.props}>
      {/* 非布局组件的children */}
      {schema.children === null && schema.props?.children}

      {/* 布局组件的children */}
      {Array.isArray(schema.children) &&
        schema.children.map((item, index) => (
          <RenderDesigner schema={item} createBlackNode={createBlackNode} />
        ))}

      {/* 布局组件 */}
      {schema.children !== null &&
        (createBlackNode ? createBlackNode(onDrop) : null)}
    </Component>
  );
};
