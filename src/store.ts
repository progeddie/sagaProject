import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './toolkitModule';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
