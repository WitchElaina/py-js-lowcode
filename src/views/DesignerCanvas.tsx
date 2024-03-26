import { Watermark } from 'antd';

export function DesignerCanvas() {
  return (
    <Watermark
      style={{
        width: '100%',
        height: '100%',
      }}
      content={['PyJs Lowcode', 'WitchElaina © 2024']}
    />
  );
}
