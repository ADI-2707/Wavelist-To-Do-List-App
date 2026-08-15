import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Onboarding from '../Onboarding';

describe('Onboarding Page Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders initial full-screen splash logo', () => {
    render(<Onboarding onGetStarted={vi.fn()} />);
    expect(screen.getByAltText('Wavelist Logo')).toBeInTheDocument();
    expect(screen.getByText('Wavelist')).toBeInTheDocument();
  });

  it('progresses to main content stage and triggers callback on Get Started click', () => {
    const handleGetStarted = vi.fn();
    render(<Onboarding onGetStarted={handleGetStarted} />);

    act(() => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.getByText('Manage What To Do')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(btn);

    expect(handleGetStarted).toHaveBeenCalledTimes(1);
  });
});
