import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, 
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string}, { UserName: string; Password: string }>
    ({
      query: (credentials) => ({
        url: '/auth/Login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
