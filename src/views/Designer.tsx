import { theme } from 'antd';
import { RenderDesigner } from '../utils/render';
import { store } from '../store';
import { useSelector } from 'react-redux';
import { Schema } from '../types/schema';

const { useToken } = theme;

interface DesignerScreenProps {
  width: number;
  height: number;
}

export function DesignerScreen(props: DesignerScreenProps) {
  const { width, height } = props;
  const { token } = useToken();

  const schema = useSelector<{ schema: Schema }, Schema>(
    (state) => state.schema,
  );
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
