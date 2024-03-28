import { Schema } from './schema';

export interface DesignerConfig {
  currentSelectedSchema: Schema | null;
  width: number;
  height: number;
}
