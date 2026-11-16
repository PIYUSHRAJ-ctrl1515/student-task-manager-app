import { useMemo, useState } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TaskFormModal, { type TaskDraft } from '@/components/TaskFormModal';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import type { Filter, Task } from '@/types';

const filterTabs: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
];

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(
    () =>
      tasks
        .filter((t) => (filter === 'all' ? true : filter === 'pending' ? !t.completed : t.completed))
        .sort((a, b) => b.createdAt - a.createdAt),
    [tasks, filter],
  );

  const handleSidebarNavigate = (item: Filter | 'dashboard' | 'settings') => {
    if (item === 'dashboard' || item === 'settings') {
      setFilter('all');
      return;
    }
    setFilter(item);
  };

  const openAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = (draft: TaskDraft) => {
    if (editingTask) {
      updateTask(editingTask.id, draft);
    } else {
      addTask(draft.title, draft.priority, draft.dueDate);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar active={filter} onNavigate={handleSidebarNavigate} />

      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between px-8 pt-6 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Organize your study tasks and stay productive.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Plus size={16} />
              Add Task
            </button>

            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                PR
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Piyush Raj</span>
            </div>
          </div>
        </div>

        <div className="px-8">
          <div className="flex gap-2 border-b border-slate-200">
            {filterTabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  filter === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                    filter === id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {counts[id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 py-6">
          {visibleTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ClipboardList size={40} className="text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500">No tasks here yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "Add Task" to create your first task.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleComplete}
                  onEdit={openEditModal}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TaskFormModal
        open={modalOpen}
        initial={editingTask
          ? { title: editingTask.title, priority: editingTask.priority, dueDate: editingTask.dueDate }
          : null}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
