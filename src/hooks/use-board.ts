import { useCallback, useEffect, useState } from 'react';
import { playSound } from '@/lib/sounds';
import { validateSelection, validateSolution } from '@/lib/validators';
import type { TBoard, TBoardSize, TCellsQueue, TCoordinates } from '@/types/game';

/**
 * Hook to handle the grid logic
 * @param board
 * @param onSolve
 */
export const useBoard = ({ board, onSolve }: { board: TBoard; onSolve: (score: number, remainCount: number) => void }) => {
  const [selectedCells, setSelectedCells] = useState<TCellsQueue>([]);
  const [solvedCells, setSolvedCells] = useState<TCellsQueue>([]);

  // Clear the selected cells
  const clearSelection = useCallback(() => {
    setSelectedCells([]);
  }, []);

  const handleCellClick = useCallback(
    (coords: TCoordinates) => {
      // Deselect if already selected
      if (selectedCells.includes(coords)) {
        playSound('deselect');
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
    },
    [selectedCells],
  );

  // Clear the selected cells board changes
  useEffect(() => {
    clearSelection();
  }, [board, clearSelection]);

  // Check if the selected cells are valid
  useEffect(() => {
    if (selectedCells.length !== 2) return;

    const boardSize: TBoardSize = {
      rows: board.length - 1,
      cols: board[0].length - 1,
    };

    // Check if the selected cells are valid according to the game rules
    if (!validateSelection(selectedCells, solvedCells, boardSize)) {
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

          // Calculate the remaining cells count
          const remainCount = board.length * board[0].length - solvedCells.length - 2;

          onSolve(score, remainCount);
        },
        onError: () => {
          playSound('error');
        },
      },
    );

    // Clear the selected cells anyway!
    clearSelection();
  }, [board, clearSelection, onSolve, selectedCells, solvedCells]);

  return {
    selectedCells,
    solvedCells,
    handleCellClick,
  };
};
