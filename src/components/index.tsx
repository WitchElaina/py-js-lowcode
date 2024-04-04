import {
  Slider,
  Switch,
  Image,
  SliderSingleProps,
  SwitchProps,
  ImageProps,
} from 'antd';
import { button } from './Button';
import { flex } from './Flex';
import { input } from './Input';
import { inputNumber } from './InputNumber';
import { select } from './Select';
import { radio } from './Radio';
import { checkbox } from './Checkbox';
import { BaseComponent } from '../types/component';

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
