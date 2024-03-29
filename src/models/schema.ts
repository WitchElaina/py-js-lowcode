import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Schema } from '../types/schema';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { getParentSchemaById, getSchemaById } from '../utils/schemaTools';

const defaultSchema: Schema = {
  id: 'flex-' + uuidv4(),
  componentNames: 'flex',
  props: {
    style: {
      width: '100%',
      height: '100%',
      padding: 16,
    },
    vertical: true,
  },
  title: '设计器',
  states: {},
  children: [
    {
      id: 'button-' + uuidv4(),
      componentNames: 'button',
      props: {
        block: true,
        children: 'Block 按钮',
      },
      title: '按钮',
      states: {},
      children: null,
    },
  ],
};

export const schema = createModel<RootModel>()({
  state: defaultSchema,
  reducers: {
    // handle state changes with pure functions
    append(state, payload: { schemaToAppend: Schema; parentId: string }) {
      const { schemaToAppend: schemaToAppendOriginal, parentId } = payload;

      // deep copy schemaToAppend
      const schemaToAppend = cloneDeep(schemaToAppendOriginal);

      console.log(`Append ${schemaToAppend.id} -> ${parentId}`, schemaToAppend);
      // Generate a UUID for the new schema

      schemaToAppend.id = schemaToAppend.componentNames + '-' + uuidv4();
      // Find the parent schema by id

      // shallowCopy [rewrite by immerPlugin below]
      // const parentSchema = { ...state };

      // use ImmerPlugin instead to avoid copying
      const parentSchema = state;

      const parent = getSchemaById(parentId, parentSchema);
      console.log(
        'parent',
        parent.componentNames,
        schemaToAppend.componentNames,
      );

      // Add the new schema to the parent schema
      if (Array.isArray(parent.children)) {
        parent.children.push(schemaToAppend);
      }
      console.log(state, parentSchema, parent);

      // Update the global schema
      return parentSchema;
    },
    appendExist(state, payload: { schemaToAppend: Schema; parentId: string }) {
      const { schemaToAppend: schemaToAppendOriginal, parentId } = payload;

      // check if parentId exists and its children is Array
      const parentSchema = state;
      const parent = getSchemaById(parentId, state);
      if (!Array.isArray(parent.children)) {
        return state;
      }

      // copy schemaToAppend as a new id
      const schemaToAppend = cloneDeep(schemaToAppendOriginal);
      const idTemp = schemaToAppend.id;
      schemaToAppend.id = 'temp-schema';

      // append the new schema to the parent schema
      parent.children.push(schemaToAppend);

      // delete the old schema
      const originalParent = getParentSchemaById(idTemp, parentSchema);
      originalParent.children = originalParent.children.filter(
        (child) => child.id !== idTemp,
      );

      // reset the new id to the original schemaToAppend
      schemaToAppend.id = idTemp;

      // Update the global schema
      return parentSchema;
    },
    changePropsById(state, payload: { id: string; props: string; value: any }) {
      const { id, props, value } = payload;
      const propsObj = getSchemaById(id, state).props;

      console.log(`Change ${id} ${props} \n ${propsObj[props]} <- ${value}`);

      propsObj[props] = value;
      return state;
    },
    swapSchema(state, payload: { fromId: string; toId: string }) {
      const { fromId, toId } = payload;

      const stateDeepCopy = cloneDeep(state);

      const from = getSchemaById(fromId, stateDeepCopy);
      const to = getSchemaById(toId, stateDeepCopy);

      console.log('swapSchema', from, to);

      console.log(`Swap ${from.id} <-> ${to.id}`);
      const toDeepCopy = cloneDeep(to);

      // format the to schema
      Object.keys(to).forEach((key) => {
        delete to[key];
      });
      Object.assign(to, from);
      to.id = fromId;

      // format the from schema
      Object.keys(from).forEach((key) => {
        delete from[key];
      });
      Object.assign(from, toDeepCopy);

      return stateDeepCopy;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, state) {
      console.log();
    },
  }),
});
