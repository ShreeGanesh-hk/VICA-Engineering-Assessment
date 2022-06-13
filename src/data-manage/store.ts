import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user';
import loadingReducer from './features/loading';
import bookReducer from './features/books';
import loginReducer from './features/login';
import { persistReducer,FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'counter',
    storage,
};

const rootReducers = combineReducers({
    userManagement: userReducer,
    loadingIndicator: loadingReducer,
    bookManagement: bookReducer,
    login: loginReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
