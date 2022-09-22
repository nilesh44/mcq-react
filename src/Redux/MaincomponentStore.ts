import { configureStore } from "@reduxjs/toolkit";
// ...
import { default as mainComponentsliceReducer } from "./MainContentSlice";
export const mainComponentStore = configureStore({
  reducer: {
    mainComponents: mainComponentsliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof mainComponentStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mainComponentStore.dispatch;
