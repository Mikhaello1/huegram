import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchHistoryItem } from "../../../models/SearchHistoryItem";

const searchApi = createApi({
    reducerPath: "searchApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444/api/search" }),
    tagTypes: ["search"],
    endpoints: (builder) => ({
        getSearchHistory: builder.query<SearchHistoryItem[], number>({
            query: (searcherId) => `/getAccountsHistory?searcherId=${searcherId}`,
            providesTags: () => [{ type: "search" }],
            transformResponse: (response: SearchHistoryItem[]) => {
                if (response && response.length) {
                    return response.reverse();
                } else return [];
            },
        }),

        getSearchUsersByUsername: builder.query<SearchHistoryItem[], { searchQuery: string; searcherId: number }>({
            query: ({ searchQuery, searcherId }) => `/searchUsers?searchQuery=${searchQuery}&searcherId=${searcherId}`,
        }),

        addSearchAccountHistory: builder.mutation<void, { searcherId: number; searchedId: number }>({
            query: (newHistory) => ({
                url: "/addToSearchHistory",
                method: "POST",
                body: newHistory,
            }),
            invalidatesTags: ["search"],
        }),
        deleteFromSearchAccountHistory: builder.mutation<void, { searcherId: number; searchedId: number }>({
            query: (historyToDelete) => ({
                url: "/deleteFromHistory",
                method: "DELETE",
                params: {
                    searcherId: historyToDelete.searcherId,
                    searchedId: historyToDelete.searchedId,
                },
            }),
            invalidatesTags: ["search"],
        }),
    }),
});

export const { useGetSearchHistoryQuery, useGetSearchUsersByUsernameQuery, useAddSearchAccountHistoryMutation, useDeleteFromSearchAccountHistoryMutation } = searchApi;

export default searchApi;
