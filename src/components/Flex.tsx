import { Flex, FlexProps, Typography, Switch, Select } from 'antd';
import { BaseComponent } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

const FlexConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-switch" content="center">
        <Text strong>垂直布局</Text>
        <Switch
          defaultChecked={schema.props.vertical}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'vertical',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>间距</Text>
        <Select
          value={schema.props.gap}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'gap',
              value: val,
            });
          }}
          style={{ width: 120 }}
        >
          <Select.Option value={0}>无</Select.Option>
          <Select.Option value={4}>小</Select.Option>
          <Select.Option value={8}>中</Select.Option>
          <Select.Option value={16}>大</Select.Option>
        </Select>
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>对齐方式</Text>
        <Select
          value={schema.props.align}
          onChange={(val) => {
            setProps({
              id: schema.id,
              props: 'align',
              value: val,
            });
            setProps({
              id: schema.id,
              props: 'content',
              value: val,
            });
          }}
          style={{ width: 120 }}
        >
          <Select.Option value="flex-start">左对齐</Select.Option>
          <Select.Option value="center">居中</Select.Option>
          <Select.Option value="flex-end">右对齐</Select.Option>
        </Select>
      </Flex>
    </Flex>
  );
};

export const flex: BaseComponent<typeof Flex, FlexProps> = {
  name: 'flex',
  label: '布局',
  component: Flex,
  configPanel: FlexConfig,
  example: (
    <Flex style={{ width: '100%', height: '100%' }} gap={4}>
      <span
        style={{
          width: '33%',
          textAlign: 'center',
          backgroundColor: '#A6A2AE',
          color: 'white',
        }}
      >
        1
      </span>
      <span
        style={{
          width: '33%',
          textAlign: 'center',
          backgroundColor: '#594B84',
          color: 'white',
        }}
      >
        2
      </span>
      <span
        style={{
          width: '33%',
          textAlign: 'center',
          backgroundColor: '#A6A2AE',
          color: 'white',
        }}
      >
        3
      </span>
    </Flex>
  ),
  defaultSchema: {
    componentNames: 'flex',
    props: {
      style: {
        width: '100%',
        // height: '100%',
        padding: 16,
        flexGrow: 1,
      },
      vertical: true,
      gap: 16,
      align: 'center',
    },
    title: '布局',
    states: {},
    children: [],
  },
};
