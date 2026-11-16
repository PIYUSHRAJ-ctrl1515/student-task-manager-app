import { LayoutDashboard, ListTodo, Clock, CheckCircle2, Settings } from 'lucide-react';
import type { Filter } from '@/types';

interface SidebarProps {
  active: Filter | 'dashboard' | 'settings';
  onNavigate: (item: Filter | 'dashboard' | 'settings') => void;
}

const menuItems: { id: SidebarProps['active']; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'all', label: 'All Tasks', icon: ListTodo },
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-blue-950 text-white flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Task Manager</h1>
        <p className="text-xs text-blue-200/70 mt-0.5">Student edition</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-blue-200/60">
        Stay productive.
      </div>
    </aside>
  );
}
