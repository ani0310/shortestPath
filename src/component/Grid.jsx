import { useEffect, useState } from "react";
import DisplayGrid from "./DisplayGrid";

const Grid = () => {
  const [grid, setGrid] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

  const generateGrid = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      let temp = [];
      for (let j = 0; j < 20; j++) {
        temp.push(0);
      }
      arr.push(temp);
    }
    setGrid(arr);
    console.log(arr);
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div>
      <h1>Grid</h1>

      <DisplayGrid grid={grid} />
    </div>
  );
};

export default Grid;
