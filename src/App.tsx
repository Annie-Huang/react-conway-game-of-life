import React, {useCallback, useState} from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

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

  // Pass an inline callback and an array of dependencies.
  // useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.
  // useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).
  const runSimulation = useCallback(() => {
    if(!running) {
      return;
    }

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
