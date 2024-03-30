import {
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  Image,
  InputProps,
  CheckboxProps,
  RadioProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  ImageProps,
} from 'antd';
import { button } from './Button';
import { flex } from './Flex';
import { BaseComponent } from '../types/component';

const input: BaseComponent<typeof Input, InputProps> = {
  name: 'input',
  label: '输入框',
  component: Input,
  example: <Input placeholder="请输入" />,
  variables: [
    {
      name: 'placeholder',
      label: '占位符',
    },
    {
      name: 'prefix',
      label: '前缀',
    },
    {
      name: 'suffix',
      label: '后缀',
    },
  ],
  states: ['value'],
  defaultSchema: {
    componentNames: 'input',
    props: {
      placeholder: '请输入',
    },
    title: '输入框',
    children: null,
    voidElementTag: true,
  },
};

const checkbox: BaseComponent<typeof Checkbox, CheckboxProps> = {
  name: 'checkbox',
  label: '多选框',
  component: Checkbox,
  example: <Checkbox>多选框</Checkbox>,
  variables: [],
  states: ['checked'],
  defaultSchema: {
    componentNames: 'checkbox',
    props: {
      children: '多选框',
    },
    title: '多选框',
    children: null,
  },
};

const inputNumber: BaseComponent<typeof InputNumber, InputProps> = {
  name: 'inputNumber',
  label: '数字输入框',
  component: InputNumber,
  example: <InputNumber placeholder="请输入数字" style={{ width: '100%' }} />,
  variables: [],
  states: ['value'],
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

const radio: BaseComponent<typeof Radio, RadioProps> = {
  name: 'radio',
  label: '单选框',
  component: Radio,
  example: <Radio>单选框</Radio>,
  variables: [],
  states: ['checked'],
  defaultSchema: {
    componentNames: 'radio',
    props: {
      children: '单选框',
    },
    title: '单选框',
    states: {},
    children: null,
  },
};

const select: BaseComponent<typeof Select, SelectProps> = {
  name: 'select',
  label: '选择器',
  component: Select,
  example: <Select style={{ width: '100%' }} placeholder={'请选择选项'} />,
  variables: [],
  states: ['value'],
  defaultSchema: {
    componentNames: 'select',
    props: {
      style: {
        width: '100%',
      },
      placeholder: '请选择选项',
    },
    title: '选择器',
    states: {},
    children: null,
    voidElementTag: true,
  },
};

const slider: BaseComponent<typeof Slider, SliderSingleProps> = {
  name: 'slider',
  label: '滑动输入条',
  component: Slider,
  example: <Slider />,
  variables: [],
  states: ['value'],
  defaultSchema: {
    componentNames: 'slider',
    props: {},
    title: '滑动输入条',
    states: {},
    children: null,
    voidElementTag: true,
  },
};

const switcher: BaseComponent<typeof Switch, SwitchProps> = {
  name: 'switcher',
  label: '开关',
  component: Switch,
  example: <Switch />,
  variables: [],
  states: ['checked'],
  defaultSchema: {
    componentNames: 'switcher',
    props: {
      style: {
        width: 'fit-content',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    title: '开关',
    states: {},
    children: null,
    voidElementTag: true,
  },
};

const image: BaseComponent<typeof Image, ImageProps> = {
  name: 'image',
  label: '图片',
  component: Image,
  example: <Image src="/imageIcon.svg" />,
  variables: [],
  states: ['src'],
  defaultSchema: {
    componentNames: 'image',
    props: {
      // src: 'https://www.loliapi.com/acg/pc/',
      src: '/imageIcon.svg',
      height: 100,
    },
    title: '图片',
    states: {},
    children: null,
    voidElementTag: true,
  },
};

export const components = {
  button,
  input,
  checkbox,
  inputNumber,
  radio,
  select,
  slider,
  switcher,
  image,
  flex,
};
