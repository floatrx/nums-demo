import { useCallback } from 'react';
import { Footer } from '@/components/footer/footer';
import { Grid } from '@/components/grid/grid';
import { Heading } from '@/components/heading/heading';
import { Score } from '@/components/score/score';
import { useAnimation } from '@/hooks/use-animation.ts';
import { useGame } from '@/hooks/use-game';

import { DEFAULT_BOARD_SIZE } from '@/config/const';

// Styles
import s from './app.module.css';

export const App = () => {
  const { ref, shake } = useAnimation();
  const { board, boosterK, resetGame, score, setScore, shuffleCount, shuffleUnsolved } = useGame();

  const handleShuffle = useCallback(() => {
    shuffleUnsolved();
    shake();
  }, [shake, shuffleUnsolved]);

  const handleReset = useCallback(() => {
    resetGame();
    shake();
  }, [resetGame, shake]);

  return (
    <section className={s.section}>
      <header className={s.heading}>
        <Heading onReset={handleReset} onShuffle={handleShuffle} canShuffle={!!shuffleCount} size={DEFAULT_BOARD_SIZE} />
        <Score value={score} multiplier={boosterK} />
      </header>
      <Grid ref={ref} board={board} size={DEFAULT_BOARD_SIZE} onSolve={(score) => setScore((prev) => prev + score * boosterK)} />
      <Footer />
    </section>
  );
};
