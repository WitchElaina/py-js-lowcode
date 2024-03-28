import immerPlugin from '@rematch/immer';
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';

export const store = init({
  models,
  plugins: [immerPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
