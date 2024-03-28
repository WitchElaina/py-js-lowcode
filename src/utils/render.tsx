import { Schema } from '../types/schema';
import { components } from '../components';
import { ReactNode, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Typography, theme } from 'antd';

const { Text } = Typography;
const { useToken } = theme;

export const RenderDesigner = (props: {
  schema: Schema;
  appendSchema: (props: { schema: Schema; id: string }) => void;
  onClickCallback?: (schema: Schema) => void;
  BlankNode?: React.FC;
  setParentHover?: (props: boolean) => void;
}) => {
  const { schema, BlankNode, appendSchema, onClickCallback } = props;

  const Component = components[schema.componentNames].component;

  const { token } = useToken();

  const onDrop = (item) => {
    console.log('组件内 onDrop', schema, item.component.defaultSchema);
    appendSchema({
      schemaToAppend: item.component.defaultSchema,
      parentId: schema.id,
    });
  };

  const onDropMove = (item) => {
    console.log('组件内 onDropMove', schema, item);
    window.alert('移动组件');
  };

  const [isHovering, setIsHovering] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'move',
    item: { component: schema },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
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
        opacity: isDragging ? 0.5 : 1,
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
      {/* 排序节点 前 */}
      {BlankNode && (
        <BlankNode
          onDrop={onDropMove}
          accept={'move'}
          overText={'释放鼠标插入'}
          outsideText={'插入到此组件前方'}
        />
      )}
      {schema.voidElementTag ? (
        <div>
          <Component key={schema.id} {...schema.props} />
          <div
            className="drag-layer"
            ref={drag}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'move',
            }}
          />
        </div>
      ) : (
        <Component {...schema.props} key={schema.id} ref={drag}>
          {/* 非布局组件的children */}
          {schema.children === null && schema.props?.children}

          {/* 布局组件的children */}
          {Array.isArray(schema.children) &&
            schema.children.map((item, index) => (
              <RenderDesigner
                schema={item}
                BlankNode={BlankNode}
                appendSchema={appendSchema}
                onClickCallback={onClickCallback}
                setParentHover={setIsHovering}
              />
            ))}

          {BlankNode && schema.children !== null && (
            // 布局组件
            <>
              <BlankNode
                onDrop={onDrop}
                accept={'component'}
                overText={'释放鼠标添加组件'}
                outsideText={'拖拽组件到此处'}
                customStyle={{ minHeight: 50 }}
              />
              <BlankNode
                onDrop={onDropMove}
                accept={'move'}
                overText={'释放鼠标移动组件'}
                outsideText={'移动组件到此布局容器'}
              />
            </>
          )}
        </Component>
      )}
      {/* 排序节点 后 */}
      {BlankNode && (
        <BlankNode
          onDrop={onDropMove}
          accept={'move'}
          overText={'释放鼠标插入'}
          outsideText={'插入到此组件后方'}
        />
      )}
    </div>
  );
};
