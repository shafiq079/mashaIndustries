import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can switch to sessionStorage if needed
import userReducer from './userSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root', // key for persisted data
  storage, // default is localStorage
  whitelist: ['user'], // Only persist the user slice
};

// Create persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Apply the persisted user reducer
  },
});

export const persistor = persistStore(store); // Create persistor to handle rehydration
