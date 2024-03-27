import { Col, Flex, Typography } from 'antd';
import { ComponentLibrary } from '../views/ComponentLibrary';
import { ConfigPanel } from '../views/ConfigPanel';
import { DesignerCanvas } from '../views/DesignerCanvas';
import { DesignerScreen } from '../views/Designer';
import { useDesigner } from '../utils/useDesinger';
import { DesingerSegmented } from '../views/DesingerSegmented';

export function Designer() {
  const { Title } = Typography;
  const { width, height, scale, setWidth, setHeight, setScale } = useDesigner();

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
            scale={scale}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
            onScaleChange={setScale}
          />
          <DesignerScreen width={width} height={height} scale={scale} />
        </DesignerCanvas>
      </Col>
      <Col span={5}>
        <ConfigPanel />
      </Col>
    </Flex>
  );
}
