import { Col, Flex, Typography } from 'antd';
import { ComponentLibrary } from '../views/ComponentLibrary';
import { ConfigPanel } from '../views/ConfigPanel';
import { DesignerCanvas } from '../views/DesignerCanvas';

export function Designer() {
  const { Title } = Typography;

  return (
    <Flex style={{ height: '100%' }}>
      <Col span={4}>
        <ComponentLibrary />
      </Col>
      <Col
        span={15}
        style={{
          minWidth: '600px',
        }}
      >
        <DesignerCanvas />
      </Col>
      <Col span={5}>
        <ConfigPanel />
      </Col>
    </Flex>
  );
}
