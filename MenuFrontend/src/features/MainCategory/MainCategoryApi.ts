import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetMainCategory , PostMainCategory , GetCategoryCategories } from "./MainCategoryType";
export const mainCategoryApi = createApi({
    reducerPath: 'mainCategoryApi',
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
    tagTypes : ["MainCategories"],
    endpoints : (builder) => ({
        getMainCategories : builder.query<GetMainCategory[],void>({
            query : () => 'MainCategory',
            providesTags : ["MainCategories"]
        }),

        getMainCategory : builder.query<GetMainCategory,string>({
            query : (id) => `MainCategory/${id}`,
            providesTags : ["MainCategories"]
        }),

        createMainCategory : builder.mutation<void,PostMainCategory>({
            query : (newProduct) => ({
                url: "MainCategory",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags : ["MainCategories"],
        }),

        updateMainCategory : builder.mutation<void,Partial<PostMainCategory>>({
            query : (category) => ({
                url :"MainCategory",
                method : "PUT",
                body : category
            }),
            invalidatesTags : ["MainCategories"]
        }), 

        deleteMainCategory : builder.mutation<void,string>({
            query : (id) => ({
                url : `MainCategory/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ['MainCategories']
        }),

        changeMainCategoryStatus : builder.mutation<void , string>({
            query : (id) => ({
                url : `MainCategory/changestatus/${id}`,
                method : "PATCH",
            }),
            invalidatesTags : ["MainCategories"],
        }),

        getMainCategoryCategories : builder.query<GetCategoryCategories,string>({
            query : (id) => `category/GetCategoryItems/${id}`,
            providesTags : ["MainCategories"]
        }),
    }),
});
 export const {
     useGetMainCategoriesQuery ,
     useGetMainCategoryQuery,
     useCreateMainCategoryMutation,
     useUpdateMainCategoryMutation,
     useDeleteMainCategoryMutation,
     useChangeMainCategoryStatusMutation,
     useGetMainCategoryCategoriesQuery
 } = mainCategoryApi;