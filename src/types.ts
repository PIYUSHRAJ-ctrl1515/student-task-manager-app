export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: number;
}

export type Filter = 'all' | 'pending' | 'completed';
