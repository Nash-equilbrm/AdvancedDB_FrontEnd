import React from 'react';
import { SimilarThread } from '../../types/thread';
import { Link } from 'react-router-dom';
import './SimilarThreads.css';

interface SimilarThreadsProps {
  threads: SimilarThread[];
}

const SimilarThreads: React.FC<SimilarThreadsProps> = ({ threads }) => {
  if (!threads || threads.length === 0) {
    return null;
  }

  return (
    <div className="similar-threads">
      <h3>Chủ đề tương tự</h3>
      <div className="threads-list">
        {threads.map((thread) => (
          <div key={thread.id} className="thread-item">
            <Link to={`/thread/${thread.id}/posts`} className="thread-title">
              {thread.title}
            </Link>
            <div className="thread-meta">
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarThreads; 