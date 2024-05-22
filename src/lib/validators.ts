/**
 * 👋
 * This module contains the main game logic
 * and validation functions.
 *
 * 1. validateSelection
 * 2. validateSolution
 */
import { TBoard, TCellsQueue } from '@/types/game.ts';
import { SCORE_DEFAULT, SCORE_TEN } from '@/config/const.ts';

/**
 * Check if the selected cells are valid according to the game rules
 * @param coordinates
 * @param passed
 */
export type ValidateSelection = (selectedCells: TCellsQueue, solvedCells: TCellsQueue) => boolean;
export const validateSelection: ValidateSelection = (selectedCells, solvedCells) => {
  if (selectedCells.length <= 1) return true; // not enough cells selected

  // Get the selected cells as primary and secondary
  const [primaryX, primaryY] = selectedCells[0];
  const [secondaryX, secondaryY] = selectedCells[1];

  // Check if the cells are in the same row or column
  if (primaryX !== secondaryX && primaryY !== secondaryY) {
    return false; // cells are not in the same row or column
  }

  // Generate the path between the primary and secondary cells
  const path: [number, number][] = [];
  if (primaryX === secondaryX) {
    // Vertical path
    const startY = Math.min(primaryY, secondaryY);
    const endY = Math.max(primaryY, secondaryY);
    for (let y = startY; y <= endY; y++) {
      path.push([primaryX, y]);
    }
  } else {
    // Horizontal path
    const startX = Math.min(primaryX, secondaryX);
    const endX = Math.max(primaryX, secondaryX);
    for (let x = startX; x <= endX; x++) {
      path.push([x, primaryY]);
    }
  }

  // Validate that all cells in the path are either passed or one of the selected cells
  for (const cell of path) {
    const isSelectedCell = (cell[0] === primaryX && cell[1] === primaryY) || (cell[0] === secondaryX && cell[1] === secondaryY);
    const isInPassed = solvedCells.some((p) => p[0] === cell[0] && p[1] === cell[1]);

    if (!isSelectedCell && !isInPassed) {
      return false; // a cell in the path is not passed and not one of the selected cells
    }
  }

  return true; // all conditions met
};

export type ValidateSolution = (
  p: { selectedCells: TCellsQueue; board: TBoard },
  cb: {
    onSuccess: (score: number) => void;
    onError: () => void;
  },
) => boolean;
/**
 * Check if the selected cells are valid according to the game rules
 * @param selectedCells
 * @param board
 * @param onSuccess
 * @param onError
 */
export const validateSolution: ValidateSolution = ({ selectedCells, board }, { onSuccess, onError }) => {
  // Get the value of the selected cells
  const getCellValue = ([x, y]: [number, number]) => board[x][y].value;

  // Get the selected cells
  const [cell1, cell2] = selectedCells;

  const sumSelected = selectedCells.reduce((acc, [x, y]) => acc + board[x][y].value, 0);

  const isSameValues = getCellValue(cell1) === getCellValue(cell2);

  // Check if the sum of the selected cells is equal to 10
  const score = sumSelected === 10 ? SCORE_TEN : SCORE_DEFAULT;
  const isPassed = sumSelected === 10 || isSameValues;

  // Call the appropriate callback
  isPassed ? onSuccess(score) : onError();

  return isPassed;
};
