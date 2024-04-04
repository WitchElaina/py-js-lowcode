import {
  InputProps,
  Flex,
  Typography,
  Switch,
  Select,
  Input,
  Checkbox,
  CheckboxProps,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';
import { OptionsList } from './config/OptionsList';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const CheckboxConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<CheckboxProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
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

export const checkbox: BaseComponent<typeof Checkbox, CheckboxProps> = {
  name: 'checkbox',
  label: '多选框',
  component: Checkbox.Group,
  example: <Checkbox>多选框</Checkbox>,
  configPanel: CheckboxConfig,
  variables: {
    value: '选中值数组',
  },
  states: {},
  defaultEvents: {
    onChange: (e, id) => {
      store.dispatch.schema.changePropsById({
        id,
        props: 'value',
        value: e,
      });
    },
  },
  defaultSchema: {
    componentNames: 'checkbox',
    props: {
      options: [
        { label: '默认选项1', value: '默认选项1' },
        { label: '默认选项2', value: '默认选项2' },
        { label: '默认选项3', value: '默认选项3' },
      ],
    },
    title: '多选框',
    children: null,
  },
};
