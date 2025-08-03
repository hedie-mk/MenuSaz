import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { inactiveCategory } from './inactiveCategoriesTypes';


export const inactiveCategoriesApi = createApi({
    reducerPath : "inactiveCategoriesApi" ,
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
    tagTypes : ['inactiveCategories'],
    endpoints : (builder) => ({
        getInactiveCategories : builder.query<inactiveCategory[],void>({
            query: () => 'Dashboard/DiactiveCategories',
            providesTags: ['inactiveCategories'],
        }),
    }),

});

export const { useGetInactiveCategoriesQuery } = inactiveCategoriesApi;