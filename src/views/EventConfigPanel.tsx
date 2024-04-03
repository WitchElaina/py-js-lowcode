import { Callback, Schema } from '../types/schema';
import { useRequest, useUpdateEffect } from 'ahooks';
import { useRequests } from '../utils/requests';
import {
  AutoComplete,
  Button,
  Divider,
  Flex,
  Select,
  Typography,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import { components } from '../components';
import { getSchemaById } from '../utils/schemaTools';
import { useDrop } from 'react-dnd';
import { CodeSandboxOutlined } from '@ant-design/icons';
import MonacoEditor from 'react-monaco-editor';

const { Text, Paragraph } = Typography;
const { useToken } = theme;

export interface ArgConfigProps {
  compId: string;
  propName: string;
  onChange: (arg: { id: string; propName: string }) => void;
  isReturnArg?: boolean;
}

export const ArgConfig: React.FC<ArgConfigProps> = (props) => {
  const { compId, propName, onChange, isReturnArg } = props;

  const { token } = useToken();

  const compName = compId?.split('-')[0] || '';
  // const compName = 'button';
  const compProps = isReturnArg
    ? components?.[compName]?.states || {}
    : components?.[compName]?.variables || {};

  const options = Object.keys(compProps).map((op) => {
    return {
      value: op,
      label: (
        <>
          {compProps[op]}
          <Text code>{op}</Text>
        </>
      ),
    };
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
      console.log('Drop to set id', item, monitor.getItem());
      onChange({
        id: monitor.getItem().component.id as string,
        propName: propName,
      });
    },
  });

  return (
    <div
      ref={drop}
      style={{
        border: isOver
          ? `2px solid ${token.colorPrimary}`
          : '2px dashed transparent',
      }}
    >
      <Flex gap={5}>
        <AutoComplete
          placeholder="拖拽组件到此设置ID"
          style={{
            flexGrow: 1,
          }}
          value={compId}
        />
        <Select
          value={propName}
          style={{
            width: '150px',
          }}
          onChange={(value) => {
            onChange({ id: compId, propName: value });
          }}
          placeholder="属性"
          options={options}
        ></Select>
      </Flex>
    </div>
  );
};

export interface EventConfigPanelProps {
  curCallback: Callback;
  funcList: string[];
  funcDetailList: { name: string; args: string[]; code: string }[];
  onChange: (callback: Callback) => void;
  onDelete: () => void;
}

export const EventConfigPanel: React.FC<EventConfigPanelProps> = (props) => {
  const { curCallback, funcList, funcDetailList } = props;

  const [val, setVal] = useState<Callback>(curCallback);
  const [argNames, setArgNames] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [codeStr, setCodeStr] = useState('');
  const [height, setHeight] = useState(200);

  useEffect(() => {
    const func = funcDetailList.find((func) => func.name === val.funcName);
    const newArgs = func?.args || [];
    console.log('New', newArgs);
    setArgNames([...newArgs]);
    const code = func?.code || '';
    const lines = code.split('\n').length;
    const newHeight = Math.min(200, (lines + 1) * 14);
    console.log('Lines', lines, newHeight);
    setHeight(newHeight);
    setCodeStr(code);
  }, [val.funcName, funcDetailList]);

  return (
    <Flex vertical>
      <Divider style={{ margin: '0', marginBottom: '10px' }} />
      {
        <Flex vertical>
          <Flex gap={5}>
            函数名
            {/* <Text code>{val.funcName}</Text> */}
          </Flex>
          <Flex gap={5}>
            <Select
              style={{
                flexGrow: 1,
              }}
              onChange={(value) => {
                setVal({ ...val, funcName: value });
              }}
              value={val.funcName}
            >
              {funcList.map((func) => (
                <Select.Option key={func} value={func}>
                  函数 <Text code>{func}</Text>
                </Select.Option>
              ))}
            </Select>
            <Button
              icon={<CodeSandboxOutlined />}
              onClick={() => {
                setShowCode(!showCode);
              }}
            />
          </Flex>
          {showCode && (
            <div
              style={{
                marginTop: '10px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <MonacoEditor
                height={height}
                width={'100%'}
                language="python"
                theme="vs-dark"
                options={{
                  readOnly: true,
                  automaticLayout: true,
                  minimap: {
                    enabled: false,
                  },
                }}
                value={codeStr}
              />
            </div>
          )}

          <Divider style={{ margin: '10px 0' }} />

          {/* <Flex gap={5}>
            参数值
            {val.args.map((arg) => (
              <Text code>
                #{arg.id}.{arg.propName}
              </Text>
            ))}
          </Flex> */}
          <Flex vertical>
            {argNames.map((argName, index) => {
              return (
                <Flex vertical>
                  <Flex>
                    <Text>参数</Text>
                    <Text code>{argName}</Text>
                  </Flex>
                  <ArgConfig
                    onChange={(arg) => {
                      const newArgs = [...val.args];
                      newArgs[index] = arg;
                      setVal({ ...val, args: newArgs });
                    }}
                    compId={val.args?.[index]?.id}
                    propName={val.args?.[index]?.propName}
                  />
                </Flex>
              );
            })}
          </Flex>

          <Divider style={{ margin: '10px 0' }} />

          <Flex vertical>
            <Flex gap={5}>
              返回值
              {/* <Text code>
                {val.returnTo.id}.{val.returnTo.propName}
              </Text> */}
            </Flex>
            <ArgConfig
              onChange={(arg) => {
                setVal({ ...val, returnTo: arg });
              }}
              compId={val.returnTo.id}
              propName={val.returnTo.propName}
              isReturnArg
            />
          </Flex>
        </Flex>
      }
      <Divider style={{ margin: '10px 0' }} />
      <Flex gap={5}>
        <Button block onClick={() => props.onChange(val)}>
          保存
        </Button>
        <Button block onClick={() => props.onDelete()} danger>
          删除
        </Button>
      </Flex>
    </Flex>
  );
};
