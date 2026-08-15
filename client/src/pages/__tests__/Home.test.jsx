import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';

describe('Home Page Component', () => {
  const sampleTasks = [
    {
      _id: 't-1',
      title: 'Review Frontend PR',
      description: 'Check styling and tests',
      dateTime: new Date().toISOString(),
      status: 'In Progress',
      priority: 'High'
    },
    {
      _id: 't-2',
      title: 'Deploy to Staging',
      description: 'Verify deployment link',
      dateTime: new Date().toISOString(),
      status: 'Completed',
      priority: 'Medium'
    }
  ];

  it('renders stats, search bar, and task cards', () => {
    render(
      <Home
        tasks={sampleTasks}
        loading={false}
        onOpenSearch={vi.fn()}
        onToggleStatus={vi.fn()}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onOpenNewTaskModal={vi.fn()}
        onViewTaskDetail={vi.fn()}
      />
    );

    expect(screen.getByText('Tasks Today')).toBeInTheDocument();
    expect(screen.getByText('Review Frontend PR')).toBeInTheDocument();
    expect(screen.getByText('Deploy to Staging')).toBeInTheDocument();
  });

  it('opens search view when search bar is focused', () => {
    const handleOpenSearch = vi.fn();
    render(
      <Home
        tasks={sampleTasks}
        loading={false}
        onOpenSearch={handleOpenSearch}
        onToggleStatus={vi.fn()}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onOpenNewTaskModal={handleOpenNewTaskModal => vi.fn()}
        onViewTaskDetail={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search for a task');
    fireEvent.focus(searchInput);

    expect(handleOpenSearch).toHaveBeenCalledTimes(1);
  });
});
