import { useCallback, useEffect, useState } from 'react';
import { Cell } from '@/components/cell/cell.tsx';
import { IBoard, ICoordinates, IGridSize } from '@/types/game.ts';
import { isValidSelection, playSound } from '@/lib/game.ts';

import { DEFAULT_BOARD_SIZE } from '@/config/const.ts';

// Styles
import s from './grid.module.css';

interface IProps {
  size: IGridSize;
  board: IBoard;
}

export const Grid: FC<IProps> = ({ board }) => {
  const [selected, setSelected] = useState<ICoordinates[]>([]);
  const [passed, setPassed] = useState<[number, number][]>([]);

  // Clear the selected cells
  const clearSelection = useCallback(() => {
    setSelected([]);
  }, []);

  // Compare the selected cells -> if the sum of the selected cells is equal to 10, add them to the passed array
  const compareCells = useCallback(() => {
    // Get the value of the selected cells
    const getCellValue = ([x, y]: [number, number]) => board[x][y].value;

    // Get the selected cells
    const [cell1, cell2] = selected;

    const sumSelected = selected.reduce((acc, [x, y]) => acc + board[x][y].value, 0);

    const isSameValues = getCellValue(cell1) === getCellValue(cell2);

    // Check if the sum of the selected cells is equal to 10
    const isPassed = sumSelected === 10 || isSameValues;
    if (isPassed) {
      // Add the selected cells to the passed array
      setPassed((prev) => [...prev, ...selected]);
      playSound('success');
    } else {
      playSound('error');
    }
    return isPassed;
  }, [board, selected]);

  // Clear the selected cells and passed cells when the board changes
  useEffect(() => {
    clearSelection();
    setPassed([]);
  }, [board, clearSelection]);

  // Check if the selected cells are valid
  useEffect(() => {
    if (selected.length !== 2) return;

    // Check if the selected cells are valid according to the game rules
    if (!isValidSelection(selected, passed)) {
      console.log('invalid selection');
      playSound('error');
      clearSelection();
      return;
    }
    // Compare the selected cells
    compareCells();
    // Clear the selected cells
    clearSelection();
  }, [clearSelection, compareCells, passed, selected]);

  return (
    <div className={s.wrapper}>
      <div className="grid w-fit gap-1 sm:gap-2" style={{ grid: `auto / repeat(${DEFAULT_BOARD_SIZE.cols}, 1fr)` }}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              coords={cell.coordinates}
              value={cell.value}
              selected={selected.includes(cell.coordinates)}
              passed={passed.includes(cell.coordinates)}
              onClick={(coords) => {
                // Deselect if already selected
                if (selected.includes(coords)) {
                  playSound('click2');
                  setSelected((prev) => prev.filter((c) => c !== coords));
                  console.log('deselect');
                  return;
                }

                // Toggle selection
                setSelected((prev) => {
                  // Select only two cells
                  if (prev.length === 2) {
                    return [coords];
                  }
                  playSound('click');
                  // Select only if the cell is in the same row or column
                  return [...prev, coords];
                });
              }}
            />
          )),
        )}
      </div>
    </div>
  );
};
