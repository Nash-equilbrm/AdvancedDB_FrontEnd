import React from 'react';
import { SimilarThread } from '../../types/thread';
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
      <h3>Similar Threads</h3>
      <div className="threads-list">
        {threads.map((thread) => (
          <div key={thread.id} className="thread-item">
            <a href={`/thread/${thread.id}`} className="thread-title">
              {thread.title}
            </a>
            <div className="thread-meta">
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarThreads; 