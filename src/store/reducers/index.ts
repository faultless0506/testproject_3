
import { combineReducers } from '@reduxjs/toolkit';
import dogReducer from '../slices/dogsSlice';
import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  dog: dogReducer,
  user: userReducer
});

export default rootReducer;
