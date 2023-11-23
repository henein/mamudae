import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import rootReducer, { RootState } from ".";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //직렬화 안하겠다 설정
    }),
});

export const persistor = persistStore(store); // persist store 내보내기

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
