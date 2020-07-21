import React from 'react';
import { render } from '@testing-library/react';
import App, { generateEmptyGrid, numRows, numCols, generateRandomGrid, updateGridValue } from './App';

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

// This unit test should usually passed.
test('generateRandomGrid', () => {
  const rows = generateRandomGrid();
  expect(rows.length).toBe(numRows);
  expect(rows[0].length).toBe(numCols);
  // Cannot be every item in a row is equals to 0
  expect(rows[0].every(item => item === 0)).toBe(false);
});

/*
*   Test this Toad (period 2) pattern in https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*
*   This:
*   0 0 0 0 0 0
*   0 0 1 1 1 0
*   0 1 1 1 0 0
*   0 0 0 0 0 0
*
*   will becomes:
*   0 0 0 1 0 0
*   0 1 0 0 1 0
*   0 1 0 0 1 0
*   0 0 1 0 0 0
*
*   And then becomes the original again.:
*   0 0 0 0 0 0
*   0 0 1 1 1 0
*   0 1 1 1 0 0
*   0 0 0 0 0 0
*/
test('updateGridValue', () => {
  const grid = generateEmptyGrid();
  grid[1][2] = grid[1][3] = grid[1][4] = grid[2][1] = grid[2][2] = grid[2][3] = 1;

  let newGrid = updateGridValue(grid, false);
  expect(newGrid[0][3]).toBe(1);
  expect(newGrid[1][1]).toBe(1);
  expect(newGrid[1][4]).toBe(1);
  expect(newGrid[2][1]).toBe(1);
  expect(newGrid[2][4]).toBe(1);
  expect(newGrid[3][2]).toBe(1);

  newGrid = updateGridValue(newGrid, false);
  expect(newGrid[1][2]).toBe(1);
  expect(newGrid[1][3]).toBe(1);
  expect(newGrid[1][4]).toBe(1);
  expect(newGrid[2][1]).toBe(1);
  expect(newGrid[2][2]).toBe(1);
  expect(newGrid[2][3]).toBe(1);
});
