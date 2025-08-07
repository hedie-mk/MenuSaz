import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { latestProduct } from './latestProductType';

export const latestProductsApi = createApi({
    reducerPath : "latestProductApi",
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://localhost:7214/api/',
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        }
    }),
    tagTypes : ['latestProduct'],
    endpoints : (builder) => ({
        getLatestProduct : builder.query<latestProduct[] , void>({
            query : () => 'dashboard/latestItems/5',
            providesTags : ["latestProduct"]
        }),
    }),
});
export const { useGetLatestProductQuery } = latestProductsApi;