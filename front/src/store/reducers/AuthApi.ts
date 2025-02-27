import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginCredentials, IRegisterCredentials, ITokens, IUser } from "../../types/UserDataTypes";

const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444/api/auth" }),
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
        refresh: builder.mutation<void, void>({
            query: () => ({
                url: "/refresh",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshMutation } = AuthApi;

export default AuthApi;
