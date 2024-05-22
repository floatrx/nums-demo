/**
 * 👋
 * This module contains the main game logic
 * and validation functions.
 *
 * 1. validateSelection
 * 2. validateSolution
 */
import { TBoard, TCellsQueue } from '@/types/game';
import { SCORE_DEFAULT, SCORE_TEN } from '@/config/const';

/**
 * Check if the selected cells are valid according to the game rules
 * @param coordinates
 * @param passed
 */
export type ValidateSelection = (selectedCells: TCellsQueue, solvedCells: TCellsQueue) => boolean;
export const validateSelection: ValidateSelection = (selectedCells, solvedCells) => {
  if (selectedCells.length <= 1) return true; // not enough cells selected

  // Get the selected cells as primary and secondary
  const [cell1, cell2] = selectedCells;

  const [cx1, cy1] = cell1;
  const [cx2, cy2] = cell2;

  /**
   * Check if the selected cells are in order
   * and there are no unsolved cells between them
   */
  // Determine the boundaries of the area to be covered
  const startX = Math.min(cx1, cx2);
  const endX = Math.max(cx1, cx2);
  const startY = Math.min(cy1, cy2);
  const endY = Math.max(cy1, cy2);
  const linearPath: TCellsQueue = [];
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      if ((x === cx1 && y < cy1) || (x === cx2 && y > cy2)) continue;
      if (solvedCells.map((e) => e.toString()).includes([x, y].toString())) continue;
      linearPath.push([x, y]);
    }
  }
  /** When linearPath has only 2 elements,
   * it means that the selected cells are in order
   * NOTE: This logic is not tested yet.
   */
  if (linearPath.length === 2) {
    console.log('cells are in order and there are no unsolved cells between them');
    return true;
  }

  /**
   * According to main game rules, the selected cells
   * should be in the same row or column
   * User can only select cells above or below the primary cell
   * or to the left or right of the primary cell...
   * Diagonal selections are not allowed!
   */
  if (cx1 !== cx2 && cy1 !== cy2) {
    console.log('cells are not in the same row or column');
    return false; // cells are not in the same row or column
  }

  /**
   * Check if the path between the selected cells
   */
  const path: [number, number][] = [];
  if (cx1 === cx2) {
    // Vertical path
    const startY = Math.min(cy1, cy2);
    const endY = Math.max(cy1, cy2);
    for (let y = startY; y <= endY; y++) {
      path.push([cx1, y]);
    }
  } else {
    // Horizontal path
    const startX = Math.min(cx1, cx2);
    const endX = Math.max(cx1, cx2);
    for (let x = startX; x <= endX; x++) {
      path.push([x, cy1]);
    }
  }

  // Validate that all cells in the path are either passed or one of the selected cells
  for (const [x, y] of path) {
    const isSelectedCell = (x === cx1 && y === cy1) || (x === cx2 && y === cy2);
    const isInPassed = solvedCells.some((p) => p[0] === x && p[1] === y);

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
