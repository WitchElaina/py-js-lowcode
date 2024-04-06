import {
  Switch,
  SwitchProps,
  Button,
  ButtonProps,
  Flex,
  Typography,
  Select,
  Input,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const SwitchConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<SwitchProps>;
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
        <Text strong>大小</Text>
        <Select
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.size || 'default'}
          options={[
            { label: '默认', value: 'default' },
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

export const switcher: BaseComponent<typeof Switch, SwitchProps> = {
  name: 'switcher',
  label: '开关',
  component: Switch,
  example: <Switch />,
  variables: {
    value: '值',
  },
  states: {},
  configPanel: SwitchConfig,
  defaultEvents: {
    onChange: (val, id) => {
      store.dispatch.schema.changePropsById({
        id,
        props: 'value',
        value: val,
      });
    },
  },
  defaultSchema: {
    componentNames: 'switcher',
    props: {
      style: {
        width: 'fit-content',
        // height: '22px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    title: '开关',
    children: null,
    voidElementTag: true,
  },
};
