import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-text-primary">
      <section className="w-full min-h-screen bg-white px-[22px] pt-6">
        <div>
          <button
            onClick={onBack}
            className="p-1 mb-7 text-[#11152a] hover:text-primary transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.8]" />
          </button>
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Finish"
              className="w-full px-5 pr-10 py-[13px] bg-white border border-[#e4e4e4] rounded-[5px] text-[12px] text-text-primary placeholder:text-[#929292] focus:outline-none focus:border-primary transition-all"
            />
            <SearchIcon className="w-5 h-5 text-[#0d1327] absolute right-4 top-[13px] pointer-events-none" />
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
      <main className="mt-7">

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onView={onViewTaskDetail}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-surface p-8 border border-border text-center my-6 space-y-3">
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
      </section>
    </div>
  );
}
