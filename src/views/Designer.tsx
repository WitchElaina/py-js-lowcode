import { Flex, theme } from 'antd';
import { useDrop } from 'react-dnd';
import { useSchema } from '../utils/useSchema';
import { Schema } from '../types/schema';
import { useCallback, useEffect, useState, ReactNode } from 'react';
import { RenderDesigner } from '../utils/render';

const { useToken } = theme;

const DroppableArea = (onDrop) => {
  const { token } = useToken();
  const [collectedProps, drop] = useDrop({
    accept: 'component',
    drop: (item, monitor) => {
      console.log('drop', item, monitor);
      onDrop(item);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        color: token.colorTextPlaceholder,
        backgroundColor: token.colorBgBase,
        opacity: collectedProps.canDrop ? 1 : 0,
        border: collectedProps.isOver
          ? `2px dashed ${token.colorPrimary}`
          : '2px dashed transparent',
      }}
    >
      {collectedProps.isOver ? '松开以添加' : '可拖拽组件到此处'}
    </div>
  );
};

interface DesignerScreenProps {
  width: number;
  height: number;
}

export function DesignerScreen(props: DesignerScreenProps) {
  const { width, height } = props;
  const { token } = useToken();

  const [globalSchema, setGlobalSchema] = useSchema();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          zIndex: 10,
          backgroundColor: token.colorBgBase,
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          margin: '60px auto',
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
          transition: 'all 0.3s',
        }}
      >
        <RenderDesigner
          schema={globalSchema as Schema}
          setSchema={setGlobalSchema}
          createBlackNode={DroppableArea}
        />
      </div>
    </div>
  );
}
