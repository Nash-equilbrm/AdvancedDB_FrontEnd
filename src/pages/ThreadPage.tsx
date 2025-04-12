import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setThreads, setLoading, setError } from '../features/thread/threadSlice';
import { fetchThreads } from '../services/threadService';
import ThreadList from '../components/ThreadList';

const ITEMS_PER_PAGE = 10;

const ThreadPage: React.FC = () => {
  const { threadId, parentThreadId } = useParams<{
    threadId: string;
    parentThreadId: string;
  }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { threads, total, loading, error } = useSelector((state: RootState) => state.thread);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const loadThreads = async () => {
      if (!threadId || !parentThreadId) return;

      try {
        dispatch(setLoading(true));
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const data = await fetchThreads(
          parseInt(threadId),
          parseInt(parentThreadId),
          ITEMS_PER_PAGE,
          offset
        );
        dispatch(setThreads(data));
      } catch (err) {
        dispatch(setError('Failed to load threads'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadThreads();
  }, [dispatch, threadId, parentThreadId, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Threads</h1>
      <ThreadList threads={threads} />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
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

export default ThreadPage; 