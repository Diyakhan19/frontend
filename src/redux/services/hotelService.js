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
    addRoom: builder.mutation({
      query: (body) => ({
        url: `/hotel/room`,
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
    getHotel: builder.query({
      query: (postId) => ({
        url: `/hotel/single?hotelId=${postId}`,
        method: "GET",
      }),
    }),
    booking: builder.mutation({
      query: (body) => ({
        url: `/hotel/booking`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useAddRoomMutation,
  useGetHotelsMutation,
  useGetHotelQuery,
  useBookingMutation,
} = hotelService;
