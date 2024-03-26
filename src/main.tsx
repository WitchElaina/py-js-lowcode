import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import './base.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#64558f',
          colorInfo: '#64558f',
          colorSuccess: '#7dac6f',
          colorWarning: '#d9a130',
          colorError: '#b41d1e',
        },
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
