import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Flex, InputNumber, Segmented, Typography } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

interface DesingerSegmentedProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
}

export function DesingerSegmented(props: DesingerSegmentedProps) {
  const { width, height, onWidthChange, onHeightChange } = props;
  const [showCustom, setShowCustom] = useState(false);

  const changeToPC = () => {
    onWidthChange(1100);
    onHeightChange(700);
  };

  const changeToPad = () => {
    onWidthChange(1024);
    onHeightChange(668);
  };

  const changeToPhone = () => {
    onWidthChange(375);
    onHeightChange(667);
  };

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
              changeToPC();
            } else if (value === 'Pad') {
              changeToPad();
            } else if (value === 'Phone') {
              changeToPhone();
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
