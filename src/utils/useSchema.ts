import { useState } from 'react';
import { Schema } from '../types/schema';
import { v4 as uuidv4 } from 'uuid';

const defaultGlobalSchema: Schema = {
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

export const useSchema = () => {
  const [globalSchema, setGlobalSchema] = useState<Schema>(defaultGlobalSchema);

  const appendSchema = (schema: Schema, id: string) => {
    // Generate a UUID for the new schema
    schema.id = schema.componentNames + '-' + uuidv4();
    // Find the parent schema by id
    const parentSchema = globalSchema;
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
    const parent = findParentSchema(parentSchema, id);
    console.log('parent', parent.componentNames, schema.componentNames);

    // Add the new schema to the parent schema
    if (Array.isArray(parent.children)) {
      parent.children.push(schema);
    }
  };

  return [globalSchema, setGlobalSchema, appendSchema];
};
