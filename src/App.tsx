import React, {useCallback, useRef, useState} from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

// https://en.wikipedia.org/wiki/Moore_neighborhood
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

const App: React.FC = () => {
  // I didn't know we can set function inside useState like this...
  const [grid, setGrid] = useState(() => {
    const rows = [];

    // 0: dead. 1: life.
    for (let i = 0; i < numRows; i++) {
      // you can also do Array.from(Array(numCols), ()=>0) )
      rows.push(Array(numCols).fill(0));
    }

    return rows;
  });
  // console.log(grid);

  const [running, setRunning] = useState(false);

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
    setGrid(grid => {
      return produce(grid, gridCopy => {

        for(let i=0; i<numRows; i++) {
          for(let k=0; k<numCols; k++) {

          }
        }

      });
    });




    // simulate
    setTimeout(runSimulation, 1000);

  }, [])

  return (
    <>
      <button onClick={() => setRunning(!running)}>
        {running? 'stop' : 'start'}
      </button>
      <br/><br/>
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
                  backgroundColor: grid[i][k] ? 'pink' : undefined,
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
