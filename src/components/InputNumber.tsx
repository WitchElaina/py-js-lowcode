import {
  InputNumberProps,
  Flex,
  Typography,
  Switch,
  Select,
  InputNumber,
  Input,
  Slider,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface CustomInputNumberProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
  variant: 'outlined' | 'filled' | 'borderless';
  size: 'default' | 'large' | 'small';
  max: number;
  min: number;
  step: number;
}

// eslint-disable-next-line react-refresh/only-export-components
const Comp = (props: CustomInputNumberProps) => {
  return (
    <Flex
      vertical
      gap={0}
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <Flex align="center" gap={4}>
        <Text strong style={{ width: '100%' }}>
          {props.title}
        </Text>
        <InputNumber
          {...props}
          style={{
            width: 'max-content',
          }}
        />
      </Flex>
      <Slider {...props} />
    </Flex>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const InputNumberConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<InputNumberProps>;
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
        <Text strong>最大值</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.max as string}
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
          defaultValue={schemaProps.min as string}
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
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.step as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'step',
              value: e.target.value,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

export const inputNumber: BaseComponent<typeof InputNumber, InputNumberProps> =
  {
    name: 'inputNumber',
    label: '数字输入框',
    component: Comp,
    example: <InputNumber placeholder="请输入数字" style={{ width: '100%' }} />,
    configPanel: InputNumberConfig,
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
          value: e,
        });
      },
    },
    defaultSchema: {
      componentNames: 'inputNumber',
      props: {
        placeholder: '请输入数字',
        style: {
          width: '100%',
        },
      },
      title: '数字输入框',
      children: null,
      voidElementTag: true,
    },
  };
