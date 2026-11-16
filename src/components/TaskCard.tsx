import { Pencil, Trash2, CalendarDays } from 'lucide-react';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityStyles: Record<Task['priority'], string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-emerald-100 text-emerald-700',
};

function formatDueDate(dueDate: string) {
  if (!dueDate) return 'No due date';
  const date = new Date(dueDate + 'T00:00:00');
  if (Number.isNaN(date.getTime())) return dueDate;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const badgeClass = task.completed ? 'bg-emerald-100 text-emerald-700' : priorityStyles[task.priority];
  const badgeLabel = task.completed ? 'Completed' : task.priority;

  return (
    <div className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-4 flex items-start gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
      />

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-medium leading-snug ${
            task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
          }`}
        >
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
            {badgeLabel}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <CalendarDays size={13} />
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          aria-label={`Edit "${task.title}"`}
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          aria-label={`Delete "${task.title}"`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
