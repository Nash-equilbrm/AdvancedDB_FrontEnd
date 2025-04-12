import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setPosts, setLoading, setError } from '../post/postSlice';
import { fetchPosts, submitPost } from '../../services/postService';
import { fetchSimilarThreads } from '../../services/threadService';
import PostList from '../components/PostList';
import SimilarThreads from '../components/SimilarThreads.tsx';
import { SimilarThread } from '../../types/thread';
import './PostPage.css';

const ITEMS_PER_PAGE = 10;

const PostPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postContent, setPostContent] = useState('');
  const [pageInput, setPageInput] = useState('');
  const [similarThreads, setSimilarThreads] = useState<SimilarThread[]>([]);
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

  useEffect(() => {
    const loadSimilarThreads = async () => {
      if (!threadId) return;

      try {
        const data = await fetchSimilarThreads(parseInt(threadId));
        setSimilarThreads(data);
      } catch (err) {
        console.error('Failed to load similar threads:', err);
      }
    };

    loadSimilarThreads();
  }, [threadId]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handlePostSubmit = async () => {
    if (!threadId) return;

    try {
      await submitPost(parseInt(threadId), postContent);
      
      // Clear the textarea after successful submission
      setPostContent('');
      
      // Refresh the posts list
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const data = await fetchPosts(parseInt(threadId), ITEMS_PER_PAGE, offset);
      dispatch(setPosts(data));
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInput);
    if (page && page > 0) {
      handlePageChange(page);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <PostList posts={posts} />
      
      {/* Post Input Section */}
      <div className="post-submit-container mt-8">
        <div className="post-input-container bg-white rounded-lg shadow-md p-4 mx-[80px]">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your post here..."
            className="w-full h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="post-submit-button-container">
            <button
              onClick={handlePostSubmit}
              className="post-submit-button px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Đăng bài
            </button>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      {posts.length > 0 && (
        <div className="pagination-container flex justify-center mt-8">
          <div className="pagination-buttons flex space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button pagination-button-prev"
            >
              Previous
            </button>
            
            <div className="page-input-container flex items-center space-x-2">
              <input
                type="number"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                placeholder="Page"
                className="page-input"
              />
              <button
                onClick={handlePageInputSubmit}
                className="pagination-button pagination-button-go"
              >
                Go
              </button>
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={posts.length < ITEMS_PER_PAGE}
              className="pagination-button pagination-button-next"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Similar Threads */}
      {similarThreads.length > 0 && (
        <SimilarThreads threads={similarThreads} />
      )}
    </div>
  );
};

export default PostPage; 