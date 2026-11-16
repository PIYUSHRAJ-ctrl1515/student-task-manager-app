import { useEffect, useState } from 'react';
import type { Task } from '@/types';

const STORAGE_KEY = 'task-manager-tasks';

function createSampleTasks(): Task[] {
  const today = new Date();
  const inDays = (d: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    return date.toISOString().slice(0, 10);
  };

  return [
    { id: crypto.randomUUID(), title: 'Complete DSA Assignment', priority: 'High', dueDate: inDays(1), completed: false, createdAt: 1 },
    { id: crypto.randomUUID(), title: 'Study Operating Systems', priority: 'Medium', dueDate: inDays(-1), completed: true, createdAt: 2 },
    { id: crypto.randomUUID(), title: 'Prepare CN Practical File', priority: 'Medium', dueDate: inDays(3), completed: false, createdAt: 3 },
    { id: crypto.randomUUID(), title: 'Finish Web Development Project', priority: 'Low', dueDate: inDays(7), completed: true, createdAt: 4 },
  ];
}

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSampleTasks();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return createSampleTasks();
    return parsed;
  } catch {
    return createSampleTasks();
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Task['priority'], dueDate: string) => {
    setTasks((prev) => [
      { id: crypto.randomUUID(), title, priority, dueDate, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
}
