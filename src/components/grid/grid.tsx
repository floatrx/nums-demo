import { useCallback, useEffect, useState } from 'react';
import { Cell } from '@/components/cell/cell.tsx';
import { TBoard, TCellsQueue, TGridSize } from '@/types/game.ts';
import { playSound } from '@/lib/sounds.ts';
import { validateSelection, validateSolution } from '@/lib/validators.ts';

import { DEFAULT_BOARD_SIZE } from '@/config/const.ts';

// Styles
import s from './grid.module.css';

interface IProps {
  size: TGridSize;
  board: TBoard;
  onSolve: (score: number) => void;
}

export const Grid: FC<IProps> = ({ board, onSolve }) => {
  const [selectedCells, setSelectedCells] = useState<TCellsQueue>([]);
  const [solvedCells, setSolvedCells] = useState<TCellsQueue>([]);

  // Clear the selected cells
  const clearSelection = useCallback(() => {
    setSelectedCells([]);
  }, []);

  // Clear the selected cells and passed cells when the board changes
  useEffect(() => {
    clearSelection();
    setSolvedCells([]);
  }, [board, clearSelection]);

  // Check if the selected cells are valid
  useEffect(() => {
    if (selectedCells.length !== 2) return;

    // Check if the selected cells are valid according to the game rules
    if (!validateSelection(selectedCells, solvedCells)) {
      playSound('error');
      clearSelection();
      return; // invalid selection
    }

    // Compare the selected cells
    validateSolution(
      { selectedCells, board },
      {
        onSuccess: (score) => {
          playSound('success');

          // Add the selected cells to the passed array
          setSolvedCells((prev) => [...prev, ...selectedCells]);

          onSolve(score);
        },
        onError: () => {
          playSound('error');
        },
      },
    );

    // Clear the selected cells anyway!
    clearSelection();
  }, [board, clearSelection, onSolve, selectedCells, solvedCells]);

  return (
    <div className={s.wrapper} style={{ grid: `auto / repeat(${DEFAULT_BOARD_SIZE.cols}, 1fr)` }}>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            coords={cell.coordinates}
            value={cell.value}
            selected={selectedCells.includes(cell.coordinates)}
            passed={solvedCells.includes(cell.coordinates)}
            onClick={(coords) => {
              // Deselect if already selected
              if (selectedCells.includes(coords)) {
                playSound('click2');
                setSelectedCells((prev) => prev.filter((c) => c !== coords));
                return;
              }

              // Toggle selection
              setSelectedCells((prev) => {
                // Select only two cells
                if (prev.length === 2) {
                  return [coords];
                }
                playSound('click');
                // Select only if the cell is in the same row or column
                return [...prev, coords];
              });
            }}
          />
        )),
      )}
    </div>
  );
};
