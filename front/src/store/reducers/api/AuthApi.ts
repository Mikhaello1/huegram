import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginCredentials, IRegisterCredentials, ITokens, IUser } from "../../../types/UserDataTypes";
import customBaseQuery from "./customBaseQuery";

const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: customBaseQuery(import.meta.env.VITE_API_URL+"/auth"),
    endpoints: (builder) => ({
        login: builder.mutation<ITokens & IUser, ILoginCredentials>({
            query: (loginData) => ({
                url: "/login",
                method: "POST",
                body: loginData,
            }),
        }),
        register: builder.mutation<ITokens, IRegisterCredentials>({
            query: (registerData) => ({
                url: "/registration",
                method: "POST",
                body: registerData,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        refresh: builder.mutation<IUser & ITokens, void>({
            query: () => ({
                url: "/refresh",
                method: "POST",
            }),
        }),
        
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshMutation } = AuthApi;

export default AuthApi;
