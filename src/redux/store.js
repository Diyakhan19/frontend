import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { adminService } from "./services/adminService";
import { userService } from "./services/userService";
import { postService } from "./services/postService";
import { hotelService } from "./services/hotelService";
import { destService } from "./services/destService";
import { chatService } from "./services/chatService";
import { transportService } from "./services/transportService";
import { campingService } from "./services/campingService";

import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authService.reducerPath]: authService.reducer,
    [adminService.reducerPath]: adminService.reducer,
    [userService.reducerPath]: userService.reducer,
    [postService.reducerPath]: postService.reducer,
    [destService.reducerPath]: destService.reducer,
    [hotelService.reducerPath]: hotelService.reducer,
    [transportService.reducerPath]: transportService.reducer,
    [chatService.reducerPath]: chatService.reducer,
    [campingService.reducerPath]: campingService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authService.middleware,
      adminService.middleware,
      userService.middleware,
      postService.middleware,
      destService.middleware,
      hotelService.middleware,
      transportService.middleware,
      chatService.middleware,
      campingService.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
