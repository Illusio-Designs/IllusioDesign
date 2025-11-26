"use client";

import React, { useEffect, useState } from "react";

export function BackgroundRippleEffect({ rows = 15, cols = 27, cellSize = 56 }) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const newCells = [];
    for (let i = 0; i < rows * cols; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // Calculate base delay for continuous wave animation
      const baseDelay = (row + col) * 50;
      newCells.push({
        id: i,
        row,
        col,
        baseDelay,
      });
    }
    setCells(newCells);
  }, [rows, cols]);

  const handleCellClick = (row, col) => {
    // Create ripple effect from clicked cell
    setCells((prev) =>
      prev.map((cell) => {
        const distance = Math.sqrt(
          Math.pow(cell.row - row, 2) + Math.pow(cell.col - col, 2)
        );
        const delay = distance * 50; // 50ms delay per cell distance
        return {
          ...cell,
          delay,
          animate: true,
        };
      })
    );

    // Reset animation after it completes
    setTimeout(() => {
      setCells((prev) =>
        prev.map((cell) => ({ ...cell, animate: false, delay: 0 }))
      );
    }, 1000);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        justifyContent: "center",
        alignContent: "start",
        width: "100%",
        height: "100%",
        paddingTop: "0",
      }}
    >
      {cells.map((cell) => (
        <div
          key={cell.id}
          onClick={() => handleCellClick(cell.row, cell.col)}
          className="ripple-cell"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            cursor: "pointer",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            transition: "border-color 0.2s ease",
            animation: cell.animate
              ? `cell-ripple 800ms cubic-bezier(0.4, 0, 0.2, 1) ${cell.delay}ms`
              : `cell-ripple-continuous 4s ease-in-out ${cell.baseDelay}ms infinite`,
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            const isDark = document.body.classList.contains('dark-theme');
            e.currentTarget.style.borderColor = isDark 
              ? "rgba(250, 249, 246, 0.15)" 
              : "rgba(0, 0, 0, 0.15)";
            e.currentTarget.style.backgroundColor = "rgba(236, 105, 31, 0.05)";
          }}
          onMouseLeave={(e) => {
            const isDark = document.body.classList.contains('dark-theme');
            e.currentTarget.style.borderColor = isDark 
              ? "rgba(250, 249, 246, 0.05)" 
              : "rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        />
      ))}
    </div>
  );
}

