import { storeProducts } from '../data';
import { discountedStoreProducts } from '../discountedData';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  UPDATE_PRODUCTS,
  HANDLE_DETAIL,
  ADD_TO_CART,
  CLOSE_MODAL,
  REMOVE_ITEM,
  INCREMENT,
  DECREMENT,
  CLEAR_CART,
  ADD_TOTALS
} from './types';

export const setProducts = () => dispatch => {
  let tempProducts = [];
  storeProducts.forEach(item => {
    const singleItem = { ...item };
    tempProducts = [...tempProducts, singleItem];
  });

  dispatch({ type: UPDATE_PRODUCTS, payload: tempProducts });
};

export const setDiscountedProducts = () => dispatch => {
  let tempProducts = [];
  discountedStoreProducts.forEach(item => {
    const singleItem = { ...item };
    tempProducts = [...tempProducts, singleItem];
  });

  dispatch({ type: UPDATE_PRODUCTS, payload: tempProducts });
};

const getItem = (tempProducts, id) => {
  const product = tempProducts.find(item => item.id === id);
  return product;
};

const addTotals = () => (dispatch, getState) => {
  let subTotal = 0;
  getState().data.cart.map(item => (subTotal += item.total));

  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;

  dispatch({
    type: ADD_TOTALS,
    payload: {
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    }
  });
};

export const signIn = () => (dispatch, getState) => {
  dispatch({ type: SIGN_IN });
  dispatch({
    type: CLEAR_CART
  });
  dispatch(addTotals());
  history.push('/');
};

export const signOut = () => (dispatch, getState) => {
  dispatch({ type: SIGN_OUT });
  dispatch({
    type: CLEAR_CART
  });
  dispatch(addTotals());
};

export const updateProducts = tempProducts => {
  return {
    type: UPDATE_PRODUCTS,
    payload: tempProducts
  };
};

export const handleDetail = id => {
  return {
    type: HANDLE_DETAIL,
    payload: { id: id, tempProducts: [] }
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const addToCart = id => async (dispatch, getState) => {
  const tempProducts = [...getState().data.products];
  const index = tempProducts.indexOf(getItem(tempProducts, id));
  const newCartProduct = tempProducts[index];
  newCartProduct.inCart = true;
  newCartProduct.count = 1;
  const price = newCartProduct.price;
  newCartProduct.total = price;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      products: tempProducts,
      newCartProduct: newCartProduct,
      modalProduct: newCartProduct
    }
  });
  dispatch(addTotals());
};

export const removeItem = id => async (dispatch, getState) => {
  const tempProducts = [...getState().data.products];
  let tempCart = [...getState().data.cart];
  tempCart = tempCart.filter(item => item.id !== id);

  const index = tempProducts.indexOf(getItem(tempProducts, id));
  const product = tempProducts[index];
  product.inCart = false;
  product.count = 0;
  product.total = 0;
  dispatch({
    type: REMOVE_ITEM,
    payload: {
      products: [...tempProducts],
      cart: [...tempCart]
    }
  });
  dispatch(addTotals());
};

export const increment = id => async (dispatch, getState) => {
  let tempCart = [...getState().data.cart];
  const selectedProduct = tempCart.find(item => item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];

  product.count = product.count + 1;
  product.total = product.count * product.price;

  dispatch({
    type: INCREMENT,
    payload: {
      cart: [...tempCart]
    }
  });

  dispatch(addTotals());
};

export const decrement = id => async (dispatch, getState) => {
  let tempCart = [...getState().data.cart];
  const selectedProduct = tempCart.find(item => item.id === id);

  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];

  product.count = product.count - 1;

  if (product.count === 0) {
    dispatch(removeItem(id));
  } else {
    product.total = product.count * product.price;

    dispatch({
      type: DECREMENT,
      payload: {
        cart: [...tempCart]
      }
    });
    dispatch(addTotals());
  }
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART
  });
  if (getState().auth.isSignedIn) {
    dispatch(setDiscountedProducts());
  } else {
    dispatch(setProducts());
  }
  dispatch(addTotals());
};
