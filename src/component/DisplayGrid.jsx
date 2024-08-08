import React, { useState, useEffect } from "react";
import "../styles.css";

const DisplayGrid = ({ grid }) => {
  const [startEndPoints, setStartEndPoints] = useState([]);
  const [path, setPath] = useState([]);

  const handleGridSelected = (i, j) => {
    setStartEndPoints((prev) => {
      if (prev.length < 2) {
        return [...prev, [i, j]];
      }
      return prev;
    });
  };

  const isSelected = (i, j) => {
    return startEndPoints.some((item) => item[0] === i && item[1] === j);
  };

  const runAlgorithm = () => {
    if (startEndPoints.length !== 2) {
      return;
    }

    const gridSize = 20;
    const directions = [
      [-1, 0], // top
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    const [start, end] = startEndPoints;
    const queue = [[start[0], start[1], []]]; // [current_i, current_j, path]
    const visited = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    );

    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
      const [si, sj, currentPath] = queue.shift();

      if (si === end[0] && sj === end[1]) {
        setPath([...currentPath, [si, sj]]);
        return;
      }

      for (const [di, dj] of directions) {
        const ni = si + di;
        const nj = sj + dj;

        if (
          ni >= 0 &&
          ni < gridSize &&
          nj >= 0 &&
          nj < gridSize &&
          !visited[ni][nj]
        ) {
          visited[ni][nj] = true;
          queue.push([ni, nj, [...currentPath, [si, sj]]]);
        }
      }
    }

    setPath([]);
  };
  const handleReset = () => {
    setPath([]);
    setStartEndPoints([]);
  };

  return (
    <div className="container">
      <div className="reset-button">
        <button onClick={handleReset}>Reset🔃</button>
      </div>
      {startEndPoints.length === 0 ? (
        <h1>Select start point</h1>
      ) : startEndPoints.length === 1 ? (
        <h1>Select end point</h1>
      ) : (
        <button onClick={runAlgorithm}>Find Shortest Path</button>
      )}
      <div className="grid-container">
        {grid.map((items, index) => (
          <div className="row" key={index}>
            {items.map((subItems, sIndex) => {
              const isHighlighted =
                path && path.some(([x, y]) => x === index && y === sIndex);
              return (
                <div
                  key={sIndex}
                  onClick={() => handleGridSelected(index, sIndex)}
                  style={{
                    backgroundColor: `${
                      isSelected(index, sIndex)
                        ? "red"
                        : isHighlighted
                        ? "green"
                        : ""
                    }`,
                    border: "1px solid black",
                    width: "40px",
                    height: "40px",
                    display: "inline-block",
                  }}
                  className={`grid ${
                    isSelected(index, sIndex)
                      ? "highlight"
                      : isHighlighted
                      ? "path"
                      : ""
                  }`}
                >
                  {subItems}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGrid;
