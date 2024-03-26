import { Layout, theme, Typography } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const { useToken } = theme;

function App() {
  const { token } = useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: token.colorBgBase,
          boxShadow: token.boxShadowTertiary,
          gap: '10px',
          userSelect: 'none',
        }}
      >
        <img
          src="logo.svg"
          alt="logo"
          style={{ height: 45 }}
          draggable={false}
        />
        <Title level={4} style={{ color: token.colorTextBase, margin: 0 }}>
          低代码平台
        </Title>
      </Header>
      <Content
        style={{
          minHeight: 'calc(100vh - 64px)',
        }}
      ></Content>
    </Layout>
  );
}

export default App;
