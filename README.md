## How to install and run
- For installation, run `npm install`
- To run the program, `npm run start`

## Program explain

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
