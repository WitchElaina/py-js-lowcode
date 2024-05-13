import {
  Image,
  ImageProps,
  Flex,
  Typography,
  InputNumber,
  Input,
  Avatar,
} from 'antd';
import { BaseComponent, CombineProps } from '../types/component';
import { Schema } from '../types/schema';
import { store } from '../store';

const { Text } = Typography;

interface ChatListProps {
  content: {
    role: string;
    content: string;
  }[];
}

// eslint-disable-next-line react-refresh/only-export-components
// const ChatListConfig = (props: { schema: Schema }) => {
//   const { schema } = props;

//   const id = schema.id as string;
//   const schemaProps = schema.props as CombineProps<ChatListProps>;
//   const setProps = store.dispatch.schema.changePropsById;

//   return (
//     <Flex vertical gap={0} className="config-wrapper">
//       <Flex className="wp-single-line wp-input">
//         <Text strong>地址</Text>
//         <Input
//           style={{ width: '50%' }}
//           variant="filled"
//           defaultValue={schemaProps.src as string}
//           onChange={(e) => {
//             setProps({
//               id,
//               props: 'src',
//               value: e.target.value,
//             });
//           }}
//         />
//       </Flex>
//     </Flex>
//   );
// };

const ChatListConfig = () => <></>;

const ChatList: React.FC<ChatListProps> = (props) => {
  const { content: contentFromProps } = props;

  let content = contentFromProps;
  if (!content || content.length === 0)
    content = [
      { role: 'User', content: '示例对话内容' },
      { role: 'Assistant', content: '示例对话内容' },
    ];

  return (
    <Flex
      vertical
      style={{
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      {content.map((item, index) => {
        return (
          <Flex key={`chatList-${index}`} vertical gap={8}>
            <Flex align="center" gap={8}>
              <Avatar>{item.role.split('')[0].toUpperCase()}</Avatar>
              <Text strong>{item.role}</Text>
            </Flex>
            <Text
              style={{
                width: '100%',
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
                paddingLeft: 40,
                marginBottom: 16,
              }}
            >
              {item.content}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

const defaultChatListProps: ChatListProps = {
  content: [
    {
      role: 'User',
      content: '---',
    },
    {
      role: 'Assistant',
      content: '---',
    },
  ],
};

export const chatList: BaseComponent<typeof ChatList, ChatListProps> = {
  name: 'chatList',
  label: '对话列表',
  component: ChatList,
  example: <ChatList {...defaultChatListProps} />,
  configPanel: ChatListConfig,
  variables: {
    content: '对话内容',
  },
  states: {
    content: '对话内容',
  },
  defaultSchema: {
    componentNames: 'chatList',
    props: {
      content: [],
    },
    title: '对话列表',
    children: null,
    voidElementTag: true,
  },
};
