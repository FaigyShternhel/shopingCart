export enum CartActionTypes {
    ADD_ITEM = 'cart/addItem',
    SET_CATEGORIES = 'cart/setCategories',
    SET_ITEMS = 'cart/setItems',
    FAILED = 'cart/failed',
    CHECKOUT_SUCCESS = 'cart/checkoutSuccess',
  }
  
  export interface CartItem {
    name: string;
    category: Category;
    quantity: number;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface CartState {
    items: CartItem[];
    categories: Category[];
    error: string | null;
  }  