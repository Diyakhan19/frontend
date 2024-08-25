import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const postService = createApi({
  reducerPath: "postService",
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
    createPost: builder.mutation({
      query: (body) => ({
        url: `/post/new`,
        method: "POST",
        body: body,
      }),
    }),
    deletePost: builder.mutation({
      query: (body) => ({
        url: `/post/delete`,
        method: "DELETE",
        body: body,
      }),
    }),
    getPosts: builder.mutation({
      query: (body) => ({
        url: `/post/all`,
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
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsMutation,
  useGetPostQuery,
  useAddRemoveFavPostMutation,
} = postService;
