import { useReducer } from 'react';

type FormState = {
  query: string;
  name: string;
};

type FormAction =
  | {
      type: 'changeOption';
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'clear';
    };

function searcherReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case 'changeOption':
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    case 'clear':
      return initialState;
  }
}

const initialState = {
  query: 'empty',
  name: '',
};

export default function useFormReducer() {
  return useReducer(searcherReducer, initialState);
}
