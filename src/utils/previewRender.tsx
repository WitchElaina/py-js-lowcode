import { Schema } from '../types/schema';
import { components } from '../components';
import { store } from '../store';
import { useRequests } from './requests';

export const PreviewRender = (props: { schema: Schema }) => {
  const { schema } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = components[schema.componentNames].component as any;

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
      console.log('defaultEvents', event, schema.id, e);
      components?.[schema.componentNames]?.defaultEvents?.[event](
        e,
        schema.id as string,
      );
    };
  });

  const styleProps = schema.props?.style || {};
  const otherProps = Object.keys(schema.props || {}).reduce((acc, key) => {
    if (key !== 'style') {
      acc[key] = schema.props[key];
    }
    return acc;
  }, {});

  return (
    <div
      style={{
        position: 'relative',
        boxSizing:
          schema.componentNames === 'flex' ? 'border-box' : 'content-box',
        ...styleProps,
      }}
    >
      {/* 组件本身 */}

      {schema.voidElementTag ? (
        <Component
          title={schema.title}
          key={schema.id}
          {...otherProps}
          {...eventsCallback}
        />
      ) : (
        <Component
          title={schema.title}
          {...otherProps}
          key={schema.id}
          {...eventsCallback}
        >
          {/* 非布局组件的children */}
          {schema.children === null && schema.props?.children}

          {/* 布局组件的children */}
          {Array.isArray(schema.children) &&
            schema.children.length > 0 &&
            schema.children.map((item) => <PreviewRender schema={item} />)}
        </Component>
      )}
    </div>
  );
};
