import { useEffect, useReducer } from 'react';

type FormState = {
  query: string;
  name: string;
  error: boolean;
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
    }
  | {
      type: 'error';
      payload: boolean;
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
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
  }
}

const initialState = {
  query: 'empty',
  name: '',
  error: false,
};

export default function useFormReducer() {
  return useReducer(searcherReducer, initialState);
}
