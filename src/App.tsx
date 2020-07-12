import React, {useState} from 'react';
import './App.css';

const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
    // I didn't know we can set function inside useState like this?
    const [grid, setGrid] = useState(() => {
        const rows = [];

        // 0: dead. 1: life.
        for(let i = 0; i<numRows; i++) {
            // you can also do Array.from(Array(numCols), ()=>0) )
            rows.push(Array(numCols).fill(0));
        }

        return rows;
    });

    console.log(grid);

    return (
        <div>yo</div>
    );
}

export default App;
