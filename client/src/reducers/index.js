import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import products from './products';

export default combineReducers({
  auth,
  form: formReducer,
  products
});
