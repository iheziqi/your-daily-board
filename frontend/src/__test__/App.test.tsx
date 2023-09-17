import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '../App';

describe('App', () => {
  it('render hello world', () => {
    // Arrange
    // Act
    render(<App />);
    // Expect
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World'
    );
  });
});
