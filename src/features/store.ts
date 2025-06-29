import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

const rootReducer = {
  auth: authReducer
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;