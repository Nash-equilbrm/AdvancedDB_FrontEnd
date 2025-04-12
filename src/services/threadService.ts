import axios from 'axios';
import { ThreadResponse } from '../types/thread';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchThreads = async (
  threadId: number,
  parentThreadId: number,
  limit: number = 10,
  offset: number = 0
): Promise<ThreadResponse> => {
  const response = await axios.get(
    `${API_URL}/api/v1/thread/{threadId}/get_third_level_thread`,
    {
      params: {
        parent_thread_id:threadId,
        limit,
        offset,
      },
    }
  );
  return response.data;
}; 