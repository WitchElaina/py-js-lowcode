import { Modal, Input, Flex, Typography, InputNumber } from 'antd';
import { store } from '../store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const { Text } = Typography;

export interface SettingModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export function SettingModal(props: SettingModalProps) {
  const { isOpen, setIsOpen } = props;
  const settings = useSelector((state) => state.settings);
  const [host, setHost] = useState(settings.pyAdapterHost);
  const [port, setPort] = useState(settings.pyAdapterPort);

  return (
    <Modal
      title="设置"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => {
        store.dispatch.settings.setPyAdapterHost(host);
        store.dispatch.settings.setPyAdapterPort(port);
        setIsOpen(false);
      }}
    >
      <Flex vertical gap={10}>
        <Flex align="center" gap={12}>
          <Text
            style={{
              flexShrink: 0,
            }}
          >
            Python 适配器地址
          </Text>
          <Input value={host} onChange={(e) => setHost(e.target.value)} />
        </Flex>
        <Flex align="center" gap={12}>
          <Text
            style={{
              flexShrink: 0,
            }}
          >
            Python 适配器端口
          </Text>
          <InputNumber
            value={port}
            onChange={setPort}
            style={{
              flexGrow: 1,
            }}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
