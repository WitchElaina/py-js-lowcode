import {
  ConfigProvider,
  Tabs,
  theme,
  Empty,
  Typography,
  Flex,
  Input,
  Divider,
} from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux';
import { Schema } from '../types/schema';
import { components } from '../components';
import { getSchemaById } from '../utils/schemaTools';
import { store } from '../store';

const { Text, Title } = Typography;

const PropsPanel = () => {
  const curSchema: Schema = useSelector(
    (state) => state.designer.currentSelectedSchema,
  );
  if (!curSchema) return null;

  const Config = components[curSchema.componentNames]?.configPanel;

  return curSchema ? (
    Config ? (
      <Flex
        vertical
        gap={8}
        style={{
          padding: 16,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          {curSchema.title}
        </Title>
        <Text code>{curSchema.id}</Text>
        <Divider style={{ margin: '10px 0' }} />
        <Config schema={curSchema} key={curSchema.id} />
      </Flex>
    ) : (
      <Empty style={{ marginTop: 50 }} description={'该组件没有可配置属性'} />
    )
  ) : (
    <Empty style={{ marginTop: 50 }} description={'请先在左侧选择组件'} />
  );
};

export function ConfigPanel() {
  const { useToken } = theme;
  const { token } = useToken();

  const schema = useSelector((state) => state.schema);

  return (
    <div
      style={{
        background: token.colorBgBase,
        border: `1px solid ${token.colorBorderSecondary}`,
        height: '100%',
        width: '100%',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              horizontalMargin: '0',
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="2"
          centered
          items={[
            {
              key: '1',
              label: '结构',
              children: (
                <MonacoEditor
                  height={800}
                  width={'100%'}
                  language="json"
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                  }}
                  value={JSON.stringify(schema, null, 2)}
                />
              ),
            },
            {
              key: '2',
              label: '属性',
              children: <PropsPanel />,
            },
            {
              key: '3',
              label: '事件',
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
}
