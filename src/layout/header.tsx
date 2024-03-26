import { Button, Flex, Layout, Space, theme, Typography, Badge } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const { useToken } = theme;

function NavHeader() {
  const { token } = useToken();

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
        <Button>加载工程文件</Button>
        <Button>保存工程文件</Button>
        <Button type="primary">预览页面</Button>
      </Space>
    </Header>
  );
}

export default NavHeader;
