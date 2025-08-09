import type { MenuInfo , PostMenuInfo } from "./MenuInfoType";
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuInfoApi = createApi({
    reducerPath : "MenuInfoApi",
    baseQuery : fetchBaseQuery({
        baseUrl :  'https://localhost:7214/api/',
        prepareHeaders : (headers , {getState}) => {
            const token = (getState() as any).auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        }
    }),
    tagTypes : ['MenuInfo'],
    endpoints : (builder) => ({
        getMenuInfo : builder.query<MenuInfo , void>({
            query : () => 'menuInfo',
            providesTags : ['MenuInfo']
        }),

        createMenuInfo : builder.mutation<string , PostMenuInfo>({
            query : (newMenuInfo) => ({
                url : 'menuInfo',
                method : 'POST',
                body : newMenuInfo
            }),
            invalidatesTags : ['MenuInfo']
        }),

        updateMenuInfo : builder.mutation<void , MenuInfo>({
            query : (menuInfo) => ({
                url: 'menuInfo',
                method : 'PUT',
                body : menuInfo
            }),
            invalidatesTags : ["MenuInfo"]
        }),
    }),
    
})

export const {
    useGetMenuInfoQuery,
    useCreateMenuInfoMutation,
    useUpdateMenuInfoMutation
} = menuInfoApi;