import { generateEmptyGrid, generateRandomGrid, updateGridValue } from './gridUtils';

test('generateEmptyGrid', () => {
  const numRows = 30;
  const numCols = 30;
  const rows = generateEmptyGrid(numRows, numCols);
  expect(rows.length).toBe(numRows);
  expect(rows[0].length).toBe(numCols);
  expect(rows[0].every(item => item === 0)).toBe(true);
});

// This unit test should usually passed.
test('generateRandomGrid', () => {
  const numRows = 30;
  const numCols = 30;
  const rows = generateRandomGrid(numRows, numCols);
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
test('updateGridValue - no on edge', () => {
  const numRows = 6;
  const numCols = 6;
  const grid = generateEmptyGrid(numRows, numCols);
  grid[1][2] = grid[1][3] = grid[1][4] = grid[2][1] = grid[2][2] = grid[2][3] = 1;

  let newGrid = updateGridValue(grid, numRows, numCols, false);
  expect(newGrid[0][3]).toBe(1);
  expect(newGrid[1][1]).toBe(1);
  expect(newGrid[1][4]).toBe(1);
  expect(newGrid[2][1]).toBe(1);
  expect(newGrid[2][4]).toBe(1);
  expect(newGrid[3][2]).toBe(1);

  newGrid = updateGridValue(newGrid, numRows, numCols, false);
  expect(newGrid[1][2]).toBe(1);
  expect(newGrid[1][3]).toBe(1);
  expect(newGrid[1][4]).toBe(1);
  expect(newGrid[2][1]).toBe(1);
  expect(newGrid[2][2]).toBe(1);
  expect(newGrid[2][3]).toBe(1);
});

/*
 *   Test this Toad (period 2) pattern in https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 *   This:
 *   0 0 0 0 0 0
 *   1 1 1 0 0 0
 *   1 1 0 0 0 1
 *   0 0 0 0 0 0
 *
 *   will becomes:
 *   0 1 0 0 0 0
 *   0 0 1 0 0 1
 *   0 0 1 0 0 1
 *   1 0 0 0 0 0
 *
 *   And then becomes the original again.:
 *   0 0 0 0 0 0
 *   1 1 1 0 0 0
 *   1 1 0 0 0 1
 *   0 0 0 0 0 0
 */
test('updateGridValue - on edge - with wrapped', () => {
  const numRows = 6;
  const numCols = 6;
  const grid = generateEmptyGrid(numRows, numCols);
  grid[1][0] = grid[1][1] = grid[1][2] = grid[2][0] = grid[2][1] = grid[2][5] = 1;

  let newGrid = updateGridValue(grid, numRows, numCols, true);
  expect(newGrid[0][1]).toBe(1);
  expect(newGrid[1][2]).toBe(1);
  expect(newGrid[1][5]).toBe(1);
  expect(newGrid[2][2]).toBe(1);
  expect(newGrid[2][5]).toBe(1);
  expect(newGrid[3][0]).toBe(1);

  newGrid = updateGridValue(newGrid, numRows, numCols, true);
  expect(newGrid[1][0]).toBe(1);
  expect(newGrid[1][1]).toBe(1);
  expect(newGrid[1][2]).toBe(1);
  expect(newGrid[2][0]).toBe(1);
  expect(newGrid[2][1]).toBe(1);
  expect(newGrid[2][5]).toBe(1);
});

/*
 *   Test this Toad (period 2) pattern in https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 *   This:
 *   0 0 0 0 0 0
 *   1 1 1 0 0 0
 *   1 1 0 0 0 1
 *   0 0 0 0 0 0
 *
 *   will becomes:
 *   0 1 0 0 0 0
 *   1 0 1 0 0 0
 *   1 0 1 0 0 0
 *   0 0 0 0 0 0
 *
 *   then will becomes:
 *   0 1 0 0 0 0
 *   1 0 1 0 0 0
 *   0 0 0 0 0 0
 *   0 0 0 0 0 0
 *
 *   then will becomes:
 *   0 1 0 0 0 0
 *   0 1 0 0 0 0
 *   0 0 0 0 0 0
 *   0 0 0 0 0 0
 *
 *   then will becomes:
 *   0 0 0 0 0 0
 *   0 0 0 0 0 0
 *   0 0 0 0 0 0
 *   0 0 0 0 0 0
 */
test('updateGridValue - on edge - no wrapped', () => {
  const numRows = 6;
  const numCols = 6;
  const grid = generateEmptyGrid(numRows, numCols);
  grid[1][0] = grid[1][1] = grid[1][2] = grid[2][0] = grid[2][1] = grid[2][5] = 1;

  let newGrid = updateGridValue(grid, numRows, numCols, false);
  expect(newGrid[0][1]).toBe(1);
  expect(newGrid[1][0]).toBe(1);
  expect(newGrid[1][2]).toBe(1);
  expect(newGrid[2][0]).toBe(1);
  expect(newGrid[2][2]).toBe(1);

  newGrid = updateGridValue(newGrid, numRows, numCols, false);
  expect(newGrid[0][1]).toBe(1);
  expect(newGrid[1][0]).toBe(1);
  expect(newGrid[1][2]).toBe(1);

  newGrid = updateGridValue(newGrid, numRows, numCols, false);
  expect(newGrid[0][1]).toBe(1);
  expect(newGrid[1][1]).toBe(1);

  newGrid = updateGridValue(newGrid, numRows, numCols, false);
  for (var i = 0; i < numRows; i++) {
    expect(newGrid[i].every(item => item === 0)).toBe(true);
  }
});
