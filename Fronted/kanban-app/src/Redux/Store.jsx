// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tasks'],  
};

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
