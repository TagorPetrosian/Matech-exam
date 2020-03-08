import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_PRODUCTS, SUBMIT_PRODUCT } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const fetchProducts = () => async dispatch => {
  const res = await axios.get('http://localhost:3090/products');
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

export const submitProduct = formProps => async dispatch => {
  const urlOrAsin = formProps.product;
  let matches;
  let asin;
  let regex = new RegExp(
    'https?://(?:www.|)amazon.com/(?:gp/product|[^/]+/dp|dp)/([^/]+)'
  );
  if (urlOrAsin.indexOf('http') !== -1) {
    matches = urlOrAsin.match(regex);
    if (matches) {
      asin = matches[1];
    }
  } else {
    asin = urlOrAsin;
  }

  // console.log(formProps);
  const res = await axios.post(
    `http://localhost:3090/products`,
    JSON.stringify({ asin: asin })
  );

  dispatch({ type: SUBMIT_PRODUCT, payload: res.data });
};
