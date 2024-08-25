import { createSlice } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "cookies-next";

let user = {};
const token = getCookie("token");

if (typeof window !== undefined) {
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.log(err);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : {},
    isAuthenticated: token ? true : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      deleteCookie("token");
      state.isAuthenticated = false;
      state.user = {};
    },
    updateFavorites: (state, action) => {
      const favorites = [...state.user.favorites];

      if (action.payload.action === "added") {
        favorites.push({ postId: action.payload.postId });
      } else {
        const indx = favorites.findIndex(
          (item) => item.postId === action.payload.postId
        );
        favorites.splice(indx, 1);
      }

      const newUser = { ...state.user, favorites: favorites };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

export const { setUser, removeUser, updateFavorites } = authSlice.actions;

export default authSlice.reducer;
