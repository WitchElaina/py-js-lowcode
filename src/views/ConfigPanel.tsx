import { Tabs, theme } from 'antd';

export function ConfigPanel() {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      style={{
        background: token.colorBgBase,
        border: `1px solid ${token.colorBorderSecondary}`,
        height: '100%',
      }}
    >
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="属性" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="事件" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}
