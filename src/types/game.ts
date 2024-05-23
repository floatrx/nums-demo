export type TCoordinates = [number, number];

export type TBoardSize = {
  rows: number;
  cols: number;
};

export type TCell = {
  value: number;
  coordinates: TCoordinates;
};

export type TBoard = TCell[][];

export type TCellsQueue = TCoordinates[];

export type TTimeout = ReturnType<typeof setTimeout> | null;
