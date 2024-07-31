import { CartState, CartActionTypes, CartItem } from './cartTypes';

interface CartAction {
  type: CartActionTypes;
  payload?: any;
}

const INITIAL_STATE: CartState = {
  items: [],
  categories: [],
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      const newItem: CartItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name && item.category === newItem.category);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.name === newItem.name && item.category === newItem.category
              ? { ...item, quantity: newItem.quantity }
              : item
          ),
          error: null,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }],
          error: null,
        };
      }

    case CartActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };

    case CartActionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        error: null,
      };

    case CartActionTypes.FAILED:
      return {
        ...state,
        error: action.payload || 'Failed to process request',
      };

    default:
      return state;
  }
};

export default cartReducer;