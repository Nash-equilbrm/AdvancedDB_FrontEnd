import React from 'react';
import { Post } from '../types/post';
import './PostList.css';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-block"
        >
          <div className="post-header">
            <div className="user-info">
              <div className="user-avatar">
                <span className="avatar-text">
                  User #{post.user_id}
                </span>
              </div>
              <div className="post-meta">
                <span className="post-time">{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          {post.quote_ids.length > 0 && (
            <div className="quoted-posts">
              <div className="quote-icon">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="quote-text">Quoted posts: {post.quote_ids.join(', ')}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList; 