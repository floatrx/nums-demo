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
    <section className="grid min-h-screen items-center justify-center">
      <div className="container space-y-2">
        <header>
          <h2 className="flex gap-2 py-2 text-3xl font-bold text-purple-500">
            <span>
              Nums {size.cols}x{size.rows}
            </span>
            <button className="self-center rounded-md border border-purple-400 px-2 text-sm" onClick={handleReset}>
              New Game
            </button>
          </h2>
        </header>

        <Grid board={board} size={DEFAULT_BOARD_SIZE} />

        <footer className="text-sm text-slate-500">
          &copy; 2024 Nums Game. GitHub:{' '}
          <a href="https://github.com/floatrx/nums-demo" target="_blank" rel="noopener noreferrer">
            floatrx/nums-demo
          </a>
        </footer>
      </div>
    </section>
  );
};
