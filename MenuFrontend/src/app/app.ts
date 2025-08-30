
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authReducer from "../features/auth/authSlice"; 
import { authApi } from "../features/auth/authApi";
import { productsApi } from "../features/Products/productApi";
import { categoryApi } from "../features/Category/categoryApi";
import { mainCategoryApi } from "../features/MainCategory/MainCategoryApi";
import { menuInfoApi } from "../features/MenuInfo/MenuInfoApi";
import { accountApi } from "../features/Account/accountApi";
import accountReducer from "../features/Account/accountSlice"
import { menuApi } from "../features/Menu/MenuApi";
import menuReducer from "../features/Menu/MenuSlice"


const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath] : productsApi.reducer,
  [categoryApi.reducerPath] : categoryApi.reducer,
  [mainCategoryApi.reducerPath] : mainCategoryApi.reducer,
  [menuInfoApi.reducerPath] : menuInfoApi.reducer,
  [accountApi.reducerPath] : accountApi.reducer,
  account : accountReducer,
  [menuApi.reducerPath] : menuApi.reducer,
  menu : menuReducer

});

const persistConfig = {
  key: "root",
  storage, 
  whitelist: ["auth","account","menu"], 
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") { 

    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      menuApi.middleware,
      authApi.middleware,
      productsApi.middleware,
      categoryApi.middleware,
      mainCategoryApi.middleware,
      menuInfoApi.middleware,
      accountApi.middleware,
    )
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
