import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid } from '@/components/grid/grid.tsx';
import { TBoard, TCell, Timeout } from '@/types/game.ts';
import { generateBoard } from '@/lib/board.ts';

import { BOOSTER_MAX, BOOSTER_RESET_INTERVAL, DEFAULT_BOARD_SIZE, SHUFFLE_MAX, SHUFFLE_REFRESH_INTERVAL } from '@/config/const.ts';
import { getRandomNumber } from '@/lib/utils.ts';

// Styles

export const App = () => {
  const [board, setBoard] = useState<TBoard>(generateBoard(DEFAULT_BOARD_SIZE));
  const [shuffleCount, setShuffleCount] = useState(0);
  const [score, setScore] = useState(0);
  const [boosterK, setBoosterK] = useState(1);
  const timerRef = useRef<Timeout>(null);

  const size = DEFAULT_BOARD_SIZE; // temporary -> TODO: remove

  const updateBoard = useCallback(() => setBoard(generateBoard(DEFAULT_BOARD_SIZE)), []);

  // Shuffle the unsolved cells
  const shuffleUnsolved = useCallback(() => {
    if (shuffleCount <= 0) return;
    const shuffledBoard = board.map((row) =>
      row.map(
        (cell) =>
          ({
            ...cell, // Keep the cell as is ...
            value: getRandomNumber(), // & generate new random number between 1 and 9
          }) satisfies TCell,
      ),
    );
    setBoard(shuffledBoard);
    setShuffleCount((prev) => prev - 1);
  }, [board, shuffleCount]);

  // Increase the shuffle count after a certain interval
  useEffect(() => {
    const timerId = setInterval(() => {
      if (shuffleCount >= 2) return;
      setShuffleCount((prev) => Math.min(prev + 1, SHUFFLE_MAX));
    }, SHUFFLE_REFRESH_INTERVAL);
    return () => clearInterval(timerId);
  }, [shuffleCount]);

  // Increase the boosterK after each successful match and
  // reset it after a certain interval
  useEffect(() => {
    if (!score) return;

    // Increment boosterK up to a maximum
    setBoosterK((prev) => Math.min(prev + 1, BOOSTER_MAX));

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to reset boosterK after 5 seconds
    timerRef.current = setTimeout(() => {
      setBoosterK(1);
    }, BOOSTER_RESET_INTERVAL);

    // Clean up the timer on component unmount
    return () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
    };
  }, [score]);

  return (
    <section className="grid min-h-dvh items-center justify-center">
      <div className="space-y-2">
        <header className="flex gap-2 py-2 text-3xl font-bold text-purple-500">
          <h2 className="flex gap-2">
            <span className="text-primary-gradient">
              Nums{' • '}
              <small>
                {size.cols}×{size.rows}
              </small>
            </span>
            <button className="btn" onClick={() => updateBoard()}>
              New Game
            </button>
            {!!shuffleCount && (
              <button className="self-center rounded-md border border-purple-400 px-2 text-sm" onClick={shuffleUnsolved}>
                Shuffle
              </button>
            )}
          </h2>
          {!!score && (
            <span>
              🕹️ {score} <span className="pulse inline-flex animate-pulse align-super text-sm">{boosterK > 1 ? `×${boosterK}` : ''}</span>
            </span>
          )}
        </header>

        <Grid board={board} size={DEFAULT_BOARD_SIZE} onSolve={(score) => setScore((prev) => prev + score * boosterK)} />

        <footer className="pt-2 text-sm text-slate-500">
          <p>
            Select two cells with the <strong>same number</strong> or with a <strong>sum of 10</strong> to score points. Fast matches give a
            booster multiplier.
          </p>
          <p>
            Check source code on my GitHub:{' '}
            <a href="https://github.com/floatrx/nums-demo" target="_blank" rel="noopener noreferrer">
              floatrx/nums-demo
            </a>
            .
          </p>
        </footer>
      </div>
    </section>
  );
};
