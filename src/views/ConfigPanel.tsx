import {
  ConfigProvider,
  Tabs,
  theme,
  Empty,
  Typography,
  Flex,
  Divider,
  Select,
  Button,
  Input,
  Card,
  Result,
  Switch,
} from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Callback, CallbackProps, Schema } from '../types/schema';
import { components } from '../components';
import { CSSProperties, useEffect, useState } from 'react';
import { useRequests } from '../utils/requests';
import { useDynamicList, useRequest, useUpdate } from 'ahooks';
import { PythonCallback } from '../types/python';
import { getSchemaById } from '../utils/schemaTools';
import { cloneDeep, update } from 'lodash';
import { useDrop } from 'react-dnd';
import { store } from '../store';
import { EventConfigPanel } from './EventConfigPanel';

const { Text, Title } = Typography;

const InfoPanel = (props: { curSchema: Schema }) => {
  const { curSchema } = props;
  return (
    <>
      <Title level={5} style={{ margin: 0 }}>
        {curSchema.title}
      </Title>
      <Text code>{curSchema.id}</Text>
      <Divider style={{ margin: '10px 0' }} />
    </>
  );
};

const StylePanel = (props: { curSchema: Schema }) => {
  const { curSchema } = props;
  const originStyle = curSchema?.props?.style || {};
  console.log('stylePanel', originStyle);
  const setProps = store.dispatch.schema.changePropsById;

  const setStyle = (key: string, value: any) => {
    const newStyle = cloneDeep(originStyle);
    newStyle[key] = value;
    setProps({
      id: curSchema.id as string,
      props: 'style',
      value: newStyle,
    });
  };

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-input">
        <Text strong>宽度</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={originStyle.width}
          onBlur={(e) => {
            setStyle('width', e.target.value);
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>高度</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={originStyle.height}
          onBlur={(e) => {
            setStyle('height', e.target.value);
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>外边距</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={originStyle.margin}
          onBlur={(e) => {
            setStyle('margin', e.target.value);
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>内边距</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={originStyle.padding}
          onBlur={(e) => {
            setStyle('padding', e.target.value);
          }}
        />
      </Flex>
    </Flex>
  );
};

// 属性配置子面板
const PropsPanel = () => {
  const curSchema: Schema = useSelector<
    { designer: { currentSelectedSchema: Schema } },
    Schema
  >((state) => state.designer.currentSelectedSchema);
  const schema = useSelector<{ schema: Schema }, Schema>(
    (state) => state.schema,
  );

  useEffect(() => {
    if (curSchema) {
      const id = curSchema.id as string;
      if (!id) return;
      const curSchemaNew = getSchemaById(id, schema);
      if (curSchemaNew) {
        store.dispatch.designer.setCurSchema(curSchemaNew);
      }
      console.log('schema update', curSchema);
    }
  }, [schema]);

  const [customStyle, setCustomStyle] = useState(false);

  if (!curSchema)
    return (
      <Empty style={{ marginTop: 50 }} description={'请先在左侧选择组件'} />
    );

  const Config = components[curSchema.componentNames]?.configPanel;

  return (
    <>
      {Config ? (
        <Flex
          vertical
          gap={8}
          style={{
            padding: 16,
          }}
        >
          <InfoPanel curSchema={curSchema} />

          <Config schema={curSchema} key={`${curSchema.id}-config-props`} />
          <Divider style={{ margin: '10px 0' }} />

          <Flex
            content="center"
            gap={8}
            align="center"
            style={{
              paddingBottom: 8,
            }}
          >
            <Text strong>高级样式</Text>
            <Switch
              checked={customStyle}
              onChange={setCustomStyle}
              size="small"
            />
          </Flex>
          {customStyle && (
            <StylePanel
              curSchema={curSchema}
              key={`${curSchema.id}-config-style`}
            />
          )}
        </Flex>
      ) : (
        <Empty style={{ marginTop: 50 }} description={'该组件没有可配置属性'} />
      )}
    </>
  );
};

// 函数事件配置表单
const EventConfig = (props: { curSchema: Schema; update: () => void }) => {
  /**
   * 依赖读取
   * @argument curSchema 当前选中的 schema 子节点
   * @argument globalSchema 全局 schema 根节点
   * @argument funcList Python 适配器中注册的函数列表
   * @argument funcDetails Python 适配器中注册的函数详情列表
   * @argument curComponentEvents 当前组件支持的事件描述对象
   *  eg. { onClick: { label: '点击事件' }
   * @argument eventList 当前组件支持的事件列表
   *  eg. ['onClick']
   */
  const { curSchema, update } = props;
  const globalSchema = useSelector<{ schema: Schema }, Schema>(
    (state) => state.schema,
  );

  const { getFuncList, getFuncDetailList } = useRequests();
  const {
    data: funcList,
    loading: funcListLoading,
    error: funcListError,
    refresh: refreshFuncList,
  } = useRequest(getFuncList);
  const {
    data: funcDetails,
    loading: funcDetailsLoading,
    error: funcDetailsError,
    refresh: refreshFuncDetails,
  } = useRequest(getFuncDetailList);

  console.log('funcList', funcList);
  console.log('funcDetails', funcDetails);

  const curComponentEvents = components[curSchema.componentNames]?.userEvents;
  const eventList = Object.keys(curComponentEvents || {});

  /**
   * 状态管理
   * @argument curSelectEvent 当前选中要配置的组件事件
   * ↑ @argument curCallbackList 当前选中事件在 schema 中已经配置的回调函数列表
   */
  // 默认选中的配置事件
  const [curSelectEvent, setCurSelectEvent] = useState<string>(eventList[0]);
  const [curCallbackList, setCurCallbackList] = useState<Callback[]>([]);

  useEffect(() => {
    const select = getSchemaById(curSchema.id, globalSchema);
    if (select) {
      setCurCallbackList(select.userEvents[curSelectEvent] || []);
    }
  }, [globalSchema, curSchema, curSelectEvent]);

  /**
   * 渲染模板
   */
  if (!curComponentEvents) return null;

  return (
    <>
      <Title
        level={5}
        style={{
          margin: '5px 0px',
        }}
      >
        组件事件
      </Title>
      <Select value={curSelectEvent} onChange={setCurSelectEvent}>
        {eventList.map((event) => (
          <Select.Option key={`select-option-py-func-${event}`} value={event}>
            {curComponentEvents[event].label}
            <Text
              code
              style={{
                marginLeft: 2,
              }}
            >
              {event}
            </Text>
          </Select.Option>
        ))}
      </Select>
      <Divider style={{ margin: '10px 0' }} />
      {!funcListLoading &&
        !funcDetailsLoading &&
        !funcListError &&
        !funcDetailsError && (
          <Flex gap={10} vertical>
            {curCallbackList.map((callback, index) => {
              return (
                <Card size="small" key={`${curSchema.id}-callback-${uuidv4()}`}>
                  <Flex gap={10} vertical>
                    <Title level={5} style={{ margin: '0' }}>
                      回调函数 {index + 1}
                    </Title>
                    <EventConfigPanel
                      curCallback={callback}
                      funcList={funcList?.data || []}
                      funcDetailList={funcDetails?.data || []}
                      onChange={(callback: Callback) => {
                        return store.dispatch.schema.setCallback({
                          id: curSchema.id as string,
                          eventName: curSelectEvent,
                          index,
                          callback,
                        });
                      }}
                      onDelete={() => {
                        return store.dispatch.schema.deleteCallback({
                          id: curSchema.id as string,
                          eventName: curSelectEvent,
                          index,
                        });
                      }}
                    />
                  </Flex>
                </Card>
              );
            })}
            <Button
              onClick={() => {
                store.dispatch.schema.appendCallback({
                  id: curSchema.id as string,
                  eventName: curSelectEvent,
                });
                update();
              }}
              type="link"
            >
              添加回调函数
            </Button>
          </Flex>
        )}
      {(funcListError || funcDetailsError) && (
        <Result
          status="error"
          title="连接 Python 适配器失败"
          subTitle={
            <Flex vertical align="center">
              <Text type="secondary">
                {funcDetailsError?.name + ': ' + funcDetailsError?.message ||
                  funcListError?.name + ': ' + funcListError?.message ||
                  '未知错误'}
              </Text>
              <Text type="warning">
                请检查 Python 适配器是否正常运行，尝试重新连接。
              </Text>
            </Flex>
          }
          extra={
            <Flex
              wrap="wrap"
              gap={10}
              align="center"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Button>帮助文档</Button>
              <Button
                type="primary"
                onClick={() => {
                  refreshFuncList();
                  refreshFuncDetails();
                }}
              >
                重新连接
              </Button>
            </Flex>
          }
        ></Result>
      )}
    </>
  );
};

// 事件配置子面板
const EventPanel = () => {
  const curSchema: Schema = useSelector<
    { designer: { currentSelectedSchema: Schema } },
    Schema
  >((state) => state.designer.currentSelectedSchema);

  if (!curSchema)
    return (
      <Empty style={{ marginTop: 50 }} description={'请先在左侧选择组件'} />
    );

  const events = components[curSchema.componentNames]?.userEvents;

  return curSchema ? (
    <Flex
      vertical
      gap={8}
      style={{
        padding: 16,
      }}
    >
      <InfoPanel curSchema={curSchema} />
      {events ? (
        <EventConfig
          update={update}
          curSchema={curSchema}
          key={`${curSchema.id}-config-event`}
        />
      ) : (
        // <EventConfigPanel curSchema={curSchema} />
        <Empty
          style={{ marginTop: 50 }}
          description={'该组件没有可配置回调事件'}
        />
      )}
    </Flex>
  ) : (
    <Empty style={{ marginTop: 50 }} description={'请先在左侧选择组件'} />
  );
};

export function ConfigPanel() {
  const { useToken } = theme;
  const { token } = useToken();

  const schema = useSelector<{ schema: Schema }, Schema>(
    (state) => state.schema,
  );

  return (
    <div
      style={{
        background: token.colorBgBase,
        border: `1px solid ${token.colorBorderSecondary}`,
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              horizontalMargin: '0',
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="2"
          centered
          items={[
            {
              key: '1',
              label: '结构',
              children: (
                <MonacoEditor
                  height={800}
                  width={'100%'}
                  language="json"
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                  }}
                  value={JSON.stringify(schema, null, 2)}
                />
              ),
            },
            {
              key: '2',
              label: '属性',
              children: <PropsPanel />,
            },
            {
              key: '3',
              label: '事件',
              children: <EventPanel />,
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
}
