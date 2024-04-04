import {
  InputProps,
  Flex,
  Typography,
  Switch,
  Select,
  Input,
  Radio,
  RadioGroupProps,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';
import { OptionsList } from './config/OptionsList';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const RadioConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<RadioGroupProps>;
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

export const radio: BaseComponent<typeof Radio.Group, RadioGroupProps> = {
  name: 'radio',
  label: '单选框',
  component: Radio.Group,
  example: <Radio>单选框</Radio>,
  configPanel: RadioConfig,
  variables: { value: '值' },
  states: {},
  defaultSchema: {
    componentNames: 'radio',
    props: {
      options: [
        { label: '默认选项1', value: '默认选项1' },
        { label: '默认选项2', value: '默认选项2' },
        { label: '默认选项3', value: '默认选项3' },
      ],
    },
    title: '单选框',
    children: null,
  },
};
