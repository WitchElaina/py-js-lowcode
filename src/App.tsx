import { Layout } from 'antd';
import { Designer } from './layout/designer';
import NavHeader from './layout/header';

const { Content } = Layout;

function App() {
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
