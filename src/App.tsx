import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';
import './App.css';
import { updateGridValue, generateEmptyGrid, generateRandomGrid } from './gridUtils';

// const numRows = 50;
// const numCols = 50;
const numRows = 30;
const numCols = 30;

const App: React.FC = () => {
  // I didn't know we can set function inside useState like this...
  const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols));
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
    if (!runningRef.current) {
      return;
    }

    // Interesting, I didn't know setXXX function can pass in ()=>{} as well.
    setGrid(grid => updateGridValue(grid, numRows, numCols, isWrappedAroundEdges)); // Have to be this format, setGrid(updateGridValue(grid)) does not work.

    // simulate
    // setTimeout(runSimulation, 1000);
    setTimeout(runSimulation, 100);
  }, []); // [] make sure it only run once.

  /*  // I don't really like this approach as I cannot stop it.
  useInterval(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((grid) => updateGridValue(grid, isWrappedAroundEdges));
  }, 100);*/

  /*  // Or you can pass on dependency arrays
  // update function with running changes
  useCallback(() => { ... }, [running])
  // run simulation when button changes
  useEffect(() => running && runSimulation(), [running])*/

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true; // If we don't have this, there will be racing condition between setRunning is call and run Simulation is called?
            runSimulation();
          }
        }}
      >
        {running ? 'stop' : 'start'}
      </button>
      <button onClick={() => setGrid(generateRandomGrid(numRows, numCols))}>random</button>
      <button onClick={() => setGrid(generateEmptyGrid(numRows, numCols))}>reset</button>
      <br />
      <br />
      <button
        style={{ width: 200 }}
        onClick={() => setGrid(updateGridValue(grid, numRows, numCols, isWrappedAroundEdges))}
      >
        next generation
      </button>
      <br />
      <br />
      Wrapped around edges? {isWrappedAroundEdges ? 'Yes' : 'No'} &nbsp;&nbsp;
      <button onClick={() => setIsWrappedAroundEdges(!isWrappedAroundEdges)}>
        {isWrappedAroundEdges ? 'unwrap' : 'wrap'}
      </button>
      <div id="grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px` }} data-testid="grid">
        {grid.map((row, i) =>
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'green' : undefined,
                border: 'solid 1px black',
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
