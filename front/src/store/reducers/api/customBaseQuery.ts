
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customBaseQuery = (url: string) => {
    return fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access");
            if(token) headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
        credentials: 'include',
    })
}

export default customBaseQuery;