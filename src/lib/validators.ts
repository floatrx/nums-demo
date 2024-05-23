/**
 * 👋
 * This module contains the main game logic
 * and validation functions.
 *
 * 1. validateSelection
 * 2. validateSolution
 */
import { TBoard, TCellsQueue, type TGridSize } from '@/types/game';
import { SCORE_DEFAULT, SCORE_TEN } from '@/config/const';

/**
 * Check if the selected cells are valid according to the game rules
 * @param coordinates
 * @param passed
 */
export type ValidateSelection = (selectedCells: TCellsQueue, solvedCells: TCellsQueue, boardSize: TGridSize) => boolean;
export const validateSelection: ValidateSelection = (selectedCells, solvedCells, boardSize) => {
  if (selectedCells.length <= 1) return true; // not enough cells selected

  // Get the selected cells as primary and secondary
  const [cell1, cell2] = selectedCells.sort(([r1], [r2]) => r1 - r2);

  // Get primary (p) and secondary (s) cell coordinates
  const [primaryX, primaryY] = cell1;
  const [secondaryX, secondaryY] = cell2;

  /**
   * Check if the selected cells are in order
   * and there are no unsolved cells between them
   */
  const linearPath: TCellsQueue = [];
  for (let row = primaryX; row <= secondaryX; row++) {
    for (let col = 0; col <= boardSize.cols; col++) {
      // Check 1st row and last row and skip the cells that are not in the path
      if ((row === primaryX && col <= primaryY) || (row === secondaryX && col >= secondaryY)) continue;
      // Skip the cells that are already solved
      // if (solvedCells.some(([px, py]) => px === row && py === col)) continue;
      if (solvedCells.map((e) => e.toString()).includes([row, col].toString())) continue;
      linearPath.push([row, col]);
    }
  }
  /** When linearPath has only 1 element, it means that
   * the selected cells (primary & secondary) are in order!
   */
  if (linearPath.length <= 1) {
    console.log('cells are in order');
    return true;
  }

  /**
   * According to main game rules, the selected cells
   * should be in the same row or column
   * User can only select cells above or below the primary cell
   * or to the left or right of the primary cell...
   * Diagonal selections are not allowed!
   */
  if (primaryX !== secondaryX && primaryY !== secondaryY) {
    console.log('cells are not in the same row or column');
    return false; // cells are not in the same row or column
  }

  /**
   * Check if the path between the selected cells
   * [left,right,top & bottom]
   */
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
  for (const [x, y] of path) {
    const isSelectedCell = (x === primaryX && y === primaryY) || (x === secondaryX && y === secondaryY);
    const isInPassed = solvedCells.some(([px, py]) => px === x && py === y);

    if (!isSelectedCell && !isInPassed) {
      console.log('cell not passed and not selected');
      return false; // a cell in the path is not passed and not one of the selected cells
    }
  }

  console.log('all conditions met');
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
