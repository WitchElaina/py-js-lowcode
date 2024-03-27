import { Col, Flex, Typography } from 'antd';
import { ComponentLibrary } from '../views/ComponentLibrary';
import { ConfigPanel } from '../views/ConfigPanel';
import { DesignerCanvas } from '../views/DesignerCanvas';
import { DesignerScreen } from '../views/Designer';
import { useDesigner } from '../utils/useDesinger';
import { DesingerSegmented } from '../views/DesingerSegmented';

export function Designer() {
  const { Title } = Typography;
  const { width, height, setWidth, setHeight } = useDesigner();

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
          <DesingerSegmented
            width={width}
            height={height}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
          />
          <DesignerScreen width={width} height={height} />
        </DesignerCanvas>
      </Col>
      <Col span={5} style={{ height: '100%' }}>
        <ConfigPanel />
      </Col>
    </Flex>
  );
}
