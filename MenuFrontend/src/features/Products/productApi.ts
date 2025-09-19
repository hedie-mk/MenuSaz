
import type { GetProduct , PostProduct , UpdateProduct , AddCategory , inactiveProduct , latestProduct} from "./productType";
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        }
    }),
    tagTypes : ['Products'],
    endpoints : (builder) =>({
        getProducts : builder.query<GetProduct[],void>({
            query : () => 'item/all',
            providesTags : ['Products'],
        }),

        getProduct : builder.query<GetProduct,string>({
            query : (id) => `item/${id}`,
            providesTags : ['Products']
        }),

        createProduct : builder.mutation<string , PostProduct>({
            query : (newProduct) => ({
                url: "item",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags : ['Products'],
        }),

        updateProduct : builder.mutation<void , Partial<UpdateProduct>>({
            query : (product) => ({
            url: `item`,
            method: "PUT",
            body: product,
            }),
            invalidatesTags: ['Products'],
        }),

        deleteProduct : builder.mutation<void , string>({
            query: (id) => ({
            url: `item/${id}`,
            method: "DELETE",
            }),
            invalidatesTags: ['Products'],
        }),

        changeProductStatus : builder.mutation<void , string>({
            query : (id) => ({
                url : `item/changestatus/${id}`,
                method : "PATCH",
            }),
            invalidatesTags : ["Products"],
        }),


        addCategoryToProduct : builder.mutation<void , AddCategory>({
            query : (request) =>({
                url : `item/addCategory?id=${request.id}&categoryId=${request.categoryId}`,
                method : "PATCH",
            }),
            invalidatesTags : ["Products"],
        }),

        getInactiveProducts : builder.query<inactiveProduct[],void>({
            query: () => 'Dashboard/DeactiveItems',
            providesTags: ["Products"],
        }),

        getLatestProduct : builder.query<latestProduct[] , void>({
            query : () => 'dashboard/latestItems/7',
            providesTags : ["Products"]
        }),
        
    })
})


export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useChangeProductStatusMutation,
    useAddCategoryToProductMutation,
    useGetInactiveProductsQuery,
    useGetLatestProductQuery
} = productsApi;
