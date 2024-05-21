import { useCallback, useState } from 'react';
import { Grid } from '@/components/grid/grid.tsx';
import { IBoard } from '@/types/game.ts';
import { generateBoard } from '@/lib/game.ts';

import { DEFAULT_BOARD_SIZE } from '@/config/const.ts';

export const App = () => {
  const [board, setBoard] = useState<IBoard>(generateBoard(DEFAULT_BOARD_SIZE));
  const size = DEFAULT_BOARD_SIZE; // temporary -> TODO: remove
  const updateBoard = useCallback(() => setBoard(generateBoard(DEFAULT_BOARD_SIZE)), []);

  const handleReset = useCallback(() => {
    updateBoard();
  }, [updateBoard]);

  return (
    <section>
      <div className="container">
        <div className="mt-5 flex gap-2">
          <h2 className="flex gap-2 py-2 text-3xl font-bold text-purple-500">
            <span>
              Nums {size.cols}x{size.rows}
            </span>
            <button className="self-center rounded-md border border-purple-400 px-2 text-sm" onClick={handleReset}>
              Refresh
            </button>
          </h2>
        </div>

        <Grid board={board} size={DEFAULT_BOARD_SIZE} />
      </div>
    </section>
  );
};
