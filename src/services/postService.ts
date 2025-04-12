import axios from 'axios';
import { PostResponse } from '../types/post';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchPosts = async (
  threadId: number,
  limit: number = 10,
  offset: number = 0
): Promise<PostResponse> => {
  const response = await axios.get(
    `${API_URL}/api/v1/thread/${threadId}/posts`,
    {
      params: {
        limit,
        offset,
      },
    }
  );
  return response.data;
}; 