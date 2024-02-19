import {createContext} from '@lit/context';

export type Dog = {
  name: string;
  breed: string;
};

// <Dog> specifies the kind of data that can be provided to the context.
// 'dog' is a key associated with the context.
export const dogContext = createContext<Dog>('dog');
