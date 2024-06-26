import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from '@/hooks/use-animation';
import { generateBoard } from '@/lib/board';
import { playSound } from '@/lib/sounds';
import { getRandomNumber } from '@/lib/utils';
import { BOOSTER_MAX, BOOSTER_RESET_INTERVAL, DEFAULT_BOARD_SIZE, SHUFFLE_MAX, SHUFFLE_REFRESH_INTERVAL } from '@/config/const';
import type { TBoard, TCell, TTimeout } from '@/types/game';

/**
 * Higher level game logic containing the board state and game actions
 * See also: useGrid.ts
 */
export const useApp = () => {
  const [isWin, setWin] = useState(false);
  const [board, setBoard] = useState<TBoard>(generateBoard(DEFAULT_BOARD_SIZE));
  const [shuffleCount, setShuffleCount] = useState(0);
  const [score, setScore] = useState(0);
  const [boosterK, setBoosterK] = useState(1);
  const boosterTimerRef = useRef<TTimeout>(null);

  const { boardRef, shake } = useAnimation();

  const resetGame = useCallback(() => {
    setBoard(generateBoard(DEFAULT_BOARD_SIZE));
    setScore(0);
    setBoosterK(1);
    setShuffleCount(0);
    setWin(false);
    playSound('shake');
    shake();
  }, [shake]);

  // Shuffle the unsolved cells
  const shuffle = useCallback(() => {
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
    shake();
  }, [board, shake, shuffleCount]);

  const requestSolver = useCallback(
    (score: number, remain: number) => {
      setScore((prev) => prev + score * boosterK);
      if (remain > 1) return; // continue game...
      setWin(true);
      playSound('win');
    },
    [boosterK],
  );

  // Increase the shuffle count after a certain interval
  useEffect(() => {
    const timerId = setInterval(() => {
      if (shuffleCount >= SHUFFLE_MAX) return;
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
    if (boosterTimerRef.current) {
      clearTimeout(boosterTimerRef.current);
    }

    // Set a new timer to reset boosterK after 5 seconds
    boosterTimerRef.current = setTimeout(() => {
      setBoosterK(1);
    }, BOOSTER_RESET_INTERVAL);

    // Clean up the timer on component unmount
    return () => {
      if (!boosterTimerRef.current) return;
      clearTimeout(boosterTimerRef.current);
    };
  }, [score]);

  return {
    isWin,
    board,
    shuffleCount,
    score,
    boosterK,
    resetGame,
    shuffle,
    requestSolver,
    boardRef,
  };
};
