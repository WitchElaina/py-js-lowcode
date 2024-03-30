import { Card, Flex, List, Typography, theme } from 'antd';
import { components } from '../components';
import { useDrag } from 'react-dnd';
import { BaseComponent } from '../types/component';

function DraggableComponentWrapper(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: BaseComponent<any, any>;
}) {
  const { component } = props;
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'component',
    item: { component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      isOver: monitor.getDropResult(),
    }),
  }));

  const { label, example } = component;

  return (
    <div
      ref={dragPreview}
      style={{
        opacity: isDragging ? 0.4 : 1,
        // border: isDragging ? '1px dashed #ccc' : 'none',
      }}
    >
      <Card
        title={label}
        style={{
          marginBottom: 16,
          margin: '2px',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={drag}
        size="small"
      >
        {example}
      </Card>
    </div>
  );
}

export function ComponentLibrary() {
  const { Title } = Typography;
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <Flex
      vertical
      gap={8}
      style={{
        padding: 8,
        backgroundColor: token.colorBgElevated,
        border: `1px solid ${token.colorBorderSecondary}`,
        height: '100%',
      }}
      align="center"
    >
      <Title level={5} style={{ margin: '10px' }}>
        组件库
      </Title>
      <List
        grid={{ column: 2 }}
        dataSource={Object.values(components)}
        renderItem={(component) => (
          <DraggableComponentWrapper
            component={component}
            key={component.name}
          />
        )}
      />
    </Flex>
  );
}
