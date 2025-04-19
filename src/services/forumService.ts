import axios from 'axios';
import { ForumCategory } from '../types/forum';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const fetchForumCategories = async (): Promise<ForumCategory[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/thread/homepage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: number): Promise<{ username: string }> => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

export const fetchTrendingThreads = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/thread/trending/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending threads:', error);
    throw error;
  }
}; 