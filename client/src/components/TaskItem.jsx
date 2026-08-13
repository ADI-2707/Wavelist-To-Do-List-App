import React from 'react';
import { Check, Edit2, Trash2, Clock, AlertCircle } from 'lucide-react';

export default function TaskItem({ task, onToggleStatus, onEdit, onDelete, onView }) {
  const isCompleted = task.status === 'Completed';

  // Format time (e.g., "02:30 PM")
  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-danger-bg text-danger-icon border-danger-icon/30';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'Low':
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
    }
  };

  return (
    <div
      className={`w-full bg-surface rounded-card p-4 border transition-all duration-200 flex items-start justify-between gap-3 shadow-sm hover:shadow-md ${
        isCompleted ? 'border-border opacity-75' : 'border-border hover:border-primary/40'
      }`}
    >
      {/* Checkbox status toggle */}
      <button
        onClick={() => onToggleStatus && onToggleStatus(task._id, task.status)}
        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${
          isCompleted
            ? 'bg-primary border-primary text-white shadow-sm shadow-primary/30'
            : 'border-border bg-white hover:border-primary'
        }`}
        title={isCompleted ? "Mark as In Progress" : "Mark as Completed"}
      >
        {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </button>

      {/* Task Details */}
      <div className="flex-1 min-w-0" onClick={() => onView && onView(task)}>
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h4
            className={`text-[14px] font-semibold text-text-primary truncate cursor-pointer ${
              isCompleted ? 'line-through text-text-muted font-normal' : ''
            }`}
          >
            {task.title}
          </h4>
          {task.priority && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPriorityStyle(task.priority)}`}>
              {task.priority}
            </span>
          )}
        </div>

        {task.description && (
          <p className={`text-[12px] line-clamp-1 mb-2 ${isCompleted ? 'text-text-muted' : 'text-text-secondary'}`}>
            {task.description}
          </p>
        )}

        <div className="flex items-center text-[11px] text-text-muted gap-1 mt-1">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>{formatTime(task.dateTime)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit && onEdit(task); }}
          className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-light transition-colors"
          title="Edit task"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(task._id); }}
          className="p-1.5 rounded-lg text-text-secondary hover:text-danger-icon hover:bg-danger-bg transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
