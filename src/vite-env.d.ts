/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PY_ADAPTER_HOST: string;
  readonly VITE_PY_ADAPTER_PORT: string;
  readonly VITE_HEARTBEAT_INTERVAL: number;
  readonly VITE_WATERMARK_CONTENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
