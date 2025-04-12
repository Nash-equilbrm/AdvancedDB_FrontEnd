import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import forumReducer from '../features/forum/forumSlice'
import authReducer from '../features/auth/authSlice'
import threadReducer from '../features/thread/threadSlice'
import postReducer from '../features/post/postSlice'

export const store = configureStore({
  reducer: {
    forum: forumReducer,
    auth: authReducer,
    thread: threadReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
