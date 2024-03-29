import {
  Button,
  ButtonProps,
  Flex,
  Typography,
  Switch,
  Select,
  Input,
} from 'antd';
import { BaseComponent } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

const ButtonConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-switch">
        <Text strong>填充宽度</Text>
        <Switch
          defaultChecked={schema.props.block}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'block',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-switch">
        <Text strong>禁用</Text>
        <Switch
          defaultChecked={schema.props.disabled}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'disabled',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>危险操作按钮</Text>
        <Switch
          defaultChecked={schema.props.danger}
          onChange={(val) => {
            setProps({
              id: schema.id,
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
          defaultValue={schema.props.type || 'default'}
          options={[
            { label: '默认', value: 'default' },
            { label: '主要', value: 'primary' },
            { label: '虚线', value: 'dashed' },
            { label: '文字', value: 'text' },
          ]}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'type',
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
          defaultValue={schema.props.children}
          onChange={(e) => {
            setProps({
              id: schema.id,
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
  variables: [
    {
      name: 'children',
      label: '文本',
    },
  ],
  configPanel: ButtonConfig,
  defaultSchema: {
    componentNames: 'button',
    props: {
      children: '按钮',
    },
    title: '按钮',
    states: {},
    children: null,
  },
};
