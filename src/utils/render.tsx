import { Schema } from '../types/schema';
import { components } from '../components';
import { ReactNode, useRef, useState } from 'react';
import { useHover } from 'ahooks';
import { Typography, theme } from 'antd';

const { Text } = Typography;
const { useToken } = theme;

export const RenderDesigner = (props: {
  schema: Schema;
  appendSchema: (props: { schema: Schema; id: string }) => void;
  onClickCallback?: (schema: Schema) => void;
  createBlackNode?: (onDrop) => ReactNode;
  setParentHover?: (props: boolean) => void;
}) => {
  const { schema, createBlackNode, appendSchema, onClickCallback } = props;

  const Component = components[schema.componentNames].component;

  const { token } = useToken();

  const onDrop = (item) => {
    console.log('组件内 onDrop', schema, item.component.defaultSchema);
    appendSchema({
      schemaToAppend: item.component.defaultSchema,
      parentId: schema.id,
    });
  };

  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClickCallback && onClickCallback(schema);
        console.log('点击了组件', schema);
      }}
      onMouseEnter={() => {
        props.setParentHover && props.setParentHover(false);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        props.setParentHover && props.setParentHover(true);
        setIsHovering(false);
      }}
      style={{
        position: 'relative',
        border: isHovering
          ? `1px dashed ${token.colorPrimary}`
          : '1px dashed transparent',
        cursor: 'default',
        width: '100%',
        // height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 'max-content',
          top: -18,
          zIndex: 10,
          opacity: isHovering ? 1 : 0,
          overflow: 'visible',
        }}
      >
        <Text
          type="secondary"
          style={{
            fontSize: 12,
          }}
        >
          {schema.title}{' '}
          {schema.id?.split('-')[0] + '#' + schema.id?.split('-')[1]}
        </Text>
      </div>
      {schema.voidElementTag ? (
        <Component key={schema.id} {...schema.props} />
      ) : (
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
                onClickCallback={onClickCallback}
                setParentHover={setIsHovering}
              />
            ))}

          {/* 布局组件 */}
          {schema.children !== null &&
            (createBlackNode ? createBlackNode({ onDrop }) : null)}
        </Component>
      )}
    </div>
  );
};
