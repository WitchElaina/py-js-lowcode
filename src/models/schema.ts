import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { Callback, Schema } from '../types/schema';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { getParentSchemaById, getSchemaById } from '../utils/schemaTools';
import { useRequest } from 'ahooks';
import { useRequests } from '../utils/requests';
import axios from 'axios';

const defaultSchema: Schema = {
  id: 'flex-babf143c-930d-4786-8440-9a7daa34ff74',
  componentNames: 'flex',
  props: {
    style: { width: '100%', height: '100%', padding: 16 },
    vertical: false,
    gap: 16,
    align: 'center',
    content: 'center',
  },
  title: '设计器',
  userEvents: {},
  children: [
    {
      componentNames: 'text',
      props: { children: 'Number 1' },
      title: '文本',
      children: null,
      userEvents: { onClick: [] },
      id: 'text-3f818313-c4d2-4d98-812d-4d82efc0bc2a',
    },
    {
      componentNames: 'inputNumber',
      props: {
        placeholder: '请输入数字',
        style: { width: '100%' },
        value: 50,
      },
      title: '数字输入框',
      children: null,
      voidElementTag: true,
      id: 'inputNumber-0730a4da-7992-4073-b652-746565fd82e6',
    },
    {
      componentNames: 'text',
      props: { children: 'Number 2' },
      title: '文本',
      children: null,
      userEvents: { onClick: [] },
      id: 'text-11e56652-dae9-4c66-8675-579bd8aac3bd',
    },
    {
      componentNames: 'inputNumber',
      props: {
        placeholder: '请输入数字',
        style: { width: '100%' },
        value: 503,
      },
      title: '数字输入框',
      children: null,
      voidElementTag: true,
      id: 'inputNumber-3a55b3b8-a0fa-40fb-8908-0ac1213469e5',
    },
    {
      componentNames: 'button',
      props: { children: '+ Add' },
      title: '按钮',
      children: null,
      userEvents: {
        onClick: [
          {
            funcName: 'add',
            args: [
              {
                id: 'inputNumber-0730a4da-7992-4073-b652-746565fd82e6',
                propName: 'value',
              },
              {
                id: 'inputNumber-3a55b3b8-a0fa-40fb-8908-0ac1213469e5',
                propName: 'value',
              },
            ],
            returnTo: {
              id: 'inputNumber-607e50f0-7c4f-4a46-9898-fdec81b5dde0',
              propName: 'value',
            },
          },
        ],
      },
      id: 'button-5dc7e811-f6e3-47da-9978-ca8cecab97f1',
    },
    {
      componentNames: 'button',
      props: { children: '- Sub' },
      title: '按钮',
      children: null,
      userEvents: {
        onClick: [
          {
            funcName: 'sub',
            args: [
              {
                id: 'inputNumber-0730a4da-7992-4073-b652-746565fd82e6',
                propName: 'value',
              },
              {
                id: 'inputNumber-3a55b3b8-a0fa-40fb-8908-0ac1213469e5',
                propName: 'value',
              },
            ],
            returnTo: {
              id: 'inputNumber-607e50f0-7c4f-4a46-9898-fdec81b5dde0',
              propName: 'value',
            },
          },
        ],
      },
      id: 'button-f6814fbe-b9bd-4825-b29c-9ba8bfed4320',
    },
    {
      componentNames: 'text',
      props: { children: 'Result ' },
      title: '文本',
      children: null,
      userEvents: { onClick: [] },
      id: 'text-1f5b0c7d-504b-4d96-b93e-ea9d76d1219a',
    },
    {
      componentNames: 'inputNumber',
      props: {
        placeholder: '⬅️ Click to calc',
        style: { width: '100%' },
        value: null,
      },
      title: '数字输入框',
      children: null,
      voidElementTag: true,
      id: 'inputNumber-607e50f0-7c4f-4a46-9898-fdec81b5dde0',
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

      if (!parent) return state;

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

      if (!parent || !Array.isArray(parent.children)) {
        return state;
      }

      // copy schemaToAppend as a new id
      const schemaToAppend = cloneDeep(schemaToAppendOriginal);
      const idTemp = schemaToAppend.id as string;
      schemaToAppend.id = 'temp-schema';

      // append the new schema to the parent schema
      parent.children.push(schemaToAppend);

      // delete the old schema
      const originalParent = getParentSchemaById(idTemp, parentSchema);

      if (!originalParent || !Array.isArray(originalParent.children)) {
        return state;
      }

      originalParent.children = originalParent.children.filter(
        (child) => child.id !== idTemp,
      );

      // reset the new id to the original schemaToAppend
      schemaToAppend.id = idTemp;

      // Update the global schema
      return parentSchema;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    changePropsById(state, payload: { id: string; props: string; value: any }) {
      const { id, props, value } = payload;

      const schema = getSchemaById(id, state);

      if (!schema) return state;

      const propsObj = schema.props;

      // @ts-expect-error I'm sure that propsObj[props] exists
      console.log(`Change ${id} ${props} \n ${propsObj[props]} <- ${value}`);

      // @ts-expect-error I'm sure that propsObj[props] exists
      propsObj[props] = value;
      return state;
    },
    swapSchema(state, payload: { fromId: string; toId: string }) {
      const { fromId, toId } = payload;

      const stateDeepCopy = cloneDeep(state);

      const from = getSchemaById(fromId, stateDeepCopy);
      const to = getSchemaById(toId, stateDeepCopy);

      if (!from || !to) return state;

      console.log('swapSchema', from, to);

      console.log(`Swap ${from.id} <-> ${to.id}`);
      const toDeepCopy = cloneDeep(to);

      // format the to schema
      Object.keys(to).forEach((key) => {
        delete to[key as keyof Schema];
      });
      Object.assign(to, from);
      to.id = fromId;

      // format the from schema
      Object.keys(from).forEach((key) => {
        delete from[key as keyof Schema];
      });
      Object.assign(from, toDeepCopy);

      return stateDeepCopy;
    },
    deleteSchema(state, payload: { id: string }) {
      const { id } = payload;

      const parentSchema = getParentSchemaById(id, state);

      if (!parentSchema || !Array.isArray(parentSchema.children)) {
        return state;
      }

      parentSchema.children = parentSchema.children.filter(
        (child) => child.id !== id,
      );

      return state;
    },
    setCallback(
      state,
      payload: {
        id: string;
        eventName: string;
        index: number;
        callback: Callback;
      },
    ) {
      console.log('setCallback', payload);

      const { id, eventName, index, callback } = payload;

      const schema = getSchemaById(id, state);

      if (!schema) return state;

      if (!schema.userEvents[eventName]) {
        schema.userEvents[eventName] = [];
      }

      schema.userEvents[eventName][index] = callback;

      return state;
    },
    appendCallback(state, payload: { id: string; eventName: string }) {
      const { id, eventName } = payload;

      const callback: Callback = {
        funcName: '',
        args: [],
        returnTo: {
          id: '',
          propName: '',
        },
      };

      const schema = getSchemaById(id, state);

      if (!schema) return state;

      if (!schema.userEvents[eventName]) {
        schema.userEvents[eventName] = [];
      }

      const newList = [...schema.userEvents[eventName], callback];
      schema.userEvents[eventName] = newList;

      return state;
    },
    deleteCallback(
      state,
      payload: { id: string; eventName: string; index: number },
    ) {
      const { id, eventName, index } = payload;

      const schema = getSchemaById(id, state);

      if (!schema) return state;

      if (!schema.userEvents[eventName]) {
        return state;
      }

      schema.userEvents[eventName].splice(index, 1);

      return state;
    },
    runCallback(
      state,
      payload: { id: string; eventName: string; execReq: any },
    ) {
      const { id, eventName, execReq } = payload;

      const schema = getSchemaById(id, state);

      if (!schema) return state;

      if (!schema.userEvents[eventName]) {
        return state;
      }

      schema.userEvents[eventName].forEach((callback) => {
        // getArgs
        const args = callback.args.map((arg) => {
          const argId = arg.id;
          const argPropName = arg.propName;

          const argSchema = getSchemaById(argId, state);

          if (!argSchema) return null;

          return argSchema.props?.[argPropName] || undefined;
        });

        console.log(
          'runCallback',
          callback.funcName,
          callback.args.length,
          args,
          callback.returnTo.id,
          callback.returnTo.propName,
        );

        execReq(callback.funcName, args).then((res: any) => {
          const returnToId = callback.returnTo.id;
          const returnToPropName = callback.returnTo.propName;

          const returnToSchema = getSchemaById(returnToId, state);

          if (!returnToSchema) return;

          console.log(res.data);
        });
      });

      return state;
    },
    loadSchemaJson(state, payload: { schemaJson: string }) {
      const { schemaJson } = payload;

      const schema = JSON.parse(schemaJson);

      return schema;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async runAsync(payload, rootState) {
      console.log('runAsync', payload, rootState);
      const { id, eventName, execReq } = payload;

      const schema = getSchemaById(id, rootState.schema);
      const callbackList = schema?.userEvents?.[eventName] || [];
      console.log('runAsync Callback', callbackList);

      callbackList.forEach(async (callback) => {
        // getArgs
        const args = callback.args.map((arg) => {
          const argId = arg.id;
          const argPropName = arg.propName;

          const argSchema = getSchemaById(argId, rootState.schema);

          if (!argSchema) return null;
          if (!argSchema?.props?.[argPropName]) return null;

          return argSchema.props?.[argPropName];
        });

        console.log(
          'runAsync',
          callback.funcName,
          callback.args.length,
          args,
          callback.returnTo.id,
          callback.returnTo.propName,
        );

        if (!callback.funcName) return;
        const res = await execReq(callback.funcName, args);
        console.log(res.data);

        const returnToId = callback.returnTo.id;
        const returnToPropName = callback.returnTo.propName;

        const returnToSchema = getSchemaById(returnToId, rootState.schema);

        if (!returnToSchema) return;

        dispatch.schema.changePropsById({
          id: returnToId,
          props: returnToPropName,
          value: res.data,
        });
      });
    },
  }),
});
