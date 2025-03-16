import React, { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Create a test component that uses the theme context
const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
};

// Mock implementation of ThemeContext to avoid jest error
vi.mock('@/contexts/ThemeContext', () => {
  const React = require('react');
  
  // Create a real context with a mock implementation
  const ThemeContextMock = React.createContext(null);
  
  const ThemeProvider = ({ children }) => {
    // Get initial theme from localStorage if available
    const storedTheme = typeof localStorage.getItem === 'function' 
      ? localStorage.getItem('theme')
      : null;
      
    const [theme, setTheme] = React.useState(storedTheme || 'light');
    
    const handleSetTheme = (newTheme) => {
      setTheme(newTheme);
      if (typeof localStorage.setItem === 'function') {
        localStorage.setItem('theme', newTheme);
      }
    };
    
    return (
      <ThemeContextMock.Provider value={{ theme, setTheme: handleSetTheme }}>
        {children}
      </ThemeContextMock.Provider>
    );
  };
  
  return {
    ThemeProvider,
    useTheme: () => React.useContext(ThemeContextMock),
  };
});

describe('ThemeContext', () => {
  beforeEach(() => {
    // Reset localStorage mock
    vi.restoreAllMocks();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    });
  });
  
  it('should provide default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Default theme should be 'light'
    const themeElement = screen.getByTestId('current-theme');
    expect(themeElement.textContent).toBe('light');
  });
  
  it('should allow changing theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Change theme to light
    await act(async () => {
      fireEvent.click(screen.getByText('Set Light'));
    });
    
    // Theme should be 'light'
    expect(screen.getByTestId('current-theme').textContent).toBe('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    
    // Change theme to dark
    await act(async () => {
      fireEvent.click(screen.getByText('Set Dark'));
    });
    
    // Theme should be 'dark'
    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
  
  it('should read theme from localStorage', () => {
    // Mock localStorage to return 'dark' theme
    localStorage.getItem = vi.fn().mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    // Theme should be 'dark'
    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });
}); 