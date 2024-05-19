import { useSelector } from 'react-redux';
import { Schema } from '../types/schema';
import { PreviewRender } from '../utils/previewRender';

export function PreviewScreen() {
  const schema = useSelector<{ schema: Schema }, Schema>(
    (state) => state.schema,
  );

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <PreviewRender schema={schema} />
    </div>
  );
}
