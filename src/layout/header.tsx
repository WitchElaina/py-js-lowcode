import {
  Button,
  Flex,
  Layout,
  Space,
  theme,
  Typography,
  Badge,
  Upload,
} from 'antd';
import { store } from '../store';
import { useSelector } from 'react-redux';
import { SettingModal } from '../views/Setting';
import { useCallback, useState } from 'react';
import { useRequests } from '../utils/requests';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title, Text } = Typography;

const { useToken } = theme;

function NavHeader(props) {
  const calcTime = useCallback((sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec - hours * 3600) / 60);
    const seconds = sec - hours * 3600 - minutes * 60;
    return `${minutes} 小时 ${seconds} 分钟`;
  }, []);

  const sec = calcTime(props.sec);

  const navigate = useNavigate();

  const { token } = useToken();
  const schema = useSelector((state) => state.schema);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const { getFuncList } = useRequests();

  const { data, error } = useRequest(getFuncList, {
    pollingInterval: import.meta.env.VITE_HEARTBEAT_INTERVAL || 5000,
  });

  const handleLoad = (info) => {
    const fileReader = new FileReader();
    console.log(info);
    fileReader.onload = (e) => {
      console.log(e.target.result);
      store.dispatch.schema.loadSchemaJson({
        schemaJson: e?.target?.result || '{}',
      });
    };
    fileReader.readAsText(info.file);
  };

  const handleSave = () => {
    const schemaJson = JSON.stringify(schema);
    const blob = new Blob([schemaJson], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Header
      style={{
        display: 'flex',
        padding: '0 16px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: token.colorBgBase,
        boxShadow: token.boxShadowTertiary,
        userSelect: 'none',
      }}
    >
      <Flex gap={8} align="center">
        <img
          src="logo.svg"
          alt="logo"
          style={{ height: 45 }}
          draggable={false}
        />
        <Title level={4} style={{ color: token.colorTextBase, margin: 0 }}>
          低代码平台
        </Title>
      </Flex>

      <Space>
        <Text type="warning">测试模式，当前项目开发时间：{sec}</Text>
        <Text type="secondary">
          Python 适配器连接状态
          <Badge
            style={{ paddingLeft: '8px' }}
            status={error ? 'error' : 'success'}
          />
        </Text>
        <Button type="link" size="small" onClick={() => setIsSettingOpen(true)}>
          设置
        </Button>
        <Upload customRequest={handleLoad} showUploadList={false}>
          <Button>加载工程文件</Button>
        </Upload>
        <Button onClick={handleSave}>保存工程文件</Button>
        <Button type="primary" onClick={() => navigate('/preview')}>
          预览页面
        </Button>
        <Button>导出代码</Button>
      </Space>
      <SettingModal isOpen={isSettingOpen} setIsOpen={setIsSettingOpen} />
    </Header>
  );
}

export default NavHeader;
