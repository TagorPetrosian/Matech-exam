import { FETCH_PRODUCTS, SUBMIT_PRODUCT } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case SUBMIT_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}
