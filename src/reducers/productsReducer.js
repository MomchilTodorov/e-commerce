import { detailProduct } from '../data';
import {
  UPDATE_PRODUCTS,
  HANDLE_DETAIL,
  ADD_TO_CART,
  CLOSE_MODAL,
  REMOVE_ITEM,
  INCREMENT,
  DECREMENT,
  CLEAR_CART,
  ADD_TOTALS
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  detailProduct: detailProduct,
  modalOpen: false,
  modalProduct: detailProduct,
  cart: [],
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0
};

const getItem = (tempProducts, id) => {
  const product = tempProducts.find(item => item.id === id);
  return product;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TOTALS:
      return {
        ...state,
        cartSubTotal: action.payload.cartSubTotal,
        cartTax: action.payload.cartTax,
        cartTotal: action.payload.cartTotal
      };
    case HANDLE_DETAIL:
      action.payload.tempProducts = [...state.products];
      const product = getItem(action.payload.tempProducts, action.payload.id);
      return { ...state, detailProduct: product };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false };
    case ADD_TO_CART:
      return {
        ...state,
        products: action.payload.products,
        cart: [...state.cart, action.payload.newCartProduct],
        modalProduct: action.payload.newCartProduct,
        modalOpen: true
      };
    case REMOVE_ITEM:
      return {
        ...state,
        products: [...action.payload.products],
        cart: [...action.payload.cart]
      };
    case INCREMENT:
      return { ...state, cart: action.payload.cart };
    case DECREMENT:
      return { ...state, cart: action.payload.cart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
