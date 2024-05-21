import { IBoard, ICell, IGridSize } from '@/types/game.ts';
import { randomNumber } from '@/lib/random.ts';

/**
 * Generate array of cells according to the size
 * @param size
 */
export const generateBoard = (size: IGridSize): IBoard => {
  return Array.from({ length: size.rows }, (_, x) =>
    Array.from(
      { length: size.cols },
      (_, y) =>
        ({
          value: randomNumber(1, 9), // Generate random number between 1 and 9
          coordinates: [x, y],
        }) satisfies ICell,
    ),
  );
};

/**
 * Check if the selected cells are valid according to the game rules
 * @param coordinates
 * @param passed
 */
export const isValidSelection = (coordinates: [number, number][], passed: [number, number][]): boolean => {
  if (coordinates.length === 0) return true; // no cells selected - valid
  if (coordinates.length === 1) return true; // selected only one cell - valid

  const [primaryX, primaryY] = coordinates[0];
  const [secondaryX, secondaryY] = coordinates[1];

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
    const isInPassed = passed.some((p) => p[0] === cell[0] && p[1] === cell[1]);

    if (!isSelectedCell && !isInPassed) {
      return false; // a cell in the path is not passed and not one of the selected cells
    }
  }

  return true; // all conditions met
};

/**
 * Play a sound effect
 * @param type - the type of sound to play
 */
export const playSound = (type: 'click' | 'click2' | 'success' | 'error') => {
  const sounds = {
    click: new Audio('/mp3/click.mp3'),
    click2: new Audio('/mp3/click2.mp3'),
    error: new Audio('/mp3/error.mp3'),
    success: new Audio('/mp3/success.mp3'),
  };
  sounds[type].play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};
