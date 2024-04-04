import {
  InputProps,
  Flex,
  Typography,
  Switch,
  Select,
  Input,
  SelectProps,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';
import { OptionsList } from './config/OptionsList';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const SelectConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<SelectProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
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
      <OptionsList
        label={'选项'}
        defaultValue={schemaProps.options || []}
        onChange={(list) => {
          setProps({
            id,
            props: 'options',
            value: list,
          });
        }}
      />
    </Flex>
  );
};

export const select: BaseComponent<typeof Select, SelectProps> = {
  name: 'select',
  label: '选择器',
  component: Select,
  example: <Select style={{ width: '100%' }} placeholder={'请选择选项'} />,
  variables: { value: '值' },
  states: {},
  configPanel: SelectConfig,
  defaultSchema: {
    componentNames: 'select',
    props: {
      style: {
        width: '100%',
      },
      placeholder: '请选择选项',
    },
    title: '选择器',
    children: null,
    voidElementTag: true,
  },
};
