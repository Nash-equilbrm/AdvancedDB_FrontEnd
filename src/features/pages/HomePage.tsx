import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLoading, setError } from '../forum/forumSlice';
import { fetchForumCategories } from '../../services/forumService';
import { RootState } from '../../app/store';
import CategoryList from '../components/CategoryList';
import './HomePage.css'; // Make sure to import the CSS file

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.forum);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchForumCategories();
        dispatch(setCategories(data));
      } catch (err) {
        dispatch(setError('Failed to load categories'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCategories();
  }, [dispatch]);

  if (loading) return <div className="center-container">Loading...</div>;
  if (error) return <div className="center-container">Error: {error}</div>;

  return (
    <div className="center-container">
      <div className="homepage-content">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default HomePage;
