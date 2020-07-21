## How to install and run
- For installation, run `npm install`
- To run the program, `npm run start`
- To run the test, `npm run test`
- To run the test with coverage, `npm run coverage`
Coverage report is in:
<react-conway-game-of-life>\coverage\lcov-report\index.html

## Program explain

### Rules on the program:
(https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells,
each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively).
Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.
At each step in time, the following transitions occur:
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

### Pattern you can test:
Conway's Game of life is well known math game, you can test its pattern through the Example of patterns section in
https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

### Grid:
- The program will generate a 30 by 30 grid table (if you want to change, please edit: const numRows = 30;
const numCols = 30; in App.tsx)
- Each cell in the grid is clickable.
- Default background color is white, which represents the cell is dead.
- When you click the cell,the background color is green, which represents the cell is alive.
- Each click is toggle between live and dead of the cell.

### Buttons available:
- Start button is to start the simulation after you set the cells (by clicking) into the initial state you want.
- Stop button. Once you clicks start, button will change to "stop" so you can stop the simulation.
- Random button. Randomly assign the cell to live or dead.
- Reset button. Reset all cells to initial state (all dead)
- Next generation button. Trigger the cells to go through one cycle only.
- Decide whether you want keep the boundary or adapt it to a 'wrap-around' world where the edges consider the other side neighbours.
You can click 'wrap' and 'unwrap' to toggle it. App.tsx, line

## Settings you can change:
- Change the rows and columns of the table: App.tsx line 7-8.
- Change the background color that represents the cell is alive: App.tsx line 170
- Change the simulate circle timeframe. At the moment, it's set to every 100ms, it will update the cell. Appl.tsx line 133
