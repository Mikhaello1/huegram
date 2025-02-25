import { combineReducers, configureStore } from "@reduxjs/toolkit";

import searchApi from "./reducers/SearchApi";


const rootReducer = combineReducers({
    
    [searchApi.reducerPath]: searchApi.reducer,
    
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(searchApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']