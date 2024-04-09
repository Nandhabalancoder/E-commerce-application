import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './Slice';

const rootReducer = combineReducers({
  data: dataReducer
  // Add other reducers here if needed
});

export default rootReducer;