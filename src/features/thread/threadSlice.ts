import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Thread, ThreadResponse } from '../../types/thread';

interface ThreadState {
  threads: Thread[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ThreadState = {
  threads: [],
  total: 0,
  loading: false,
  error: null,
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<ThreadResponse>) => {
      state.threads = action.payload.threads;
      state.total = action.payload.total;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setThreads, setLoading, setError } = threadSlice.actions;
export default threadSlice.reducer; 