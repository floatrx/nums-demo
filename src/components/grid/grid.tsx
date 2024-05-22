import { forwardRef } from 'react';
import { Cell } from '@/components/cell/cell';
import { DEFAULT_BOARD_SIZE } from '@/config/const';
import { cn } from '@/lib/utils';
import { useGrid } from '@/hooks/use-grid';
import type { TBoard, TGridSize } from '@/types/game';

// Styles
import s from './grid.module.css';

interface IProps {
  className?: string;
  size: TGridSize;
  board: TBoard;
  onSolve: (score: number, remainCount: number) => void;
}

export const Grid = forwardRef<HTMLDivElement, IProps>(({ className, ...props }, ref) => {
  const { selectedCells, solvedCells, handleCellClick } = useGrid(props);
  return (
    <div ref={ref} className={cn(s.wrapper, className)} style={{ grid: `auto / repeat(${DEFAULT_BOARD_SIZE.cols}, 1fr)` }}>
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
});
