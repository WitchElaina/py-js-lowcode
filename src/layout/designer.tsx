import { Col, Flex, Typography } from 'antd';
import { ComponentLibrary } from '../views/ComponentLibrary';
import { ConfigPanel } from '../views/ConfigPanel';
import { DesignerCanvas } from '../views/DesignerCanvas';
import { DesignerScreen } from '../views/Designer';
import { DesingerSegmented } from '../views/DesingerSegmented';

import { useSelector } from 'react-redux';

export function Designer() {
  const { Title } = Typography;

  const width = useSelector((state) => state.designer.width);
  const height = useSelector((state) => state.designer.height);

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
        <DesignerCanvas>
          <DesingerSegmented />
          <DesignerScreen width={width} height={height} />
        </DesignerCanvas>
      </Col>
      <Col span={5} style={{ height: '100%' }}>
        <ConfigPanel />
      </Col>
    </Flex>
  );
}
