import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetCategory , PostCategory , GetCategoryItems } from "./categoryType";
import type { PostProduct } from "../Products/productType";


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
    tagTypes : ["Categories"],
    endpoints : (builder) => ({
        getCategories : builder.query<GetCategory[],void>({
            query : () => 'category/All',
            providesTags : ["Categories"]
        }),

        getCategory : builder.query<GetCategory,string>({
            query : (id) => `category/${id}`,
            providesTags : ["Categories"]
        }),

        createCategory : builder.mutation<void,PostCategory>({
            query : (newProduct) => ({
                url: "category",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags : ["Categories"],
        }),

        updateCategory : builder.mutation<void,Partial<PostProduct>>({
            query : (category) => ({
                url :"category",
                method : "PUT",
                body : category
            }),
            invalidatesTags : ["Categories"]
        }), 

        deleteCategory : builder.mutation<void,string>({
            query : (id) => ({
                url : `category/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ['Categories']
        }),

        changeCategoryStatus : builder.mutation<void , string>({
            query : (id) => ({
                url : `Category/changestatus/${id}`,
                method : "PATCH",
            }),
            invalidatesTags : ["Categories"],
        }),

        getCategoryItems : builder.query<GetCategoryItems,string>({
            query : (id) => `category/GetCategoryItems/${id}`,
            providesTags : ["Categories"]
        })
    })
});


export const {
    useGetCategoriesQuery ,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useChangeCategoryStatusMutation,
    useGetCategoryItemsQuery
} = categoryApi;