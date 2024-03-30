import { Schema } from '../types/schema';

export const getSchemaById = (id: string, schema: Schema): Schema | null => {
  if (schema.id === id) {
    return schema;
  }
  if (schema.children) {
    for (let i = 0; i < schema.children.length; i++) {
      const result = getSchemaById(id, schema.children[i]);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

export const getParentSchemaById = (
  id: string,
  schema: Schema,
): Schema | null => {
  if (schema.children) {
    for (let i = 0; i < schema.children.length; i++) {
      if (schema.children[i].id === id) {
        return schema;
      }
      const result = getParentSchemaById(id, schema.children[i]);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
