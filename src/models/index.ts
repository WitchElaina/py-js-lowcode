import { Models } from '@rematch/core';
import { schema } from './schema';

export interface RootModel extends Models<RootModel> {
  schema: typeof schema;
}

export const models: RootModel = { schema };
