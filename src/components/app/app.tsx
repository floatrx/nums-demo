import { Footer } from '@/components/footer/footer';
import { Grid } from '@/components/grid/grid';
import { Heading } from '@/components/heading/heading';
import { Score } from '@/components/score/score';
import { useGame } from '@/hooks/use-game';

import { DEFAULT_BOARD_SIZE } from '@/config/const';

// Styles
import s from './app.module.css';

export const App = () => {
  const { board, boosterK, resetGame, score, setScore, shuffleCount, shuffleUnsolved } = useGame();
  return (
    <section className={s.section}>
      <header className={s.heading}>
        <Heading onReset={resetGame} onShuffle={shuffleUnsolved} canShuffle={!!shuffleCount} size={DEFAULT_BOARD_SIZE} />
        <Score value={score} multiplier={boosterK} />
      </header>
      <Grid board={board} size={DEFAULT_BOARD_SIZE} onSolve={(score) => setScore((prev) => prev + score * boosterK)} />
      <Footer />
    </section>
  );
};
