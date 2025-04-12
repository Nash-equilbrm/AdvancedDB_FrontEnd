export interface Post {
  id: number;
  thread_id: number;
  user_id: number;
  content: string;
  quote_ids: number[];
  created_at: string;
  updated_at: string;
}

export type PostResponse = Post[]; 