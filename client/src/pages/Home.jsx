import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DayStrip from '../components/DayStrip';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import FAB from '../components/FAB';
import waveLogo from '../assets/wavelist-logo.svg';
import { Calendar, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Home({
  tasks,
  loading,
  onOpenSearch,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onOpenNewTaskModal,
  onViewTaskDetail,
  onRefresh
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);

  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter((t) => {
    if (!t.dateTime) return false;
    const taskDateStr = new Date(t.dateTime).toISOString().split('T')[0];
    return taskDateStr === selectedDateStr;
  });

  // Calculate week progress statistics
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'In Progress').length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-page-bg pb-24 text-text-primary">
      {/* App Header */}
      <header className="bg-surface border-b border-border px-4 py-3.5 sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={waveLogo} alt="Wavelist Logo" className="w-8 h-8 rounded-xl shadow-sm" />
            <div>
              <h1 className="text-[18px] font-bold text-text-primary leading-tight">Wavelist</h1>
              <p className="text-[11px] text-text-secondary font-medium">Ride the wave of productivity</p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="p-2 rounded-full text-text-secondary hover:text-primary hover:bg-primary-light/50 transition-colors"
            title="Refresh tasks"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Container (Mobile Max Width Enforced for Desktop) */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Search Bar (Navigates to Search Page on Focus/Click) */}
        <SearchBar
          value=""
          onChange={() => {}}
          onFocus={onOpenSearch}
          placeholder="Search task..."
        />

        {/* Day Strip Navigation */}
        <DayStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          weekOffset={weekOffset}
          onChangeWeek={setWeekOffset}
        />

        {/* Stat Cards (Complete / Pending) */}
        <div className="flex gap-3">
          <StatCard type="complete" count={completedCount} total={totalCount} />
          <StatCard type="pending" count={pendingCount} total={totalCount} />
        </div>

        {/* Weekly Progress Bar */}
        <ProgressBar completed={completedCount} total={totalCount} />

        {/* Tasks Section Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-bold text-text-primary">Tasks Today</h2>
            <span className="bg-primary-light text-primary text-[12px] font-semibold px-2 py-0.5 rounded-full">
              {tasksForSelectedDate.length}
            </span>
          </div>
          <button
            onClick={onOpenSearch}
            className="text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View All
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-20 bg-surface rounded-card animate-pulse border border-border" />
            ))}
          </div>
        ) : tasksForSelectedDate.length > 0 ? (
          <div className="space-y-3">
            {tasksForSelectedDate.map((task) => (
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
          <div className="bg-surface rounded-card p-8 border border-border text-center my-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary">No tasks for this day</h3>
            <p className="text-[13px] text-text-secondary max-w-xs mx-auto">
              Your schedule is clear! Tap the + button to add a new task to your wavelist.
            </p>
          </div>
        )}
      </main>

      {/* Floating Add Task Button */}
      <FAB onClick={onOpenNewTaskModal} />
    </div>
  );
}
