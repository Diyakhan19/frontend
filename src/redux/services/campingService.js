import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const campingService = createApi({
  reducerPath: "campingService",
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
    createCamping: builder.mutation({
      query: (body) => ({
        url: "/camping/new",
        method: "POST",
        body: body,
      }),
    }),
    getCamping: builder.query({
      query: (campingId) => ({
        url: `/camping/single?campingId=${campingId}`,
        method: "GET",
      }),
    }),
    getCampings: builder.query({
      query: ({ search, city, type }) => ({
        url: `/camping/all?search=${search}&city=${city}&type=${type}`,
        method: "GET",
      }),
    }),
    deleteCamping: builder.mutation({
      query: (body) => ({
        url: `/camping/delete`,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateCampingMutation,
  useGetCampingQuery,
  useGetCampingsQuery,
  useDeleteCampingMutation,
} = campingService;
