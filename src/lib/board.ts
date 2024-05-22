import { TBoard, TCell, TGridSize } from '@/types/game';

import { getRandomNumber } from '@/lib/utils';

/**
 * Generate array of cells according to the size
 * @param size
 */
export const generateBoard = (size: TGridSize): TBoard => {
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
