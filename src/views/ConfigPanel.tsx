import { ConfigProvider, Tabs, theme } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { useSelector } from 'react-redux';

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
          defaultActiveKey="1"
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
              children: <>{schema.children?.length}</>,
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
