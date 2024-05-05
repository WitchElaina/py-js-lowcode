import { InputProps, Flex, Typography, Switch, Select, Input } from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;
const { TextArea } = Input;

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
    </Flex>
  );
};

export const inputArea: BaseComponent<typeof Input, InputProps> = {
  name: 'inputArea',
  label: '输入区域',
  component: TextArea,
  example: <TextArea placeholder="请输入" />,
  configPanel: InputConfig,
  variables: {
    value: '值',
  },
  states: {
    value: '值',
  },
  defaultEvents: {
    onChange: (e, id) => {
      store.dispatch.schema.changePropsById({
        id,
        props: 'value',
        value: e.target.value,
      });
    },
  },
  defaultSchema: {
    componentNames: 'inputArea',
    props: {
      placeholder: '请输入',
    },
    title: '输入框',
    children: null,
    voidElementTag: true,
  },
};
