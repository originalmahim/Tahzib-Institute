import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import sidebarReducer from '../slices/sidebarSlice';
// import cartReducer from '../slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    // cart: cartReducer,
  },
});
