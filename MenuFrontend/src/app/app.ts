
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authReducer from "../features/auth/authSlice"; 
import { authApi } from "../features/auth/authApi";
import { menuStatusCardApi } from "../features/Home/menuStatusCard/menuStatusApi";
import menuStatusCardSlice from "../features/Home/menuStatusCard/menuStatusSlice"
import { menuInfoCardApi } from "../features/Home/menuInfoCard/menuInfoApi";
import menuInfoCardSlice  from "../features/Home/menuInfoCard/menuInfoSlice";
import { inactiveProductsApi } from "../features/Home/inactiveProductsCard/inactiveProductsApi";
import inactiveProductCardSlice from "../features/Home/inactiveProductsCard/inactiveProductsSlice"
import { inactiveCategoriesApi } from "../features/Home/inactiveCategoriesCard/inactiveCategoriesApi";
import inactiveCategoriesCardSlice from "../features/Home/inactiveCategoriesCard/inactiveCategoriesSlice"
import { latestProductsApi } from "../features/Home/latestProductsCard/latestProductsApi";
import { productsApi } from "../features/Products/productApi";
import { categoryApi } from "../features/Category/categoryApi";
import { mainCategoryApi } from "../features/MainCategory/MainCategoryApi";




const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  menuStatusCard : menuStatusCardSlice,
  [menuStatusCardApi.reducerPath] : menuStatusCardApi.reducer,
  menuInfoCard : menuInfoCardSlice,
  [menuInfoCardApi.reducerPath] : menuInfoCardApi.reducer,
  inactiveProductCard : inactiveProductCardSlice,
  [inactiveProductsApi.reducerPath] : inactiveProductsApi.reducer,
  inactiveCategoriesCard : inactiveCategoriesCardSlice,
  [inactiveCategoriesApi.reducerPath] : inactiveCategoriesApi.reducer,
  [latestProductsApi.reducerPath] : latestProductsApi.reducer,
  [productsApi.reducerPath] : productsApi.reducer,
  [categoryApi.reducerPath] : categoryApi.reducer,
  [mainCategoryApi.reducerPath] : mainCategoryApi.reducer,

});

const persistConfig = {
  key: "root",
  storage, 
  whitelist: ["auth"], 
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
      authApi.middleware,
      menuStatusCardApi.middleware,
      menuInfoCardApi.middleware,
      inactiveProductsApi.middleware,
      inactiveCategoriesApi.middleware,
      latestProductsApi.middleware,
      productsApi.middleware,
      categoryApi.middleware,
      mainCategoryApi.middleware,
    )
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
