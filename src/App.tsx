import { Layout } from 'antd';
import { Designer } from './layout/designer';
import NavHeader from './layout/header';
import { useTimer } from 'react-use-precision-timer';
import { useCallback, useEffect, useState } from 'react';

const { Content } = Layout;

function App() {
  const [sec, setSec] = useState(0);
  const callback = useCallback(() => {
    setSec((prev) => prev + 1);
  }, []);
  // The callback will be called every 1000 milliseconds.
  const timer = useTimer({ delay: 60000000 }, callback);

  useEffect(() => {
    timer.start();
  }, [timer]);

  return (
    <Layout>
      <NavHeader sec={sec} />
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
