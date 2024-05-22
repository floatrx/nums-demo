import { useCallback, useState } from 'react';
import { Footer } from '@/components/footer/footer';
import { Grid } from '@/components/grid/grid';
import { Heading } from '@/components/heading/heading';
import { Score } from '@/components/score/score';
import { calcPercentage } from '@/lib/utils';
import { useAnimation } from '@/hooks/use-animation';
import { useGame } from '@/hooks/use-game';

import { DEFAULT_BOARD_SIZE } from '@/config/const';

// Styles
import s from './app.module.css';
import { playSound } from '@/lib/sounds';

export const App = () => {
  const [isWin, setWin] = useState(false);
  const { ref, shake } = useAnimation();
  const { board, boosterK, resetGame, score, setScore, shuffleCount, shuffleUnsolved } = useGame();

  const totalCells = DEFAULT_BOARD_SIZE.rows * DEFAULT_BOARD_SIZE.cols;

  const handleShuffle = useCallback(() => {
    shuffleUnsolved();
    shake();
  }, [shake, shuffleUnsolved]);

  const handleReset = useCallback(() => {
    setWin(false);
    resetGame();
    shake();
  }, [resetGame, shake]);

  return (
    <section className={s.section}>
      {isWin ? (
        <h2 className={s.win}>
          <em className={s.icon}>🎊</em>
          <span className={s.text}>YOU WON!</span>
          <div className={s.score}>{score}</div>
          <button className={s.button} onClick={handleReset}>
            New Game
          </button>
        </h2>
      ) : (
        <>
          <header className={s.heading}>
            <Heading onReset={handleReset} onShuffle={handleShuffle} canShuffle={!!shuffleCount && !isWin} size={DEFAULT_BOARD_SIZE} />
            <Score value={score} multiplier={boosterK} />
          </header>
          <Grid
            ref={ref}
            board={board}
            size={DEFAULT_BOARD_SIZE}
            onSolve={(score, remain) => {
              setScore((prev) => prev + score * boosterK);
              if (calcPercentage(remain, totalCells) <= 15) {
                setWin(true);
                playSound('win');
              }
            }}
          />
        </>
      )}
      <Footer />
    </section>
  );
};
