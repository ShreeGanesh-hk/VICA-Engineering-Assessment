import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user';
import loadingReducer from './features/loading';
import bookReducer from './features/books';
import loginReducer from './features/login';

export const store = configureStore({
    reducer: {
        userManagement : userReducer,
        loadingIndicator : loadingReducer,
        bookManagement : bookReducer,
        login:loginReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
