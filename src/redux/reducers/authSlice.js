import { createSlice, current } from "@reduxjs/toolkit";
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
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      localStorage.removeItem("user");
      deleteCookie("token");
      state.isAuthenticated = false;
      state.user = {};
    },
    updateFavorites: (state, action) => {
      const key = action.payload.key;
      const data = action.payload.data;

      const user = current(state.user);

      const favorites = [...user.favorites];

      if (data.action === "added") {
        const obj =
          key === "post"
            ? { postId: data.postId }
            : { destinationId: data.destinationId };

        favorites.push(obj);
      } else {
        let indx = -1;
        indx =
          key === "post"
            ? favorites.findIndex((item) => item.postId === data.postId)
            : favorites.findIndex(
                (item) => item.destinationId === data.destinationId
              );

        if (indx > -1) {
          favorites.splice(indx, 1);
        }
      }

      const newUser = { ...user, favorites: favorites };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    updateLikes: (state, action) => {
      const user = current(state.user);
      const type = action.payload.action;
      const likes = [...user.likes];
      if (type === "liked") {
        likes.push(action.payload.destinationId);
      } else {
        const indx = likes.indexOf(action.payload.destinationId);
        if (indx > -1) {
          likes.splice(indx, 1);
        }
      }
      const newUser = { ...user, likes: likes };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    updateVisited: (state, action) => {
      const user = current(state.user);
      const visited = [...user.visited];
      visited.push(action.payload.destinationId);
      const newUser = { ...user, visited: visited };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    updateBookmarks: (state, action) => {
      const user = current(state.user);
      const newUser = { ...user, bookmarks: action.payload };
      state.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

export const {
  setUser,
  removeUser,
  updateFavorites,
  updateLikes,
  updateVisited,
  updateBookmarks,
} = authSlice.actions;

export default authSlice.reducer;
