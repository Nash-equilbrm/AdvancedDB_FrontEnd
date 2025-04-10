import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForumCategory, ForumState } from '../../types/forum';

const initialState: ForumState = {
  categories: [],
  loading: false,
  error: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ForumCategory[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = forumSlice.actions;
export default forumSlice.reducer; 