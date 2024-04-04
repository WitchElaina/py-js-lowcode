import {
  Checkbox,
  Radio,
  Select,
  Slider,
  Switch,
  Image,
  CheckboxProps,
  RadioProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  ImageProps,
} from 'antd';
import { button } from './Button';
import { flex } from './Flex';
import { input } from './Input';
import { inputNumber } from './InputNumber';
import { BaseComponent } from '../types/component';

const checkbox: BaseComponent<typeof Checkbox, CheckboxProps> = {
  name: 'checkbox',
  label: '多选框',
  component: Checkbox,
  example: <Checkbox>多选框</Checkbox>,
  variables: {},
  states: {},
  defaultSchema: {
    componentNames: 'checkbox',
    props: {
      children: '多选框',
    },
    title: '多选框',
    children: null,
  },
};

const radio: BaseComponent<typeof Radio, RadioProps> = {
  name: 'radio',
  label: '单选框',
  component: Radio,
  example: <Radio>单选框</Radio>,
  variables: {},
  states: {},
  defaultSchema: {
    componentNames: 'radio',
    props: {
      children: '单选框',
    },
    title: '单选框',
    children: null,
  },
};

const select: BaseComponent<typeof Select, SelectProps> = {
  name: 'select',
  label: '选择器',
  component: Select,
  example: <Select style={{ width: '100%' }} placeholder={'请选择选项'} />,
  variables: {},
  states: {},
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

const slider: BaseComponent<typeof Slider, SliderSingleProps> = {
  name: 'slider',
  label: '滑动输入条',
  component: Slider,
  example: <Slider />,
  variables: {},
  states: {},
  defaultSchema: {
    componentNames: 'slider',
    props: {},
    title: '滑动输入条',
    children: null,
    voidElementTag: true,
  },
};

const switcher: BaseComponent<typeof Switch, SwitchProps> = {
  name: 'switcher',
  label: '开关',
  component: Switch,
  example: <Switch />,
  variables: {},
  states: {},
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
    children: null,
    voidElementTag: true,
  },
};

const image: BaseComponent<typeof Image, ImageProps> = {
  name: 'image',
  label: '图片',
  component: Image,
  example: <Image src="/imageIcon.svg" />,
  variables: {},
  states: {},
  defaultSchema: {
    componentNames: 'image',
    props: {
      // src: 'https://www.loliapi.com/acg/pc/',
      src: '/imageIcon.svg',
      height: 100,
    },
    title: '图片',
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
