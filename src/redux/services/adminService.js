import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const adminService = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL + "/api",
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addDestination: builder.mutation({
      query: (body) => ({
        url: "/admin/destination",
        method: "POST",
        body: body,
      }),
    }),
    getDestinations: builder.query({
      query: ({ search }) => ({
        url: `/admin/destinations?search=${search}`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: ({ search }) => ({
        url: `/admin/users?search=${search}`,
        method: "GET",
      }),
    }),
    updateUserStatus: builder.mutation({
      query: (body) => ({
        url: "/admin/user/status",
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useAddDestinationMutation,
  useGetDestinationsQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} = adminService;
