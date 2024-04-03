import { InputProps, Flex, Typography, Switch, Select, Input } from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const InputConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<InputProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
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
        <Text strong>样式</Text>
        <Select
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.variant || 'outlined'}
          options={[
            { label: '默认', value: 'outlined' },
            { label: '填充', value: 'filled' },
            { label: '无边', value: 'borderless' },
          ]}
          onChange={(val) => {
            setProps({
              id,
              props: 'variant',
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
        <Text strong>前缀</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.prefix as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'prefix',
              value: e.target.value,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>后缀</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.suffix as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'suffix',
              value: e.target.value,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

export const input: BaseComponent<typeof Input, InputProps> = {
  name: 'input',
  label: '输入框',
  component: Input,
  example: <Input placeholder="请输入" />,
  configPanel: InputConfig,
  variables: {
    value: '值',
  },
  states: {
    value: '值',
  },
  userEvents: {
    onChange: {
      label: '值改变',
    },
  },
  defaultSchema: {
    componentNames: 'input',
    props: {
      placeholder: '请输入',
    },
    title: '输入框',
    children: null,
    voidElementTag: true,
    userEvents: {
      onChange: [],
    },
  },
};
