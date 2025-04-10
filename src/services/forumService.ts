import axios from 'axios';
import { ForumCategory } from '../types/forum';

const API_URL = 'http://localhost:8000/api/v1/thread/homepage';

export const fetchForumCategories = async (): Promise<ForumCategory[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    throw error;
  }
}; 