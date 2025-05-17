// features/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import loadingReducer from './slice/loadingSlice';
import uiReducer from './slice/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  ui: uiReducer
  // Add other reducers here when needed
});

export default rootReducer;