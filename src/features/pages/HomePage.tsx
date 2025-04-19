import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLoading, setError } from '../forum/forumSlice';
import { fetchForumCategories, fetchTrendingThreads, fetchUserById } from '../../services/forumService';
import { RootState } from '../../app/store';
import CategoryList from '../components/CategoryList';
import './HomePage.css'; // Make sure to import the CSS file

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state: RootState) => state.forum);
  const [trendingThreads, setTrendingThreads] = React.useState<any[]>([]);
  const [trendingLoading, setTrendingLoading] = React.useState(true);
  const [trendingError, setTrendingError] = React.useState<string | null>(null);
  const [userNames, setUserNames] = React.useState<Record<number, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(setLoading(true));
        setTrendingLoading(true);
        
        const [categoriesData, trendingData] = await Promise.all([
          fetchForumCategories(),
          fetchTrendingThreads()
        ]);
        
        dispatch(setCategories(categoriesData));
        setTrendingThreads(trendingData);

        // Fetch usernames for all unique user IDs
        const uniqueUserIds = [...new Set(trendingData.map(thread => thread.user_id))];
        const usernamePromises = uniqueUserIds.map(async (userId) => {
          try {
            const userData = await fetchUserById(userId);
            return { userId, username: userData.username };
          } catch (error) {
            return { userId, username: `${userId}` };
          }
        });

        const usernameResults = await Promise.all(usernamePromises);
        const usernameMap = usernameResults.reduce((acc, { userId, username }) => {
          acc[userId] = username;
          return acc;
        }, {} as Record<number, string>);

        setUserNames(usernameMap);
      } catch (err) {
        dispatch(setError('Failed to load data'));
        setTrendingError('Failed to load trending threads');
      } finally {
        dispatch(setLoading(false));
        setTrendingLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  if (loading || trendingLoading) return <div className="center-container">Loading...</div>;
  if (error) return <div className="center-container">Error: {error}</div>;

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <CategoryList categories={categories} />
      </div>
      <div className="trending-content">
        <h2>Trending Threads</h2>
        {trendingError ? (
          <div>Error: {trendingError}</div>
        ) : (
          <div className="trending-list">
            {trendingThreads.map((thread) => (
              <div key={thread.id} className="trending-item">
                <h3>{thread.title}</h3>
                <p>{thread.description}</p>
                <div className="trending-stats">
                  <span>User: {userNames[thread.user_id] || `${thread.user_id}`}</span>
                  <span>Category ID: {thread.category_id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
