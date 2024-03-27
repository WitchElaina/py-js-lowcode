import { useState } from 'react';
import { Schema } from '../types/schema';
import { v4 as uuidv4 } from 'uuid';

const defaultGlobalSchema: Schema = {
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

  return [globalSchema, setGlobalSchema];
};
