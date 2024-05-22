export type TCoordinates = [number, number];

export type TGridSize = {
  rows: number;
  cols: number;
};

export type TCell = {
  value: number;
  coordinates: TCoordinates;
};

export type TBoard = TCell[][];

export type TCellsQueue = TCoordinates[];

export type Timeout = ReturnType<typeof setTimeout> | null;
