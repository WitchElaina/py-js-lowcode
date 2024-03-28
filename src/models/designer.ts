import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Schema } from '../types/schema';
import { DesignerConfig } from '../types/designerConfig';

const initialState: DesignerConfig = {
  currentSelectedSchema: null,
  width: 1150,
  height: 700,
};

export const designer = createModel<RootModel>()({
  state: initialState,
  reducers: {
    // handle state changes with pure functions
    setCurSchema(state, schema: Schema) {
      return { ...state, currentSelectedSchema: schema };
    },
    setPCView(state) {
      return { ...state, width: 1150, height: 700 };
    },
    setTabletView(state) {
      return { ...state, width: 1000, height: 650 };
    },
    setMobileView(state) {
      return { ...state, width: 375, height: 667 };
    },
    setWidth(state, width: number) {
      return { ...state, width };
    },
    setHeight(state, height: number) {
      return { ...state, height };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
  }),
});
