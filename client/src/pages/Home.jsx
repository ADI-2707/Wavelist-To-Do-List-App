import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DayStrip from '../components/DayStrip';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import FAB from '../components/FAB';
import { Bell, Calendar, Search, Settings } from 'lucide-react';

export default function Home({
  tasks,
  loading,
  onOpenSearch,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onOpenNewTaskModal,
  onViewTaskDetail,
  onRefresh,
  isAddingTask = false
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
  const hasTasksToday = tasksForSelectedDate.length > 0;
  const activeTaskDates = tasks
    .filter((task) => task.status === 'In Progress' && task.dateTime)
    .map((task) => new Date(task.dateTime).toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <main className="relative w-full min-h-screen bg-white px-[22px] pt-8 pb-28">
        {isAddingTask ? (
          <div className="flex items-center justify-between mb-7">
            <button type="button" className="p-1 text-[#11152a]" aria-label="Settings">
              <Settings className="w-5 h-5 stroke-[1.8]" />
            </button>
            <div className="flex items-center gap-5 text-[#11152a]">
              <button type="button" onClick={onOpenSearch} className="p-1" aria-label="Search">
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>
              <button type="button" className="p-1" aria-label="Notifications">
                <Bell className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>
          </div>
        ) : (
          <SearchBar
            value=""
            onChange={() => {}}
            onFocus={onOpenSearch}
            placeholder="Search for a task"
          />
        )}

        {/* Day Strip Navigation */}
        <DayStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          weekOffset={weekOffset}
          onChangeWeek={setWeekOffset}
          activeTaskDates={activeTaskDates}
        />

        {/* Stat Cards (Complete / Pending) */}
        <div className="flex gap-4">
          <StatCard type="complete" count={completedCount} total={totalCount} />
          <StatCard type="pending" count={pendingCount} total={totalCount} />
        </div>

        {/* Weekly Progress Bar */}
        <ProgressBar completed={completedCount} total={totalCount} />

        {/* Tasks Section Header */}
        <div className="flex items-center justify-between pt-0">
            <h2 className="text-[17px] font-semibold text-[#0b1022]">Tasks Today</h2>
          <button
            onClick={onOpenSearch}
            className="text-[13px] font-medium text-[#4966e8] hover:text-primary-dark transition-colors"
          >
            View All
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="space-y-0 py-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-14 bg-surface animate-pulse border-b border-border" />
            ))}
          </div>
        ) : hasTasksToday ? (
          <div className="mt-2">
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
          <div className="my-4 text-center">
            <div className="bg-surface p-8 border border-border space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary">No tasks for this day</h3>
              <p className="text-[13px] text-text-secondary max-w-xs mx-auto">
                Your schedule is clear! Tap the + button to add a new task to your wavelist.
              </p>
            </div>
            <FAB onClick={onOpenNewTaskModal} inline />
          </div>
        )}
      </main>

      {/* Floating Add Task Button */}
      {!loading && hasTasksToday && <FAB onClick={onOpenNewTaskModal} />}
    </div>
  );
}
