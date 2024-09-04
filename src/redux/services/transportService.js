import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const transportService = createApi({
  reducerPath: "transportService",
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
    postTransport: builder.mutation({
      query: (body) => ({
        url: `/transport/new`,
        method: "POST",
        body: body,
      }),
    }),
    updateStatus: builder.mutation({
      query: (body) => ({
        url: `/transport/status`,
        method: "PATCH",
        body: body,
      }),
    }),
    getTransports: builder.mutation({
      query: (body) => ({
        url: `/transport/all`,
        method: "POST",
        body: body,
      }),
    }),
    getTransport: builder.query({
      query: (transportId) => ({
        url: `/transport/single?transportId=${transportId}`,
        method: "GET",
      }),
    }),
    bookmarkTransport: builder.mutation({
      query: (body) => ({
        url: `/transport/bookmark`,
        method: "POST",
        body: body,
      }),
    }),
    bookTransport: builder.mutation({
      query: (body) => ({
        url: `/transport/booking`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  usePostTransportMutation,
  useUpdateStatusMutation,
  useGetTransportsMutation,
  useGetTransportQuery,
  useBookmarkTransportMutation,
  useBookTransportMutation,
} = transportService;
