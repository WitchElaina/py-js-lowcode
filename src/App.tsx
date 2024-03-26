import { Layout, theme, Typography } from 'antd';
import { Designer } from './layout/designer';
import NavHeader from './layout/header';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const { useToken } = theme;

function App() {
  const { token } = useToken();

  return (
    <Layout>
      <NavHeader />
      <Content
        style={{
          height: 'calc(100vh - 64px)',
        }}
      >
        <Designer />
      </Content>
    </Layout>
  );
}

export default App;
