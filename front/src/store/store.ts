import { combineReducers, configureStore } from "@reduxjs/toolkit";

import searchApi from "./reducers/api/SearchApi";
import AuthApi from "./reducers/api/AuthApi";
import UserSlice from "./reducers/slices/UserSlice";
import RelationshipsApi from "./reducers/api/RelationshipsApi";
import UsersApi from "./reducers/api/UsersApi";


const rootReducer = combineReducers({
    [searchApi.reducerPath]: searchApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserSlice.reducerPath]: UserSlice.reducer,
    [RelationshipsApi.reducerPath]: RelationshipsApi.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(searchApi.middleware, AuthApi.middleware, RelationshipsApi.middleware, UsersApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']