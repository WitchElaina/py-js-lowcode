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

const { Header } = Layout;
const { Title } = Typography;

const { useToken } = theme;

function NavHeader() {
  const { token } = useToken();
  const schema = useSelector((state) => state.schema);

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
        <Button type="link" size="small">
          Python 适配器
          <Badge style={{ paddingLeft: '8px' }} status="success" />
        </Button>
        <Button type="link" size="small">
          设置
        </Button>
        <Upload customRequest={handleLoad} showUploadList={false}>
          <Button>加载工程文件</Button>
        </Upload>
        <Button onClick={handleSave}>保存工程文件</Button>
        <Button type="primary">预览页面</Button>
      </Space>
    </Header>
  );
}

export default NavHeader;
