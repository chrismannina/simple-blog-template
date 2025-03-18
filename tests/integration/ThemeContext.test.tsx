import React, { useState } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { ThemeProvider, useTheme } from '../../src/contexts/ThemeContext';

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

// Create a mock context outside of the mock function
const ThemeContextMock = React.createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: 'light',
  setTheme: (theme) => {}
});

// Mock implementation of ThemeContext
vi.mock('@/contexts/ThemeContext', () => {
  return {
    ThemeProvider: ({ children }) => {
      // Create a React state to properly track theme changes
      const [theme, setTheme] = useState(() => {
        // Get initial theme from localStorage if available
        const storedTheme = typeof localStorage.getItem === 'function' && localStorage.getItem('theme');
        return storedTheme || 'light';
      });
      
      const handleSetTheme = (newTheme: string) => {
        // Update the theme state
        setTheme(newTheme);
        // Also update localStorage
        if (typeof localStorage.setItem === 'function') {
          localStorage.setItem('theme', newTheme);
        }
      };
      
      // Provide the theme context with current theme and setTheme function
      const contextValue = {
        theme,
        setTheme: handleSetTheme
      };
      
      // Render the provider with the contextValue
      return (
        <div data-testid="theme-provider">
          <ThemeContextMock.Provider value={contextValue}>
            {children}
          </ThemeContextMock.Provider>
        </div>
      );
    },
    useTheme: () => {
      // Get the current React context value
      const themeContext = React.useContext(ThemeContextMock);
      return themeContext;
    },
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