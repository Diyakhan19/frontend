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
  }),
});

export const { useAddRemoveFavDestMutation } = destService;
