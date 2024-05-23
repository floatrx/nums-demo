import { getRandomNumber } from '@/lib/utils';

import { TBoard, TBoardSize, TCell, TCellsQueue } from '@/types/game';

/**
 * Generate array of cells according to the size
 * @param size
 */
export const generateBoard = (size: TBoardSize): TBoard => {
  return Array.from({ length: size.rows }, (_, x) =>
    Array.from(
      { length: size.cols },
      (_, y) =>
        ({
          value: getRandomNumber(), // Generate random number between 1 and 9
          coordinates: [x, y],
        }) satisfies TCell,
    ),
  );
};
/**
 * Calculate the grid size based on the window size
 * @returns {TBoardSize} The number of rows and columns that fit in the window
 */
export const calculateBoardSize = (): TBoardSize => {
  // Get the inner width and height of the window
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Define cell size and gap
  const cellSize = 34;
  const gap = 8;

  // Calculate the total space taken by one cell including the gap
  const totalCellWidth = cellSize + gap;
  const totalCellHeight = cellSize + gap * 1.5;

  // Calculate the number of columns and rows that fit in the window
  const cols = Math.floor(windowWidth / totalCellWidth);
  const rows = Math.floor(windowHeight / totalCellHeight);

  return { rows, cols };
};
/**
 * Sort the selected cells by their coordinates
 * @param selection
 * @returns tuple of sorted cells 1st is primary and 2nd is secondary
 */
export const sortCells = (selection: TCellsQueue): TCellsQueue => selection.toSorted(([x1, y1], [x2, y2]) => x1 * y1 - x2 * y2);
