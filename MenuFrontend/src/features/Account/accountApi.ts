import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetAccount , CreateAccount , UpdateAccount , ChangePassword } from "./accountType";

export const accountApi = createApi({
    reducerPath : 'accountApi',
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
    tagTypes : ["account"],
    endpoints : (builder) => ({
        getAccount : builder.query<GetAccount,void>({
            query : () => 'account',
            providesTags : ["account"]
        }),
        getAccounts : builder.query<GetAccount[],void>({
            query : () => 'account/all',
            providesTags : ["account"]
        }),
        createAccount : builder.mutation<void,CreateAccount>({
            query : (newAccount) => ({
                url : 'account/createAccount',
                method : 'POST',
                body : newAccount
            }),
            invalidatesTags : ["account"]
        }),
        updateAccount : builder.mutation<void,UpdateAccount>({
            query : (account) => ({
                url : 'account/updateAccount',
                method : 'PUT',
                body : account
            }),
            invalidatesTags : ["account"]
        }),
        deleteAccount : builder.mutation<void,string>({
            query : (id) => ({
                url : `account/deleteAccount/${id}`,
                method : 'DELETE'
            }),
            invalidatesTags : ['account']
        }),
        changePassword : builder.mutation<void,ChangePassword>({
            query : (data) => ({
                url : 'account/changePassword',
                method : 'PUT',
                body : data
            }),
            invalidatesTags : ['account']
        })
    })
})

export const {
    useGetAccountQuery,
    useGetAccountsQuery,
    useCreateAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
    useChangePasswordMutation
} = accountApi;