# Tests for BlogMaker Template

This directory contains tests for the BlogMaker Template application. The tests are organized into two categories:

1. **Unit Tests**: Tests for individual functions and components in isolation
2. **Integration Tests**: Tests for components that interact with each other

## Directory Structure

```
tests/
├── unit/            # Unit tests for individual functions and components
├── integration/     # Integration tests for component interactions
├── mocks/           # Mock data and mock implementations
├── setup.ts         # Test setup configuration
└── README.md        # This file
```

## Running Tests

The project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing.

### Run all tests

```bash
npm test
# or
yarn test
```

### Run tests in watch mode

```bash
npm run test:watch
# or
yarn test:watch
```

### Run tests with UI

```bash
npm run test:ui
# or
yarn test:ui
```

### Run tests with coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

## Writing Tests

### Unit Tests

Unit tests should be placed in the `tests/unit` directory. They should test individual functions and components in isolation, with dependencies mocked as necessary.

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { someFunction } from '@/lib/someFile';

describe('someFunction', () => {
  it('should do something', () => {
    const result = someFunction();
    expect(result).toBe(expectedValue);
  });
});
```

### Integration Tests

Integration tests should be placed in the `tests/integration` directory. They should test how components interact with each other.

Example:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SomeComponent from '@/components/SomeComponent';

describe('SomeComponent', () => {
  it('should render correctly within the ThemeProvider', () => {
    render(
      <ThemeProvider>
        <SomeComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Mocking

The `tests/mocks` directory contains mock data and mock implementations of dependencies. This includes mock implementations of:

- Post data
- External services
- React Router
- Browser APIs

## Testing Guidelines

1. Tests should be independent and not rely on other tests
2. Tests should be deterministic and not rely on external services
3. Prefer testing behavior rather than implementation details
4. Use meaningful assertions that describe the expected behavior
5. Use descriptive test and it block names that read like documentation 