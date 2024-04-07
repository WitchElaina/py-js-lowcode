import { Watermark } from 'antd';
import { ReactNode } from 'react';

export function DesignerCanvas(props: { children: ReactNode }) {
  return (
    <Watermark
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      content={import.meta.env.VITE_WATERMARK_CONTENT.split(',')}
    >
      {props.children}
    </Watermark>
  );
}
