import React, { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { fetchPostsByIds } from '../../services/postService';
import './PostList.css';

interface PostListProps {
  posts: Post[];
}

interface QuotedPost {
  [key: number]: Post;
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [quotedPosts, setQuotedPosts] = useState<QuotedPost>({});
  const [loadingQuotes, setLoadingQuotes] = useState<{ [key: number]: boolean }>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const loadQuotedPosts = async (postId: number, quoteIds: number[]) => {
    if (quoteIds.length === 0) return;
    
    setLoadingQuotes(prev => ({ ...prev, [postId]: true }));
    try {
      const quotedPostsData = await fetchPostsByIds(quoteIds);
      const quotedPostsMap = quotedPostsData.flat().reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {} as QuotedPost);
      
      setQuotedPosts(prev => ({ ...prev, ...quotedPostsMap }));
    } catch (error) {
      console.error('Error loading quoted posts:', error);
    } finally {
      setLoadingQuotes(prev => ({ ...prev, [postId]: false }));
    }
  };

  useEffect(() => {
    // Load quoted posts for all posts that have quotes
    posts.forEach(post => {
      if (post.quote_ids.length > 0) {
        loadQuotedPosts(post.id, post.quote_ids);
      }
    });
  }, [posts]);

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-block"
        >
          {post.quote_ids.length > 0 && (
            <div className="quoted-posts-container">
              {post.quote_ids.map(quoteId => {
                const quotedPost = quotedPosts[quoteId];
                if (!quotedPost) {
                  return loadingQuotes[post.id] ? (
                    <div key={quoteId} className="quoted-post loading">
                      Loading quoted post...
                    </div>
                  ) : null;
                }
                return (
                  <div key={quoteId} className="quoted-post">
                    <div className="quoted-post-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          <span className="avatar-text">
                            User #{quotedPost.user_id}
                          </span>
                        </div>
                        <div className="post-meta">
                          <span className="post-time">{formatDate(quotedPost.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="quoted-post-content">
                      <p>{quotedPost.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
        </div>
      ))}
    </div>
  );
};

export default PostList; 