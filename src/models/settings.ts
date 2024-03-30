import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Setting } from '../types/settings';

const initialState: Setting = {
  pyAdapterHost: 'localhost',
  pyAdapterPort: '6001',
};

export const settings = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setPyAdapterHost(state, pyAdapterHost: string) {
      return { ...state, pyAdapterHost };
    },
    setPyAdapterPort(state, pyAdapterPort: string) {
      return { ...state, pyAdapterPort };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
  }),
});
