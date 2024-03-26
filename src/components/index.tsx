import {
  Button,
  Input,
  Checkbox,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  Image,
} from 'antd';
import { BaseComponent } from '../types/component';

const button: BaseComponent<typeof Button> = {
  name: 'button',
  label: '按钮',
  component: Button,
  example: <Button block>按钮</Button>,
};

const input: BaseComponent<typeof Input> = {
  name: 'input',
  label: '输入框',
  component: Input,
  example: <Input placeholder="请输入" />,
  variables: {
    value: {
      name: 'value',
      label: '值',
    },
  },
};

const checkbox: BaseComponent<typeof Checkbox> = {
  name: 'checkbox',
  label: '多选框',
  component: Checkbox,
  example: <Checkbox>多选框</Checkbox>,
  variables: {
    checked: {
      name: 'checked',
      label: '是否选中',
    },
  },
};

const inputNumber: BaseComponent<typeof InputNumber> = {
  name: 'inputNumber',
  label: '数字输入框',
  component: InputNumber,
  example: <InputNumber placeholder="请输入数字" style={{ width: '100%' }} />,
  variables: {
    value: {
      name: 'value',
      label: '值',
    },
  },
};

const radio: BaseComponent<typeof Radio> = {
  name: 'radio',
  label: '单选框',
  component: Radio,
  example: <Radio>单选框</Radio>,
  variables: {
    value: {
      name: 'value',
      label: '值',
    },
  },
};

const select: BaseComponent<typeof Select> = {
  name: 'select',
  label: '选择器',
  component: Select,
  example: <Select style={{ width: '100%' }} placeholder={'请选择选项'} />,
  variables: {
    value: {
      name: 'value',
      label: '值',
    },
  },
};

const slider: BaseComponent<typeof Slider> = {
  name: 'slider',
  label: '滑动输入条',
  component: Slider,
  example: <Slider />,
  variables: {
    value: {
      name: 'value',
      label: '值',
    },
  },
};

const switchComponent: BaseComponent<typeof Switch> = {
  name: 'switch',
  label: '开关',
  component: Switch,
  example: <Switch />,
  variables: {
    checked: {
      name: 'checked',
      label: '是否选中',
    },
  },
};

const image: BaseComponent<typeof Image> = {
  name: 'image',
  label: '图片',
  component: Image,
  example: <Image src="/imageIcon.svg" />,
  variables: {
    src: {
      name: 'src',
      label: '图片地址',
    },
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
  switch: switchComponent,
  image,
};
