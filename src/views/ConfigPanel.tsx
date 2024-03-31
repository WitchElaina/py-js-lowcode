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
} from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux';
import { Callback, CallbackProps, Schema } from '../types/schema';
import { components } from '../components';
import { useEffect, useState } from 'react';
import { useRequests } from '../utils/requests';
import { useDynamicList, useRequest } from 'ahooks';
import { PythonCallback } from '../types/python';
import { getSchemaById } from '../utils/schemaTools';
import { cloneDeep } from 'lodash';
import { useDrop } from 'react-dnd';
import { store } from '../store';

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

// 属性配置子面板
const PropsPanel = () => {
  const curSchema: Schema = useSelector<
    { designer: { currentSelectedSchema: Schema } },
    Schema
  >((state) => state.designer.currentSelectedSchema);
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
        </Flex>
      ) : (
        <Empty style={{ marginTop: 50 }} description={'该组件没有可配置属性'} />
      )}
    </>
  );
};

// 函数事件配置表单
const EventConfig = (props: { curSchema: Schema }) => {
  const { curSchema } = props;

  const curComponentEvents = components[curSchema.componentNames]?.userEvents;

  const eventList = Object.keys(curComponentEvents || {});

  const [curSelectEvent, setCurSelectEvent] = useState<string>(eventList[0]);

  const setCallback = store.dispatch.schema.setCallback;

  const { getFuncList, getFuncDetailList } = useRequests();

  const {
    data: funcList,
    error: funcListError,
    loading: funcListLoading,
  } = useRequest(getFuncList);

  const { data: funcDetails } = useRequest(getFuncDetailList);

  if (!curComponentEvents) return null;

  const CallbackForm = (props: { curEventName: string }) => {
    const { curEventName } = props;
    const globalSchema = useSelector<{ schema: Schema }, Schema>(
      (state) => state.schema,
    );

    useEffect(() => {
      if (curSchema.userEvents[curEventName].length === 0) {
        // setEditingIndex(null);
      }
    }, [curSchema]);

    const initialCallbackItem = {
      funcName: '',
      args: [],
      returnTo: {
        id: '',
        propName: '',
      },
    };

    let existCallbacks: Callback[];
    if (curSchema.userEvents[curEventName].length === 0) {
      existCallbacks = [];
    } else {
      existCallbacks = cloneDeep(curSchema.userEvents[curEventName]);
    }

    const { list, remove, getKey, push, replace } =
      useDynamicList(existCallbacks);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const Row = (props: { index: number; item: Callback }) => {
      const { index, item } = props;

      const [funcName, setFuncName] = useState<string>(item.funcName);
      const [args, setArgs] = useState<CallbackProps[]>(item.args);
      const [argNames, setArgNames] = useState<string[]>([]);

      const FuncNameForm = () => {
        return (
          <Select
            value={funcName}
            onChange={(e) => {
              setFuncName(e);
              const newItem = cloneDeep(item);
              newItem.funcName = e;
              const newFuncArgs = funcDetails?.data.find(
                (func) => func.name === e,
              )?.args;
              console.log('NewFuncArgs', funcDetails?.data, newFuncArgs);
              // init args with newFuncArgs
              newItem.args = newFuncArgs?.map((arg) => ({
                id: '',
                propName: '',
              }));

              replace(index, newItem);
            }}
          >
            {funcList?.data?.map((func) => (
              <Select.Option key={func} value={func}>
                函数 <Text code>{func}</Text>
              </Select.Option>
            ))}
          </Select>
        );
      };

      const PropsForm = (props: {
        compId: string;
        propsName: string;
        onChange: (value: CallbackProps) => void;
      }) => {
        const { compId, propsName, onChange } = props;
        const [options, setOptions] = useState<string[]>([]);
        const [selectedCompId, setSelectedCompId] = useState<string>(compId);

        useEffect(() => {
          if (!selectedCompId) return;
          const compSchema = getSchemaById(selectedCompId, globalSchema);
          if (compSchema) {
            console.log('SetOptions', Object.keys(compSchema.props));
            setOptions(Object.keys(compSchema.props));
          }
        }, [selectedCompId]);

        const [{ isOver }, drop] = useDrop<
          { component: Schema },
          void,
          { isOver: boolean }
        >({
          accept: 'move',
          drop(item, monitor) {
            console.log('DropMove to Input', item.component.id);
            setSelectedCompId(item.component.id as string);
          },
        });

        return (
          <Flex gap={5} align="center">
            <div
              ref={drop}
              style={{
                width: '60%',
              }}
            >
              <Input
                value={selectedCompId}
                placeholder="从画布上拖拽组件到此处"
              />
            </div>
            <Select
              placeholder="属性"
              style={{ width: '40%' }}
              defaultValue={propsName}
              options={options.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(e) => onChange({ id: selectedCompId, propName: e })}
            ></Select>
          </Flex>
        );
      };

      return (
        <Flex gap={10} vertical>
          <>
            <Text strong>要执行的 Python 函数</Text>
            <FuncNameForm />
          </>

          <>
            <Text strong>传入函数的参数</Text>
            {args.map((arg, argIndex) => {
              const argNameList = funcDetails?.data.find(
                (func) => func.name === funcName,
              )?.args;

              return (
                <Flex
                  vertical
                  gap={2}
                  key={`${argIndex}.${arg.id}.${arg.propName}`}
                >
                  <Flex gap={2}>
                    <Text>参数</Text>
                    <Text code>
                      {argNameList ? argNameList[argIndex] : `参数${argIndex}`}
                    </Text>
                  </Flex>
                  <PropsForm
                    compId={arg.id}
                    propsName={arg.propName}
                    onChange={(props) => {
                      const newArgs = [...args];
                      newArgs[argIndex] = props;
                      const newItem = cloneDeep(item);
                      newItem.args = newArgs;
                      replace(index, newItem);
                    }}
                  />
                </Flex>
              );
            })}
          </>
          <>
            <Text strong>返回值写入到</Text>
            <PropsForm
              compId={item.returnTo.id}
              propsName={item.returnTo.propName}
              onChange={(props) => {
                const newItem = cloneDeep(item);
                newItem.returnTo = props;
                replace(index, newItem);
              }}
            />
          </>
        </Flex>
      );
    };

    return (
      <>
        {list.map((item, index) => (
          <>
            <Card
              size="small"
              style={{
                border: '1px solid #D4D4D4',
              }}
              title={
                <>
                  <Flex
                    gap={2}
                    align="center"
                    style={{
                      justifyContent: 'space-between',
                    }}
                  >
                    <Flex gap={2}>
                      <Title
                        level={5}
                        style={{
                          margin: '15px 0px',
                        }}
                      >
                        回调函数#{index + 1}
                      </Title>
                    </Flex>
                    <Flex gap={6}>
                      {editingIndex !== index ? (
                        <Button
                          size="small"
                          onClick={() => setEditingIndex(index)}
                        >
                          编辑
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => {
                            setEditingIndex(null);
                            console.log('EditingIndex', editingIndex, item);
                            setCallback({
                              id: curSchema.id as string,
                              eventName: curEventName,
                              callback: item,
                              index,
                            });
                          }}
                          type="primary"
                        >
                          完成
                        </Button>
                      )}
                      <Button size="small" danger onClick={() => remove(index)}>
                        删除
                      </Button>
                    </Flex>
                  </Flex>
                </>
              }
            >
              {editingIndex === index && (
                <Row key={getKey(index)} index={index} item={item} />
              )}
            </Card>
          </>
        ))}
        <Flex>
          <Button onClick={() => push(initialCallbackItem)} block>
            添加回调函数
          </Button>
        </Flex>
      </>
    );
  };

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
          <Select.Option key={event} value={event}>
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
      <CallbackForm curEventName={curSelectEvent} />
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
          curSchema={curSchema}
          // key={`${curSchema.id}-config-event`}
        />
      ) : (
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
