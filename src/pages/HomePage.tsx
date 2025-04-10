import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ForumCategory } from '../types/forum';
import { setCategories, setLoading, setError } from '../features/forum/forumSlice';
import { fetchForumCategories } from '../services/forumService';
import { RootState } from '../app/store';
import CategoryList from '../components/CategoryList';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.forum);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchForumCategories();
        console.log(data);

        dispatch(setCategories(data));
      } catch (err) {
        dispatch(setError('Failed to load categories'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCategories();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryList categories={categories} />
    </div>
  );
};

export default HomePage; 