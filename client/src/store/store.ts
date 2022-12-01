import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import { serverApi } from '../services/api';



const rootReducer = combineReducers({
    [ serverApi.reducerPath ]: serverApi.reducer,
});

export const setupStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware),
        ...options
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];