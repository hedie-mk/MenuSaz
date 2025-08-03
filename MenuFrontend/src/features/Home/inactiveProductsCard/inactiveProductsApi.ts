import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { inactiveProduct } from './inactiveProductsTypes';


export const inactiveProductsApi = createApi({
    reducerPath : "inactiveProductsApi" ,
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
    tagTypes : ['inactiveProducts'],
    endpoints : (builder) => ({
        getInactiveProducts : builder.query<inactiveProduct[],void>({
            query: () => 'Dashboard/DeactiveItems',
            providesTags: ['inactiveProducts'],
        }),
    }),

});

export const { useGetInactiveProductsQuery } = inactiveProductsApi;