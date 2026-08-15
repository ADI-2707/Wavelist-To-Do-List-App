import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFormModal from '../TaskFormModal';

describe('TaskFormModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<TaskFormModal isOpen={false} onClose={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.queryByText('Add New Task')).not.toBeInTheDocument();
  });

  it('renders form elements when isOpen is true', () => {
    render(<TaskFormModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doing Homework')).toBeInTheDocument();
  });

  it('displays error messages when mandatory fields are missing', () => {
    render(<TaskFormModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} />);
    
    const submitButton = screen.getByRole('button', { name: /create task/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Start time is required')).toBeInTheDocument();
  });

  it('pre-fills fields when editing an existing task', () => {
    const initialTask = {
      _id: 'edit-1',
      title: 'Review Code',
      description: 'Check PR comments',
      dateTime: '2026-08-15T10:00:00.000Z',
      endTime: '11:00'
    };

    render(<TaskFormModal isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} initialTask={initialTask} />);

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Review Code')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Check PR comments')).toBeInTheDocument();
  });
});
