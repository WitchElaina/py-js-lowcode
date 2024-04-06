import {
  Flex,
  Typography,
  Switch,
  InputNumber,
  Slider,
  SliderSingleProps,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const SliderConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<SliderSingleProps>;
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

      <Flex className="wp-single-line wp-input">
        <Text strong>最大值</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.max as number}
          onChange={(e) => {
            setProps({
              id,
              props: 'max',
              value: e,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>最小值</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.min as number}
          onChange={(e) => {
            setProps({
              id,
              props: 'min',
              value: e,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>步长</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.step as number}
          onChange={(e) => {
            setProps({
              id,
              props: 'step',
              value: e,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

export const slider: BaseComponent<typeof Slider, SliderSingleProps> = {
  name: 'slider',
  label: '滑动输入条',
  component: Slider,
  example: <Slider />,
  configPanel: SliderConfig,
  variables: {
    value: '值',
  },
  states: {
    value: '值',
  },
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
    componentNames: 'slider',
    props: {},
    title: '滑动输入条',
    children: null,
    voidElementTag: true,
  },
};
