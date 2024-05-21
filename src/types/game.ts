export type ICoordinates = [number, number];

export interface IGridSize {
  rows: number;
  cols: number;
}

export interface ICell {
  value: number;
  coordinates: ICoordinates;
}

export type IBoard = ICell[][];
