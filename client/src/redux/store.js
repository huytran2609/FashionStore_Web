import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userSlice from './features/slices/userSlice';

const persistConfig = {
    key: 'store/user',
    storage,
};

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'token', 'isToastVisible'],
};

export const store = configureStore({
    reducer: {
        user: persistReducer(userConfig, userSlice),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
