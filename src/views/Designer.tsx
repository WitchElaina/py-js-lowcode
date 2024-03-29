import { theme } from 'antd';
import { useDrop } from 'react-dnd';
import { RenderDesigner } from '../utils/render';
import { store } from '../store';
import { useSelector } from 'react-redux';

const { useToken } = theme;

const DroppableArea = (props: {
  onDrop: (any) => void;
  accept: string;
  customStyle?: React.CSSProperties;
  outsideText: string;
  overText: string;
}) => {
  const { token } = useToken();
  const { onDrop, accept, outsideText, overText, customStyle } = props;
  const [collectedProps, drop] = useDrop({
    accept,
    drop: (item) => {
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
        // width: '100%',
        // height: '100%',
        display: collectedProps.canDrop ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        color: token.colorTextPlaceholder,
        backgroundColor: token.colorBgBase,
        // opacity: collectedProps.canDrop ? 1 : 0,
        border: collectedProps.isOver
          ? `2px dashed ${token.colorPrimary}`
          : '2px dashed transparent',
        ...customStyle,
      }}
    >
      {collectedProps.isOver ? overText : outsideText}
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

  const schema = useSelector((state) => state.schema);
  // const schema = store.getState().schema;
  const append = store.dispatch.schema.append;
  const appendExist = store.dispatch.schema.appendExist;
  const swapSchema = store.dispatch.schema.swapSchema;
  const onClickCallback = store.dispatch.designer.setCurSchema;

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
          overflow: 'auto',
        }}
      >
        <RenderDesigner
          schema={schema}
          appendSchema={append}
          appendExistSchema={appendExist}
          swapSchema={swapSchema}
          onClickCallback={onClickCallback}
        />
      </div>
    </div>
  );
}
