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

export const submitPost = async (threadId: number, content: string): Promise<void> => {
  var access_token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/v1/thread/${threadId}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify({
      content,
      quote_ids: []
    })
  });

  if (!response.ok) {
    throw new Error('Failed to submit post');
  }
}; 