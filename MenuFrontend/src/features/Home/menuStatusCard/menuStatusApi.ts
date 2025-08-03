import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MenuStatusCard } from './menuStatusTypes';

export const menuStatusCardApi = createApi({
    reducerPath : "menuStatusCardApi",
    baseQuery : fetchBaseQuery({
        baseUrl: 'https://localhost:7214/api/',
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        }
    }),
    tagTypes: ['MenuStatusCard'],
    endpoints: (builder) => ({
        getMenuStatus: builder.query<MenuStatusCard[], void>({
        query: () => 'Dashboard/Menu',
        providesTags: ['MenuStatusCard'],
        }),
    }),
});

export const { useGetMenuStatusQuery } = menuStatusCardApi;