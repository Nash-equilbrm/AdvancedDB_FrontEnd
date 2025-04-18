export interface Thread {
  id: number;
  title: string;
  level: number;
  user_id: number;
  parent_id: number;
  children_count: number;
}

export interface ThreadResponse {
  threads: Thread[];
  total: number;
}

export interface SimilarThread {
  id: number;
  title: string;
  user_id: number;
  category_id: number;
  children_count: number;
  updated_at: string;
  similarity: number;
}

export type SimilarThreadResponse = SimilarThread[]; 