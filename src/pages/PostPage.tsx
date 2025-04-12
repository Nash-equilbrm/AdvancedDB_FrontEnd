import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setPosts, setLoading, setError } from '../features/post/postSlice';
import { fetchPosts } from '../services/postService';
import PostList from '../components/PostList';

const ITEMS_PER_PAGE = 10;

const PostPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const loadPosts = async () => {
      if (!threadId) return;

      try {
        dispatch(setLoading(true));
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const data = await fetchPosts(parseInt(threadId), ITEMS_PER_PAGE, offset);
        dispatch(setPosts(data));
      } catch (err) {
        dispatch(setError('Failed to load posts'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPosts();
  }, [dispatch, threadId, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <PostList posts={posts} />
      
      {/* Pagination */}
      {posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={posts.length < ITEMS_PER_PAGE}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PostPage; 