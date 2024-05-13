import { Image, ImageProps, Flex, Typography, InputNumber, Input } from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

interface LibraryProps {
  src: string[];
  index: number;
  width: number;
  height: number;
  onChangeIndex?: (index: number) => void;
  onChange?: (src: string[]) => void;
  style?: React.CSSProperties;
}

// eslint-disable-next-line react-refresh/only-export-components
const Library = (props: LibraryProps) => {
  const { src: srcFromProps, index, width, height, onChangeIndex } = props;

  const src = srcFromProps?.length ? srcFromProps : ['/imageIcon.svg'];

  return (
    <Flex vertical gap={20} style={{ ...props.style }}>
      <Image src={src[src?.length - 1]} width={width} height={height} />
      <Flex
        gap={10}
        justify="center"
        style={{
          width: '100%',
        }}
      >
        {src.map((item, i) => (
          <Image
            key={`library-prev-${i}`}
            src={item}
            width={25}
            height={25}
            preview={false}
            onClick={() => {
              onChangeIndex?.(i);
            }}
            style={{
              cursor: 'pointer',
              boxSizing: 'border-box',
              border: i === index ? '2px solid #1890ff' : 'none',
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const LibraryConfig = (props: { schema: Schema }) => {
  const { schema } = props;

  const id = schema.id as string;
  const schemaProps = schema.props as CombineProps<LibraryProps>;
  const setProps = store.dispatch.schema.changePropsById;

  return (
    <Flex vertical gap={0} className="config-wrapper">
      <Flex className="wp-single-line wp-input">
        <Text strong>当前预览位置</Text>
        <InputNumber
          style={{ width: '50%' }}
          variant="filled"
          defaultValue={schemaProps.index as string}
          onChange={(e) => {
            setProps({
              id,
              props: 'index',
              value: e,
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

export const library: BaseComponent<typeof Library, LibraryProps> = {
  name: 'library',
  label: '图库',
  component: Library,
  example: <Image src="/imageIcon.svg" />,
  configPanel: LibraryConfig,
  variables: {},
  states: {
    src: '图片地址数组',
  },
  defaultSchema: {
    componentNames: 'library',
    props: {
      src: [],
      index: 0,
      height: 100,
    },
    title: '图片',
    children: null,
    voidElementTag: true,
  },
  defaultEvents: {
    onChangeIndex: (e, id) => {
      store.dispatch.schema.changePropsById({
        id,
        props: 'index',
        value: e,
      });
    },
    onChange: (e, id) => {
      store.dispatch.schema.changePropsById({
        id,
        props: 'src',
        value: e,
      });
    },
  },
};
