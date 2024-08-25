import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => ({
        url: `/auth/user?userId=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserByIdQuery } = userService;
