import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from './darkmodeSlice/darkmode';
import userInfoReducer from './userInfoSlice/userInfo';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['darkMode'], // target (reducer name)
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  userInfo: userInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
