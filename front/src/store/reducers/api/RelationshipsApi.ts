 import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { IUserData } from "../../../types/UserDataTypes";



const RelationshipsApi = createApi({
    reducerPath: "relationshipsApi",
    baseQuery: customBaseQuery(import.meta.env.VITE_API_URL+"/relationships"),
    tagTypes: ["relationshipsFollowers", "relationshipsFollowed"],
    endpoints: (builder) => ({
        getFollowers: builder.query<IUserData[], number | undefined>({
            query: (id) => ({
                url: `/getFollowers`,
                params: {
                    id
                }
            }),
            providesTags: () => [{type: "relationshipsFollowers"}],
        }),
        getFollowed: builder.query<IUserData[], number | undefined>({
            query: (id) => ({
                url :`/getFollowed`,
                params: {id}
            }),
            providesTags: () => [{type: "relationshipsFollowed"}],
        }),
        follow: builder.mutation<void, {followerId: number, followedId: number}>({
            query: ({followerId, followedId}) => ({
                url: "/follow",
                body: {
                    followerId, followedId
                },
                method: "POST"
            }),
            invalidatesTags: ["relationshipsFollowed", "relationshipsFollowers"]
        }),
        unfollow: builder.mutation<void, {followerId: number, followedId: number}>({
            query: ({followerId, followedId}) => ({
                url: "/unfollow",
                body: {
                    followerId, followedId
                },
                method: "DELETE"
            }),
            invalidatesTags: ["relationshipsFollowed", "relationshipsFollowers"]
        })
    })
})

export const { useGetFollowersQuery, useGetFollowedQuery, useFollowMutation, useUnfollowMutation } = RelationshipsApi;
export default RelationshipsApi;