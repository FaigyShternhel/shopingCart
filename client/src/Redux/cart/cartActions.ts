import { CartActionTypes, CartItem, Category } from './cartTypes';
import { Dispatch } from 'redux';
import { postRequest, getRequest } from '../../Services/api';

export const addItemToCart = (item: CartItem) => {
  return (dispatch: Dispatch) => {
    postRequest(
      "/cart/addItem",
      item,
      (response) => {
        dispatch({
          type: CartActionTypes.ADD_ITEM,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: CartActionTypes.FAILED,
          payload: error.response ? error.response.status : "Failed to add item",
        });
      }
    );
  };
};

export const fetchCategories = () => {
  return (dispatch: Dispatch) => {
    getRequest(
      "/cart/categories",
      (response) => {
        dispatch({
          type: CartActionTypes.SET_CATEGORIES,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: CartActionTypes.FAILED,
          payload: error.response ? error.response.status : "Failed to fetch categories",
        });
      }
    );
  };
};

export const fetchItems = () => {
  return (dispatch: Dispatch) => {
    getRequest(
      "/cart/items",
      (response) => {
        dispatch({
          type: CartActionTypes.SET_ITEMS,
          payload: response,
        });
      },
      (error) => {
        dispatch({
          type: CartActionTypes.FAILED,
          payload: error.response ? error.response.status : "Failed to fetch items",
        });
      }
    );
  };
};

export const checkout = (cartItems: CartItem[]) => {
  return (dispatch: Dispatch) => {
    postRequest(
      "/cart/checkout",
      { items: cartItems },
      (response) => {
        console.log("Order completed successfully", response);
      },
      (error) => {
        dispatch({
          type: CartActionTypes.FAILED,
          payload: error.response ? error.response.status : "Failed to complete order",
        });
      }
    );
  };
};