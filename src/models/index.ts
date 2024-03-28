import { Models } from '@rematch/core';
import { schema } from './schema';
import { designer } from './designer';

export interface RootModel extends Models<RootModel> {
  schema: typeof schema;
  designer: typeof designer;
}

export const models: RootModel = { schema, designer };
