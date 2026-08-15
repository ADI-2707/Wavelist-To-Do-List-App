import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from '../TaskItem';

describe('TaskItem Component', () => {
  const sampleTask = {
    _id: 'task-100',
    title: 'Design UI Mockups',
    description: 'Create high fidelity Figma designs',
    dateTime: new Date(2026, 7, 15, 14, 30).toISOString(),
    endTime: '15:30',
    priority: 'High',
    status: 'In Progress'
  };

  it('renders task title correctly', () => {
    render(<TaskItem task={sampleTask} />);
    expect(screen.getByText('Design UI Mockups')).toBeInTheDocument();
  });

  it('triggers status toggle when status check button is clicked', () => {
    const handleToggleStatus = vi.fn();
    render(<TaskItem task={sampleTask} onToggleStatus={handleToggleStatus} />);
    
    const toggleButton = screen.getByTitle('Mark as Completed');
    fireEvent.click(toggleButton);

    expect(handleToggleStatus).toHaveBeenCalledWith('task-100', 'In Progress');
  });

  it('triggers edit callback when edit button is clicked', () => {
    const handleEdit = vi.fn();
    render(<TaskItem task={sampleTask} onEdit={handleEdit} />);

    const editButton = screen.getByTitle('Edit task');
    fireEvent.click(editButton);

    expect(handleEdit).toHaveBeenCalledWith(sampleTask);
  });

  it('triggers delete callback when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<TaskItem task={sampleTask} onDelete={handleDelete} />);

    const deleteButton = screen.getByTitle('Delete task');
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith('task-100');
  });
});
