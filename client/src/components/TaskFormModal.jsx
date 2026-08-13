import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Tag } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, onSubmit, initialTask = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority || 'Medium');
      if (initialTask.dateTime) {
        const d = new Date(initialTask.dateTime);
        setDate(d.toISOString().split('T')[0]);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
      } else {
        const now = new Date();
        setDate(now.toISOString().split('T')[0]);
        setTime('10:00');
      }
    } else {
      const now = new Date();
      setTitle('');
      setDescription('');
      setDate(now.toISOString().split('T')[0]);
      setTime('10:00');
      setPriority('Medium');
    }
    setErrors({});
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dateTimeStr = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeStr).toISOString();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dateTime,
      priority,
      status: initialTask ? initialTask.status : 'In Progress'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="w-full max-w-md bg-surface rounded-t-card sm:rounded-card p-6 shadow-2xl transition-transform duration-300 transform translate-y-0 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
          <h2 className="text-[20px] font-bold text-text-primary">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-page-bg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Complete landing page prototype"
              className={`w-full px-4 py-3 bg-page-bg border ${
                errors.title ? 'border-danger-icon' : 'border-border'
              } rounded-input text-[14px] focus:outline-none focus:border-primary transition-all`}
            />
            {errors.title && <p className="text-[12px] text-danger-icon mt-1">{errors.title}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3 py-2.5 bg-page-bg border ${
                  errors.date ? 'border-danger-icon' : 'border-border'
                } rounded-input text-[13px] focus:outline-none focus:border-primary`}
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-text-secondary mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> Time *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full px-3 py-2.5 bg-page-bg border ${
                  errors.time ? 'border-danger-icon' : 'border-border'
                } rounded-input text-[13px] focus:outline-none focus:border-primary`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add extra details, notes, or subtasks..."
              className="w-full px-4 py-3 bg-page-bg border border-border rounded-input text-[14px] focus:outline-none focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[13px] font-medium text-text-secondary mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-primary" /> Priority
            </label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-input text-[13px] font-medium transition-all ${
                    priority === p
                      ? p === 'High'
                        ? 'bg-danger-bg text-danger-icon border border-danger-icon/40 font-semibold'
                        : p === 'Medium'
                        ? 'bg-amber-100 text-amber-700 border border-amber-300 font-semibold'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold'
                      : 'bg-page-bg text-text-secondary border border-border hover:bg-border/30'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-input font-semibold text-[15px] shadow-md shadow-primary/30 active:scale-[0.99] transition-all"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
