import { configureStore } from '@reduxjs/toolkit';
import projectDataReducer from './Slice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    projectData: projectDataReducer,
    auth: authReducer,
  },
});

export default store;