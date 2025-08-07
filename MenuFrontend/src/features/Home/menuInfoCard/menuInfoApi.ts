import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { menuInfoCard } from './menuInfoType';

export const menuInfoCardApi = createApi({
    reducerPath : 'menuInfoCardApi',
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
    tagTypes : ['menuInfoCard'],
    endpoints : (builder) => ({
        getMenuInfo : builder.query<menuInfoCard,void>({
            query : () => 'dashboard/MenuInfo',
            providesTags : ["menuInfoCard"],
        }),
    }),
});
export const { useGetMenuInfoQuery } = menuInfoCardApi; 