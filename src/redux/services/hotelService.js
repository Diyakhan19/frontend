import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const hotelService = createApi({
  reducerPath: "hotelService",
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
    createHotel: builder.mutation({
      query: (body) => ({
        url: `/hotel/new`,
        method: "POST",
        body: body,
      }),
    }),
    getHotels: builder.mutation({
      query: (body) => ({
        url: `/hotel/all`,
        method: "POST",
        body: body,
      }),
    }),
    getPost: builder.query({
      query: (postId) => ({
        url: `/post/single?postId=${postId}`,
        method: "GET",
      }),
    }),
    addRemoveFavPost: builder.mutation({
      query: (body) => ({
        url: `/post/favorite`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useGetHotelsMutation,
  useGetPostQuery,
  useAddRemoveFavPostMutation,
} = hotelService;
