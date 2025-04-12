import React from 'react';
import { Link } from 'react-router-dom';
import { SimilarThread } from '../types/thread';
import './SimilarThreads.css';

interface SimilarThreadsProps {
  threads: SimilarThread[];
}

const SimilarThreads: React.FC<SimilarThreadsProps> = ({ threads }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="similar-threads-container">
      <h2 className="similar-threads-title">Các chủ đề liên quan</h2>
      <div className="similar-threads-list">
        {threads.map((thread) => (
          <Link
            key={thread.id}
            to={`/thread/${thread.id}/posts`}
            className="similar-thread-item"
          >
            <div className="similar-thread-content">
              <h3 className="similar-thread-title">{thread.title}</h3>
              <div className="similar-thread-meta">
                <span className="similar-thread-replies">
                  {thread.children_count} trả lời
                </span>
                <span className="similar-thread-date">
                  {formatDate(thread.updated_at)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarThreads; 