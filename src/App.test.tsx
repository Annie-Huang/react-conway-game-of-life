import React from 'react';
import { render } from '@testing-library/react';
import App, { generateEmptyGrid, numRows, numCols, generateRandomGrid } from './App';

test('renders applications', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Wrapped around edges?/i);
  expect(linkElement).toBeInTheDocument();
});

test('generateEmptyGrid', () => {
  const rows = generateEmptyGrid();
  expect(rows.length).toBe(numRows);
  expect(rows[0].length).toBe(numCols);
  expect(rows[0].every(item => item === 0)).toBe(true);
});

test('generateRandomGrid', () => {
  const rows = generateRandomGrid();
  expect(rows.length).toBe(numRows);
  expect(rows[0].length).toBe(numCols);
  // Cannot be every item in a row is equals to 0
  expect(rows[0].every(item => item === 0)).toBe(false);
});
