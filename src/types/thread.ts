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