export interface ForumCategory {
  id: number;
  title: string;
  level: number;
  user_id: number;
  parent_id: number | null;
  children_count: number;
  children: ForumCategory[];
}

export interface ForumState {
  categories: ForumCategory[];
  loading: boolean;
  error: string | null;
} 