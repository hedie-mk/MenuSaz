import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetMenuMainCategories , GetMenuCategories , GetMenuProducts , GetMenuInformation } from "./MenuTypes";

export const menuApi = createApi({
    reducerPath : "menuApi",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_API_BASE_URL,
    }),
    tagTypes : ["menu"],
    endpoints : (builder) => ({
        getMainCategories : builder.query<GetMenuMainCategories[],void>({
            query : () => 'menu/mainCategories',
            providesTags : ["menu"]
        }),
        getCategories : builder.query<GetMenuCategories[],void>({
            query : () => 'menu/categories',
            providesTags : ["menu"]
        }),
        getProducts : builder.query<GetMenuProducts[],void>({
            query : () => 'menu/products',
            providesTags : ["menu"]
        }),
        getMenuInformation : builder.query<GetMenuInformation,void>({
            query : () => 'menu/MenuInfo',
            providesTags : ["menu"]
        })
    })
});
export const {
    useGetMainCategoriesQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetMenuInformationQuery 
} = menuApi;