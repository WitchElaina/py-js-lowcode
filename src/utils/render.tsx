import { Schema } from '../types/schema';
import { components } from '../components';
import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Tag, theme } from 'antd';
import { BaseComponent } from '../types/component';
import { store } from '../store';
import { useRequests } from './requests';

const { useToken } = theme;

export const RenderDesigner = (props: {
  schema: Schema;
  appendSchema: (props: { schemaToAppend: Schema; parentId: string }) => void;
  appendExistSchema: (props: {
    schemaToAppend: Schema;
    parentId: string;
  }) => void;
  swapSchema: (props: { fromId: string; toId: string }) => void;
  deleteSchema: (props: { id: string }) => void;
  onClickCallback?: (schema: Schema) => void;
  setParentHover?: (props: boolean) => void;
}) => {
  const {
    schema,
    appendSchema,
    appendExistSchema,
    swapSchema,
    deleteSchema,
    onClickCallback,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = components[schema.componentNames].component as any;

  const { token } = useToken();

  const onDrop = (item: { component: BaseComponent<unknown, unknown> }) => {
    console.log('组件内 onDrop', schema, item.component.defaultSchema);
    appendSchema({
      schemaToAppend: item.component.defaultSchema,
      parentId: schema.id as string,
    });
  };

  // 布局组件接纳新组件的区域
  const [blankDropProps, dropBlank] = useDrop({
    accept: 'component',
    drop: (item: { component: BaseComponent<unknown, unknown> }) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  // ---
  const [isHovering, setIsHovering] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'move',
    item: { component: schema },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop<
    { component: Schema },
    void,
    { isOver: boolean }
  >({
    accept: 'move',
    hover() {
      // console.log('组件内 hover', monitor.isOver({ shallow: true }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
    drop(item, monitor) {
      console.log('组件内 onDropMove', schema.id, item, monitor.getItem());
      // window.alert('移动组件\n' + item.component.id + '\n 👇🏻 \n' + schema.id);

      if (Array.isArray(schema.children)) {
        console.log('Add to flex');
        appendExistSchema({
          schemaToAppend: item.component,
          parentId: schema.id as string,
        });
      } else {
        console.log('Swap position');
        swapSchema({
          fromId: item.component.id as string,
          toId: schema.id as string,
        });
      }

      // 用于阻止冒泡
      throw new Error('移动组件');
    },
  });

  const ref = useRef(null);
  drag(drop(ref));

  const defaultBorder = '2px dashed transparent';
  const [borderStyle, setBorderStyle] = useState(defaultBorder);

  useEffect(() => {
    if (isOver) {
      return setBorderStyle(`2px solid ${token.colorPrimary}`);
    } else if (isHovering) {
      return setBorderStyle(`2px dashed ${token.colorPrimary}`);
    } else if (schema.children !== null) {
      if (blankDropProps.isOver)
        return setBorderStyle(`2px solid ${token.colorPrimary}`);
      if (blankDropProps.canDrop)
        return setBorderStyle(`2px dashed ${token.colorPrimary}`);
    }
    setBorderStyle(defaultBorder);
  }, [
    isHovering,
    isOver,
    blankDropProps,
    defaultBorder,
    token.colorPrimary,
    schema.children,
  ]);

  const { execFunc } = useRequests();

  // 获取用户事件
  const events = Object.keys(schema?.userEvents || {});
  const eventsCallback: Record<string, () => void> = {};
  events.forEach((event: string) => {
    eventsCallback[event] = () =>
      store.dispatch.schema.runAsync({
        id: schema.id as string,
        eventName: event,
        execReq: execFunc,
      });
  });

  // 组件自带事件
  const defaultEvents = Object.keys(
    components?.[schema.componentNames]?.defaultEvents || {},
  );
  defaultEvents.forEach((event: string) => {
    eventsCallback[event] = (e: unknown) => {
      console.log('defaultEvents', event, schema.id, e.target.value);
      components?.[schema.componentNames]?.defaultEvents?.[event](
        e,
        schema.id as string,
      );
    };
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
        // border: isHovering
        //   ? `1px dashed ${token.colorPrimary}`
        //   : '1px dashed transparent',
        border: borderStyle,

        cursor: 'default',
        // width: '100%',
        // height: '100%',
        opacity: isDragging ? 0.6 : 1,
      }}
    >
      {/* 上方显示的组件名称信息 */}
      <div
        className="hover-title"
        style={{
          position: 'absolute',
          width: 'max-content',
          top: 0,
          left: 0,
          zIndex: 10,
          opacity: isHovering || isOver ? 1 : 0,
          display: isHovering || isOver ? 'block' : 'none',
          overflow: 'visible',
          transform: 'translate(-14%, -100%)  scale(0.75)',
        }}
      >
        {isOver &&
          (schema.children ? (
            <Tag color="green-inverse" style={{ marginRight: '2px' }}>
              添加到
            </Tag>
          ) : (
            <Tag color="pink-inverse" style={{ marginRight: '2px' }}>
              交换位置
            </Tag>
          ))}
        <Tag
          color="purple-inverse"
          style={{
            fontSize: 12,
            marginRight: '2px',
          }}
        >
          {schema.title}{' '}
          {schema.id?.split('-')[0] + '#' + schema.id?.split('-')[1]}
        </Tag>
        <Tag
          color="red-inverse"
          style={{
            fontSize: 12,
            cursor: 'pointer',
          }}
          onClick={() => deleteSchema({ id: schema.id as string })}
        >
          删除
        </Tag>
      </div>

      {/* 组件本身 */}
      <span ref={ref}>
        {schema.voidElementTag ? (
          <Component key={schema.id} {...schema.props} {...eventsCallback} />
        ) : (
          <Component {...schema.props} key={schema.id} {...eventsCallback}>
            {/* 非布局组件的children */}
            {schema.children === null && schema.props?.children}

            {/* 布局组件的children */}
            {Array.isArray(schema.children) &&
              schema.children.map((item) => (
                <RenderDesigner
                  schema={item}
                  appendSchema={appendSchema}
                  appendExistSchema={appendExistSchema}
                  swapSchema={swapSchema}
                  deleteSchema={deleteSchema}
                  onClickCallback={onClickCallback}
                  setParentHover={setIsHovering}
                />
              ))}
          </Component>
        )}
      </span>

      {/* 布局组件末尾插入占位符 */}
      {schema.children !== null && (
        // 布局组件
        <div
          ref={dropBlank}
          style={{
            display: blankDropProps.canDrop ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            color: token.colorTextPlaceholder,
            backgroundColor: token.colorBgBase,
            height: 50,
          }}
        >
          {blankDropProps.isOver ? '释放以添加' : '添加到这个布局组件内'}
        </div>
      )}

      {/* 被拖拽拿起时原位置显示的 Preview */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: isDragging ? 'block' : 'none',
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      ></div>
    </div>
  );
};
