import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authService } from "./services/authService";
import { adminService } from "./services/adminService";
import { userService } from "./services/userService";
import { postService } from "./services/postService";
import { destService } from "./services/destService";

import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authService.reducerPath]: authService.reducer,
    [adminService.reducerPath]: adminService.reducer,
    [userService.reducerPath]: userService.reducer,
    [postService.reducerPath]: postService.reducer,
    [destService.reducerPath]: destService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authService.middleware,
      adminService.middleware,
      userService.middleware,
      postService.middleware,
      destService.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
