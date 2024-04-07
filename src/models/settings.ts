import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Setting } from '../types/settings';

const initialState: Setting = {
  pyAdapterHost: import.meta.env.VITE_PY_ADAPTER_HOST,
  pyAdapterPort: import.meta.env.VITE_PY_ADAPTER_PORT,
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
