import React, {useCallback, useRef, useState} from 'react';
import produce from 'immer';
import './App.css';

// const numRows = 50;
// const numCols = 50;
const numRows = 30;
const numCols = 30;

// https://en.wikipedia.org/wiki/Moore_neighborhood  It can has max 8 neighbors
//  NW  N  NE
//  W   C   E
//  SW  S   SE
const operations = [
  [0, 1],   // N
  [0, -1],  // S
  [1, -1],  // SE
  [-1, 1],  // NW
  [1, 1],   // NE
  [-1, -1], // SW
  [1, 0],   // E
  [-1, 0],  // W
]

// Or you can write it as Array<Array<number>>
const updateGridValue = (grid: number[][], isWrappedAroundEdges: boolean) => {
  // Spread doesn't work here. Clone multidimensional array
  let gridCopy = JSON.parse(JSON.stringify(grid));

  for(let i=0; i<numRows; i++) {
    for(let k=0; k<numCols; k++) {
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
          const newI = i+x;
          const newK = k+y;
          if (newI >= 0 && newI < numRows && newK >=0 && newK < numCols) {  // Make sure it doesn't go out of boundary.
            neighbors += grid[newI][newK];
          }
        })
      }


      // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
      // 2. Any live cell with two or three live neighbours lives on to the next generation.  <-- Don't need to do anything.
      if (neighbors < 2 || neighbors > 3) {
        gridCopy[i][k] = 0;

      } else if(grid[i][k] === 0 && neighbors === 3) {
        // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        gridCopy[i][k] = 1;
      }

    }
  }

  return gridCopy;
}

const generateEmptyGrid = () => {
  const rows = [];
  // 0: dead. 1: life.
  for (let i = 0; i < numRows; i++) {
    // you can also do Array.from(Array(numCols), ()=>0) )
    rows.push(Array(numCols).fill(0));
  }
  return rows;
}

const generateRandomGrid = () => {
  const rows = [];
  // 0: dead. 1: life.
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0) );
  }
  return rows;
}

const App: React.FC = () => {
  // I didn't know we can set function inside useState like this...
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  // console.log(grid);

  const [running, setRunning] = useState(false);
  const [isWrappedAroundEdges, setIsWrappedAroundEdges] = useState(true);

  // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
  // The returned object will persist for the full lifetime of the component.
  const runningRef = useRef(running);
  runningRef.current = running;

  // Pass an inline callback and an array of dependencies.
  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
  const runSimulation = useCallback(() => {

    // using running will not work because running variable will not change as runSimulation function is only created once
    // If you want to use the current value of a variable inside a useCallback, you will have to use a useRef to point to the variable.
    // if(!running) {
    if(!runningRef.current) {
      return;
    }

    // Interesting, I didn't know setXXX function can pass in ()=>{} as well.
    setGrid(grid => updateGridValue(grid, isWrappedAroundEdges)); // Have to be this format, setGrid(updateGridValue(grid)) does not work.

    // simulate
    // setTimeout(runSimulation, 1000);
    setTimeout(runSimulation, 100);

  }, [])

  return (
    <>
      <button onClick={() => {
        setRunning(!running);
        if(!running) {
          runningRef.current = true; // If we don't have this, there will be racing condition between setRunning is call and run Simulation is called?
          runSimulation();
        }
      }}>
        {running? 'stop' : 'start'}
      </button>
      <button onClick={() => setGrid(generateRandomGrid())}>random</button>
      <button onClick={() => setGrid(generateEmptyGrid())}>reset</button>
      <br/><br/>
      <button style={{width: 200}} onClick={() => setGrid(updateGridValue(grid, isWrappedAroundEdges))}>next generation</button>
      <br/><br/>
      Wrapped around edges? {isWrappedAroundEdges ? 'Yes' : 'No'} &nbsp;&nbsp;
      <button onClick={() => setIsWrappedAroundEdges(!isWrappedAroundEdges)}>{isWrappedAroundEdges ? 'unwrap' : 'wrap'}</button>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px`}}>
        {
          grid.map((row, i) =>
            row.map((col, k) =>
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                  })
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? 'green' : undefined,
                  border: 'solid 1px black'
                }}
              />
            )
          )
        }
      </div>
    </>
  )
}

export default App;
