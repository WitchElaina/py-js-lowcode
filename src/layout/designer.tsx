import { Col, Flex } from 'antd';
import { ComponentLibrary } from '../views/ComponentLibrary';
import { ConfigPanel } from '../views/ConfigPanel';
import { DesignerCanvas } from '../views/DesignerCanvas';
import { DesignerScreen } from '../views/Designer';
import { DesingerSegmented } from '../views/DesingerSegmented';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

export function Designer() {
  const width = useSelector<RootState, number>((state) => state.designer.width);
  const height = useSelector<RootState, number>(
    (state) => state.designer.height,
  );

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
