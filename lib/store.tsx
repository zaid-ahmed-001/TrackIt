import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from '../lib/features/profileSlicer'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {api } from '@/app/Services/userService'
const createNoopStorage = () => {
   return {
      getItem(_key: any) {
         return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
         return Promise.resolve(value);
      },
      removeItem(_key: any) {
         return Promise.resolve();
      },
   };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();// defaults to localStorage for web

const rootReducer = combineReducers({
   profileReducer: profileReducer,
   [api.reducerPath]: api.reducer,
 });
 

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['profileReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const makeStore =()=>{
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }).concat(api.middleware),
    },)
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']