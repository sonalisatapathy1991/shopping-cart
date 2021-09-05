import {combineReducers } from "redux";
import {productReducer} from './productReducers';
//import {authReducer} from './authReducer';
 import errorReducer from './errorReducer';


export default combineReducers({
    products: productReducer,
    error:errorReducer
  })