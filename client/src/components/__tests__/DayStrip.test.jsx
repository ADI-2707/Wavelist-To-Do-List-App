import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DayStrip from '../DayStrip';

describe('DayStrip Component', () => {
  it('renders all 7 days of the week', () => {
    render(<DayStrip selectedDate={new Date()} onSelectDate={vi.fn()} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('triggers onSelectDate when a day is clicked', () => {
    const handleSelectDate = vi.fn();
    render(<DayStrip selectedDate={new Date()} onSelectDate={handleSelectDate} />);

    const mondayBtn = screen.getByText('Mon').closest('button');
    fireEvent.click(mondayBtn);

    expect(handleSelectDate).toHaveBeenCalled();
  });
});
