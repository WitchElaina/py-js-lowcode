import { Image, ImageProps } from 'antd';
import { button } from './Button';
import { flex } from './Flex';
import { input } from './Input';
import { inputNumber } from './InputNumber';
import { select } from './Select';
import { radio } from './Radio';
import { checkbox } from './Checkbox';
import { slider } from './Slider';
import { switcher } from './Switch';
import { BaseComponent } from '../types/component';

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
