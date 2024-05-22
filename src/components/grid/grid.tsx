import { Cell } from '@/components/cell/cell';
import { useGrid } from '@/hooks/use-grid';
import type { TBoard, TGridSize } from '@/types/game';

import { DEFAULT_BOARD_SIZE } from '@/config/const';

// Styles
import s from './grid.module.css';

interface IProps {
  size: TGridSize;
  board: TBoard;
  onSolve: (score: number) => void;
}

export const Grid: FC<IProps> = (props) => {
  const { selectedCells, solvedCells, handleCellClick } = useGrid(props);
  return (
    <div className={s.wrapper} style={{ grid: `auto / repeat(${DEFAULT_BOARD_SIZE.cols}, 1fr)` }}>
      {props.board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            coords={cell.coordinates}
            value={cell.value}
            selected={selectedCells.includes(cell.coordinates)}
            passed={solvedCells.includes(cell.coordinates)}
            onClick={handleCellClick}
          />
        )),
      )}
    </div>
  );
};
