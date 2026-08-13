import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock3, X } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, onSubmit, initialTask = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState({});
  const startTimeInput = useRef(null);
  const endTimeInput = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTitle(initialTask?.title || '');
    setDescription(initialTask?.description || '');
    setEndTime(initialTask?.endTime || '');

    if (initialTask?.dateTime) {
      const taskDate = new Date(initialTask.dateTime);
      setDate(taskDate.toISOString().split('T')[0]);
      setStartTime(`${String(taskDate.getHours()).padStart(2, '0')}:${String(taskDate.getMinutes()).padStart(2, '0')}`);
    } else {
      setDate(today);
      setStartTime('');
    }
    setErrors({});
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const openTimePicker = (input) => {
    if (input?.showPicker) {
      input.showPicker();
    } else {
      input?.focus();
    }
  };

  const formattedDate = date
    ? (() => {
        const parts = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }).formatToParts(new Date(`${date}T12:00:00`));
        const part = (type) => parts.find((item) => item.type === type)?.value;
        return `${part('weekday')} ${part('day')}, ${part('month')}`;
      })()
    : '';

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = 'Title is required';
    if (!date) nextErrors.date = 'Date is required';
    if (!startTime) nextErrors.startTime = 'Start time is required';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dateTime: new Date(`${date}T${startTime}:00`).toISOString(),
      endTime,
      status: initialTask ? initialTask.status : 'In Progress'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/25">
      <div className="w-full max-w-[390px] bg-white p-6 pb-8 shadow-2xl max-h-[82vh] overflow-y-auto sm:max-h-[570px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[18px] font-medium text-[#11152a]">{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={onClose} className="p-1 text-[#11152a] hover:text-primary" aria-label="Close form">
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[12px] text-[#70727d] mb-2">Task title</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Doing Homework" className={`w-full px-3 py-2.5 bg-white border ${errors.title ? 'border-danger-icon' : 'border-border'} rounded-none text-[13px] focus:outline-none focus:border-primary`} />
            {errors.title && <p className="text-[12px] text-danger-icon mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-[12px] text-[#70727d] mb-2">Set Time</label>
            <div className="grid grid-cols-2 gap-7">
              <button type="button" onClick={() => openTimePicker(startTimeInput.current)} className={`flex items-center h-[40px] border ${errors.startTime ? 'border-danger-icon' : 'border-border'} px-3 text-left text-[13px] text-[#11152a] cursor-pointer`}>
                <Clock3 className="inline-block w-4 h-4 mr-3 align-[-3px]" />{startTime || 'Start'}
              </button>
              <input ref={startTimeInput} type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="sr-only" aria-label="Start time" />
              <button type="button" onClick={() => openTimePicker(endTimeInput.current)} className="flex items-center h-[40px] border border-border px-3 text-left text-[13px] text-[#11152a] cursor-pointer">
                <Clock3 className="inline-block w-4 h-4 mr-3 align-[-3px]" />{endTime || 'Ends'}
              </button>
              <input ref={endTimeInput} type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} className="sr-only" aria-label="End time" />
            </div>
            {errors.startTime && <p className="text-[12px] text-danger-icon mt-1">{errors.startTime}</p>}
          </div>

          <div>
            <label className="block text-[12px] text-[#70727d] mb-2">Set Date</label>
            <label className={`relative flex h-[42px] items-center px-3 bg-white border ${errors.date ? 'border-danger-icon' : 'border-border'} text-[13px] text-[#11152a] cursor-pointer`}>
              {formattedDate}
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" aria-label="Set date" />
              <CalendarDays className="absolute right-3 top-2.5 w-4 h-4 text-[#202536] pointer-events-none" />
            </label>
            {errors.date && <p className="text-[12px] text-danger-icon mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-[12px] text-[#70727d] mb-2">Description</label>
            <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add Description" className="w-full px-3 py-3 bg-white border border-border rounded-none text-[13px] focus:outline-none focus:border-primary resize-none" />
          </div>

          <button type="submit" className="w-full py-3 bg-[#4966e8] hover:bg-primary-dark text-white rounded-none font-medium text-[15px] active:scale-[0.99] transition-all">
            {initialTask ? 'Save Changes' : 'Create task'}
          </button>
        </form>
      </div>
    </div>
  );
}
