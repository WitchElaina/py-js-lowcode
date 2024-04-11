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
import { TextProps } from 'antd/es/typography/Text';

const { Text, Title, Paragraph, Link } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const TextConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<ButtonProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-select">
        <Text strong>强调展示</Text>
        <Switch
          defaultChecked={schemaProps.strong}
          onChange={(val) => {
            setProps({
              id,
              props: 'strong',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>高亮展示</Text>
        <Switch
          defaultChecked={schemaProps.mark}
          onChange={(val) => {
            setProps({
              id,
              props: 'mark',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>代码框展示</Text>
        <Switch
          defaultChecked={schemaProps.code}
          onChange={(val) => {
            setProps({
              id,
              props: 'code',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>键盘框展示</Text>
        <Switch
          defaultChecked={schemaProps.keyboard}
          onChange={(val) => {
            setProps({
              id,
              props: 'keyboard',
              value: val,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-select">
        <Text strong>下划线展示</Text>
        <Switch
          defaultChecked={schemaProps.underline}
          onChange={(val) => {
            setProps({
              id,
              props: 'underline',
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
            { label: '次要', value: 'secondary' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
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
      <Flex className="wp-single-line wp-input">
        <Text strong>内容</Text>
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

export const text: BaseComponent<typeof Text, TextProps> = {
  name: 'text',
  label: '文本',
  component: Text,
  example: <Text>文本展示</Text>,
  variables: {},
  states: {},
  userEvents: {},
  configPanel: TextConfig,
  defaultSchema: {
    componentNames: 'text',
    props: {
      children: '文本展示',
    },
    title: '文本',
    children: null,
    userEvents: {
      onClick: [],
    },
  },
};
