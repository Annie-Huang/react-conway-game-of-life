// https://en.wikipedia.org/wiki/Moore_neighborhood  It can has max 8 neighbors
//  NW  N  NE
//  W   C   E
//  SW  S   SE
const operations = [
  [0, 1], // N
  [0, -1], // S
  [1, -1], // SE
  [-1, 1], // NW
  [1, 1], // NE
  [-1, -1], // SW
  [1, 0], // E
  [-1, 0], // W
];

// Or you can write it as Array<Array<number>>
export const updateGridValue = (
  grid: number[][],
  numRows: number,
  numCols: number,
  isWrappedAroundEdges: boolean
): number[][] => {
  // Spread doesn't work here. Clone multidimensional array
  const gridCopy = JSON.parse(JSON.stringify(grid));

  for (let i = 0; i < numRows; i++) {
    for (let k = 0; k < numCols; k++) {
      // if a cell is not at the edge, it should by default have 8 neighbours https://en.wikipedia.org/wiki/Moore_neighborhood
      // A cell can have 8 neighbors -> locate in the middle.
      //                 5 neighbors -> locate on the edge
      //                 3 neighbors -> locate in one of the four corners of the grid.
      // For a neighbor, it has the value of 0: dead. 1: life.
      // neighbors is the total values in the cell of its neighbors.
      let neighbors = 0;

      // Option 1: A Cell who "comes to life" outside the board should wrap at the other side of the board.
      // If you wanted to adapt it to a 'wrap-around' world where the edges consider the other side neighbours
      if (isWrappedAroundEdges) {
        const countNeighbors = (grid: any, x: number, y: number) => {
          return operations.reduce((acc, [i, j]) => {
            const row = (x + i + numRows) % numRows;
            const col = (y + j + numCols) % numCols;
            acc += grid[row][col];
            return acc;
          }, 0);
        };
        neighbors = countNeighbors(grid, i, k);
      } else {
        // Option 2: If we won't want it to effect if it is out of boundary
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newK = k + y;
          if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
            // Make sure it doesn't go out of boundary.
            neighbors += grid[newI][newK];
          }
        });
      }

      // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
      // 2. Any live cell with two or three live neighbours lives on to the next generation.  <-- Don't need to do anything.
      if (neighbors < 2 || neighbors > 3) {
        gridCopy[i][k] = 0;
      } else if (grid[i][k] === 0 && neighbors === 3) {
        // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        gridCopy[i][k] = 1;
      }
    }
  }

  return gridCopy;
};

export const generateEmptyGrid = (numRows: number, numCols: number): number[][] => {
  const rows = [];
  // 0: dead. 1: life.
  for (let i = 0; i < numRows; i++) {
    // you can also do Array.from(Array(numCols), ()=>0) )
    rows.push(Array(numCols).fill(0));
  }
  return rows;
};

export const generateRandomGrid = (numRows: number, numCols: number): number[][] => {
  const rows = [];
  // 0: dead. 1: life.
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};
