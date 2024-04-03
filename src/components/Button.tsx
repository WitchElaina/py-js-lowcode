import {
  Button,
  ButtonProps,
  Flex,
  Typography,
  Switch,
  Select,
  Input,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const ButtonConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<ButtonProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-switch">
        <Text strong>填充宽度</Text>
        <Switch
          defaultChecked={schemaProps.block}
          onChange={(val) => {
            setProps({
              id,
              props: 'block',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-switch">
        <Text strong>禁用</Text>
        <Switch
          defaultChecked={schemaProps.disabled}
          onChange={(val) => {
            setProps({
              id,
              props: 'disabled',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>危险操作按钮</Text>
        <Switch
          defaultChecked={schemaProps.danger}
          onChange={(val) => {
            setProps({
              id,
              props: 'danger',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>样式</Text>
        <Select
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.type || 'default'}
          options={[
            { label: '默认', value: 'default' },
            { label: '主要', value: 'primary' },
            { label: '虚线', value: 'dashed' },
            { label: '文字', value: 'text' },
          ]}
          onChange={(val) => {
            setProps({
              id,
              props: 'type',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>大小</Text>
        <Select
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.size || 'default'}
          options={[
            { label: '默认', value: 'default' },
            { label: '大', value: 'large' },
            { label: '小', value: 'small' },
          ]}
          onChange={(val) => {
            setProps({
              id,
              props: 'size',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>标签</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.children as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'children',
              value: e.target.value,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

export const button: BaseComponent<typeof Button, ButtonProps> = {
  name: 'button',
  label: '按钮',
  component: Button,
  example: <Button block>按钮</Button>,
  variables: {
    children: '标签',
  },
  states: {
    children: '标签',
  },
  userEvents: {
    onClick: {
      label: '点击按钮',
    },
  },
  configPanel: ButtonConfig,
  defaultSchema: {
    componentNames: 'button',
    props: {
      children: '按钮',
    },
    title: '按钮',
    children: null,
    userEvents: {
      onClick: [],
    },
  },
};
