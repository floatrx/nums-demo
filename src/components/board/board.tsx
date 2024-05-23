import { forwardRef } from 'react';
import { useBoard } from '@/hooks/use-board';
import { cn } from '@/lib/utils';
import { Cell } from '@/components/cell/cell';
import { DEFAULT_BOARD_SIZE } from '@/config/const';
import type { TBoard, TBoardSize } from '@/types/game';
// Styles
import s from './board.module.css';

interface IProps {
  className?: string;
  size: TBoardSize;
  board: TBoard;
  onSolve: (score: number, remainCount: number) => void;
}

export const Board = forwardRef<HTMLDivElement, IProps>(({ className, ...props }, ref) => {
  const { selectedCells, solvedCells, handleCellClick } = useBoard(props);
  return (
    <div ref={ref} className={cn(s.wrapper, className)} style={{ grid: `auto / repeat(${DEFAULT_BOARD_SIZE.cols}, 1fr)` }}>
      {props.board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            position={cell.coordinates}
            value={cell.value}
            selected={selectedCells.includes(cell.coordinates)}
            solved={solvedCells.includes(cell.coordinates)}
            onClick={handleCellClick}
          />
        )),
      )}
    </div>
  );
});
