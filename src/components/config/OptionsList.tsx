import { useControllableValue, useDynamicList } from 'ahooks';
import { useEffect, useState } from 'react';
import { Typography, Input, Button, Flex, Switch, Form } from 'antd';
import {
  UpCircleOutlined,
  DownCircleOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

export interface OptionsListProps {
  label: string;
  defaultValue: Record<string, any>[];
  onChange: (val: any) => void;
}

export const OptionsList: React.FC<OptionsListProps> = ({
  label,
  defaultValue,
  onChange,
}) => {
  const { list, remove, getKey, move, push, replace } = useDynamicList([
    ...defaultValue,
  ]);
  const [customLabel, setCustomLabel] = useState(false);

  const Row: React.FC<{
    index: number;
    defaultValue: { label: string; value: string };
  }> = (props) => {
    const { index, defaultValue } = props;

    const [val, setVal] = useState(defaultValue.value);
    const [label, setLabel] = useState(defaultValue.label);
    // const [val, setVal] = useControllableValue({
    //   value: value.value,
    //   defaultValue: defaultValue.value,
    // });

    return (
      <Flex gap={5} align="center">
        <Text
          type="secondary"
          style={{
            flexShrink: 0,
            paddingRight: 5,
          }}
        >
          {index + 1}
        </Text>
        {customLabel && (
          <>
            <Text
              style={{
                flexShrink: 0,
              }}
            >
              标签
            </Text>

            <Input
              variant="filled"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
              onBlur={() => {
                console.log(`[label]Replace ${index}`, {
                  label: label,
                  value: val,
                });
                replace(index, { label: label, value: val });
              }}
            />
          </>
        )}
        {customLabel && (
          <Text
            style={{
              flexShrink: 0,
            }}
          >
            值
          </Text>
        )}
        <Input
          variant="filled"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (!customLabel) {
              setLabel(e.target.value);
            }
          }}
          onBlur={() => {
            console.log(`[val]Replace ${index}`, { label: label, value: val });
            replace(index, { label: label, value: val });
          }}
        />
        <Button
          onClick={() => remove(index)}
          icon={<CloseCircleOutlined />}
          type="text"
          // size="small"
        />
        <Button
          // size="small"
          onClick={() => move(index, index - 1)}
          icon={<UpCircleOutlined />}
          type="text"
          disabled={index === 0}
        />
        <Button
          // size="small"
          onClick={() => move(index, index + 1)}
          icon={<DownCircleOutlined />}
          type="text"
          disabled={index === list.length - 1}
        />
      </Flex>
    );
  };

  return (
    <Flex className="wp-multi-line" vertical gap={10} style={{}}>
      <Flex align="center" justify="space-between">
        <Typography.Text strong>{label}</Typography.Text>
        <Flex gap={8} align="center">
          <Flex gap={4} align="center">
            <Text
              style={{
                fontSize: 12,
              }}
            >
              自定标签
            </Text>
            <Switch onChange={setCustomLabel} size="small" />
          </Flex>
          <Button
            size="small"
            onClick={() => {
              // check if same value
              const sameCheck = [];

              list.forEach((item) => {
                if (sameCheck.includes(item.value)) {
                  console.error('Same value detected');
                  return;
                }
                sameCheck.push(item.value);
              });

              if (sameCheck.length < list.length) {
                console.error('wont save');
                return;
              }

              if (!customLabel) {
                const newList = list.map((item, index) => {
                  return {
                    label: item.value,
                    value: item.value,
                  };
                });
                return onChange(newList);
              }
              onChange(list);
            }}
          >
            保存
          </Button>
        </Flex>
      </Flex>

      {list.map((_, index) => (
        <Row key={getKey(index)} index={index} defaultValue={list[index]} />
      ))}
      <Button
        onClick={() => push({ label: '', value: '' })}
        icon={<PlusCircleOutlined />}
        type="text"
        block
      >
        添加选项
      </Button>
    </Flex>
  );
};
