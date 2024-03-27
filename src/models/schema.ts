import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Schema } from '../types/schema';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

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
      const { schemaToAppend, parentId } = payload;

      console.log(`Append ${schemaToAppend.id} -> ${parentId}`, schemaToAppend);
      // Generate a UUID for the new schema
      schemaToAppend.id = schemaToAppend.componentNames + '-' + uuidv4();
      // Find the parent schema by id
      const parentSchema = cloneDeep(state);
      // Find the parent schema by id
      const findParentSchema = (schema: Schema, id: string) => {
        if (schema.id === id) {
          return schema;
        }
        if (schema.children) {
          for (let i = 0; i < schema.children.length; i++) {
            const result = findParentSchema(schema.children[i], id);
            if (result) {
              return result;
            }
          }
        }
      };
      const parent = findParentSchema(parentSchema, parentId);
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
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, state) {
      console.log();
    },
  }),
});
