import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const chatService = createApi({
  reducerPath: "chatService",
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
    createChat: builder.mutation({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body: body,
      }),
    }),
    getChats: builder.query({
      query: (body) => ({
        url: "/chat",
        method: "GET",
      }),
    }),
    getMessages: builder.query({
      query: ({ chatId }) => ({
        url: `/chat/messages?chatId=${chatId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/chat/message",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetChatsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatService;
