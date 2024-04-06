import { Image, ImageProps, Flex, Typography, InputNumber, Input } from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

// eslint-disable-next-line react-refresh/only-export-components
const ImageConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<ImageProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-input">
        <Text strong>地址</Text>
        <Input
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.src as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'src',
              value: e.target.value,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>宽度</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.width as number}
          onChange={(e) => {
            setProps({
              id,
              props: 'width',
              value: e,
            });
          }}
        />
      </Flex>
      <Flex className="wp-single-line wp-input">
        <Text strong>高度</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.height as number}
          onChange={(e) => {
            setProps({
              id,
              props: 'height',
              value: e,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

export const image: BaseComponent<typeof Image, ImageProps> = {
  name: 'image',
  label: '图片',
  component: Image,
  example: <Image src="/imageIcon.svg" />,
  configPanel: ImageConfig,
  variables: {},
  states: {
    src: '图片地址',
  },
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
