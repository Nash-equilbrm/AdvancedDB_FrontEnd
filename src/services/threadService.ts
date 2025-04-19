import axios from 'axios';
import { ThreadResponse, SimilarThreadResponse } from '../types/thread';

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
        category_id:threadId,
        limit,
        offset,
      },
    }
  );
  return response.data;
};

export const fetchSimilarThreads = async (
  threadId: number
): Promise<SimilarThreadResponse> => {
  const response = await axios.get(
    `${API_URL}/api/v1/thread/similar_threads`,
    {
      params: {
        thread_id: threadId,
      },
    }
  );
  return response.data;
};

export const fetchTrendingThreads = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/thread/trending/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending threads:', error);
    throw error;
  }
}; 