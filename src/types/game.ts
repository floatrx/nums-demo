export type TCoordinates = [number, number]; // [row, col]

export type TCell = {
  value: number;
  coordinates: TCoordinates;
};

export type TCellsQueue = TCoordinates[]; // Queue of cells (selected & solved)

export type TBoardSize = {
  rows: number;
  cols: number;
};

export type TBoard = TCell[][];

export type TTimeout = ReturnType<typeof setTimeout> | null;
