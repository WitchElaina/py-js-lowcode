import { Models } from '@rematch/core';
import { schema } from './schema';
import { designer } from './designer';
import { settings } from './settings';

export interface RootModel extends Models<RootModel> {
  schema: typeof schema;
  designer: typeof designer;
  settings: typeof settings;
}

export const models: RootModel = { schema, designer, settings };
