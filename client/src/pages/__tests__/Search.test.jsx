import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Search from '../Search';

describe('Search Page Component', () => {
  const sampleTasks = [
    { _id: '1', title: 'Buy groceries', description: 'Milk and bread', status: 'In Progress' },
    { _id: '2', title: 'Fix bug', description: 'Resolve CSS layout issue', status: 'Completed' }
  ];

  it('filters tasks based on search input keyword', () => {
    render(
      <Search
        allTasks={sampleTasks}
        onBack={vi.fn()}
        onToggleStatus={vi.fn()}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onViewTaskDetail={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Finish');
    fireEvent.change(input, { target: { value: 'groceries' } });

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText('Fix bug')).not.toBeInTheDocument();
  });

  it('triggers onBack when back arrow is clicked', () => {
    const handleBack = vi.fn();
    render(
      <Search
        allTasks={sampleTasks}
        onBack={handleBack}
        onToggleStatus={vi.fn()}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onViewTaskDetail={vi.fn()}
      />
    );

    const backButton = screen.getByTitle('Back to Home');
    fireEvent.click(backButton);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
