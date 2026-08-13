import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import TaskItem from '../components/TaskItem';

export default function Search({
  allTasks = [],
  onBack,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onViewTaskDetail
}) {
  const [query, setQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(allTasks);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredTasks(allTasks);
    } else {
      const q = query.toLowerCase();
      setFilteredTasks(
        allTasks.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            (t.description && t.description.toLowerCase().includes(q))
        )
      );
    }
  }, [query, allTasks]);

  return (
    <div className="min-h-screen bg-page-bg pb-12 text-text-primary">
      {/* Search Header */}
      <header className="bg-surface border-b border-border px-4 py-3 sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-page-bg transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword..."
              className="w-full pl-9 pr-9 py-2.5 bg-page-bg border border-border rounded-input text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all"
            />
            <SearchIcon className="w-4 h-4 text-text-secondary absolute left-3 top-3 pointer-events-none" />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-text-muted hover:text-text-primary p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between text-[13px] text-text-secondary px-1">
          <span>
            {query ? `Search results for "${query}"` : 'All tasks'}
          </span>
          <span className="font-semibold text-text-primary">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onView={onViewTaskDetail}
              />
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-card p-8 border border-border text-center my-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-danger-bg text-danger-icon flex items-center justify-center mx-auto">
              <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary">No tasks found</h3>
            <p className="text-[13px] text-text-secondary max-w-xs mx-auto">
              We couldn't find any tasks matching "{query}". Try searching with a different keyword.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
