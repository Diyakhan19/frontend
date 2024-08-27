import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const destService = createApi({
  reducerPath: "destService",
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
    addRemoveFavDest: builder.mutation({
      query: (body) => ({
        url: `/destination/favorite`,
        method: "POST",
        body: body,
      }),
    }),
    likeUnlikeDestination: builder.mutation({
      query: (body) => ({
        url: `/destination/like`,
        method: "POST",
        body: body,
      }),
    }),
    getDestById: builder.query({
      query: (destId) => ({
        url: `/destination/single?destinationId=${destId}`,
        method: "GET",
      }),
    }),
    visitedDestination: builder.mutation({
      query: (body) => ({
        url: `/destination/visited`,
        method: "POST",
        body: body,
      }),
    }),
    saveReview: builder.mutation({
      query: (body) => ({
        url: `/destination/review`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useAddRemoveFavDestMutation,
  useGetDestByIdQuery,
  useLikeUnlikeDestinationMutation,
  useVisitedDestinationMutation,
  useSaveReviewMutation,
} = destService;
