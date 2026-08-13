import React from 'react';
import { Check, SquarePen, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggleStatus, onEdit, onDelete, onView, showActions = true }) {
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
    <div className="w-full h-[62px] border-b border-[#ededed] flex items-center gap-3">
      {/* Checkbox status toggle */}
      <button
        onClick={() => onToggleStatus && onToggleStatus(task._id, task.status)}
        className={`w-5 h-5 flex items-center justify-center border transition-all flex-shrink-0 ${
          isCompleted
            ? 'border-[#5774f1] bg-white text-[#4966e8]'
            : 'border-[#5774f1] bg-white hover:border-primary'
        }`}
        title={isCompleted ? "Mark as In Progress" : "Mark as Completed"}
      >
        {isCompleted && <Check className="w-3 h-3 stroke-[2]" />}
      </button>

      {/* Task Details */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView && onView(task)}>
          <h4
            className={`text-[14px] font-medium text-[#11152a] truncate ${
              isCompleted ? 'line-through text-[#11152a] font-normal' : ''
            }`}
          >
            {task.title}
          </h4>
      </div>

      {/* Action Buttons */}
      {showActions && <div className="flex items-center space-x-1 flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete && onDelete(task._id); }}
          className="p-1 text-[#c1c1c1] hover:text-danger-icon transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit && onEdit(task); }}
          className="p-1 text-[#c1c1c1] hover:text-primary transition-colors"
          title="Edit task"
        >
          <SquarePen className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>}
    </div>
  );
}
