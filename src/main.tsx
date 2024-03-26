import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import './base.css';

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
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
