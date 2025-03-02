import { createApi } from "@reduxjs/toolkit/query/react";
import { IUserData } from "../../../types/UserDataTypes";
import customBaseQuery from "./customBaseQuery";

const UsersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: customBaseQuery(import.meta.env.VITE_API_URL+"/users"),
    tagTypes: ['users'],
    endpoints: (builder) => ({
        getUserByUsername: builder.query<IUserData, string>({
            query: (username) => ({
                url: "/getUser",
                params: {
                    username
                }
            })
        })
    })
})

export const {useGetUserByUsernameQuery} = UsersApi;

export default UsersApi;