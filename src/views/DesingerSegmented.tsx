import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Flex, InputNumber, Segmented, Typography } from 'antd';
import { useState } from 'react';
import { store } from '../store';
import { useSelector } from 'react-redux';

const { Text } = Typography;

export function DesingerSegmented() {
  const width = useSelector<{ designer: { width: number } }, number>(
    (state) => state.designer.width,
  );
  const height = useSelector<{ designer: { height: number } }, number>(
    (state) => state.designer.height,
  );
  const onWidthChange = store.dispatch.designer.setWidth;
  const onHeightChange = store.dispatch.designer.setHeight;
  const setPCView = store.dispatch.designer.setPCView;
  const setTabletView = store.dispatch.designer.setTabletView;
  const setMobileView = store.dispatch.designer.setMobileView;

  const [showCustom, setShowCustom] = useState(false);

  return (
    <Flex
      gap={10}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        margin: '10px',
        transition: 'all 0.1s',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemActiveBg: '#D4D2D7',
              itemColor: '#514276',
              itemSelectedColor: '#FFFFFF',
              itemSelectedBg: '#514276',
              trackBg: '#E4E2E7',
              itemHoverBg: '#E4E2E7',
              itemHoverColor: '#514276',
              motion: false,
            },
          },
        }}
      >
        <Segmented
          title="Device"
          options={[
            { value: 'PC', icon: <DesktopOutlined /> },
            { value: 'Pad', icon: <TabletOutlined rotate={-90} /> },
            { value: 'Phone', icon: <MobileOutlined /> },
            { value: 'Custom', icon: <EditOutlined /> },
          ]}
          onChange={(value) => {
            if (value === 'PC') {
              setPCView();
            } else if (value === 'Pad') {
              setTabletView();
            } else if (value === 'Phone') {
              setMobileView();
            }
            setShowCustom(value === 'Custom');
          }}
        />
      </ConfigProvider>
      {showCustom && (
        <Flex gap={10} align="center">
          <Text>Width</Text>
          <InputNumber
            size="small"
            min={100}
            max={2000}
            step={100}
            value={width}
            onChange={(value) => value && onWidthChange(value)}
          />
          <Text>Height</Text>
          <InputNumber
            size="small"
            min={100}
            max={2000}
            step={50}
            value={height}
            onChange={(value) => value && onHeightChange(value)}
          />
        </Flex>
      )}
    </Flex>
  );
}
