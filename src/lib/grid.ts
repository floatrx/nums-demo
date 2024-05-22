import { TGridSize } from '@/types/game.ts';

/**
 * Calculate the grid size based on the window size
 * @returns {TGridSize} The number of rows and columns that fit in the window
 */
export const calculateGridSize = (): TGridSize => {
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
