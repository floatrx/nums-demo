import { useApp } from '@/hooks/use-app';
import { Board } from '@/components/board/board';
import { Footer } from '@/components/layout/footer/footer';
import { Heading } from '@/components/layout/heading/heading';
import { Score } from '@/components/layout/score/score';
import { Winner } from '@/components/winner/winner';
import { DEFAULT_BOARD_SIZE } from '@/config/const';

export const App = () => {
  const { isWin, board, score, boosterK, shuffle, shuffleCount, resetGame, requestSolver, boardRef } = useApp();
  return (
    <main className="main">
      {isWin ? (
        <Winner score={score} onReset={resetGame} />
      ) : (
        <>
          <header className="header">
            <Heading onReset={resetGame} onShuffle={shuffle} canShuffle={!!shuffleCount && !isWin} size={DEFAULT_BOARD_SIZE} />
            <Score value={score} multiplier={boosterK} />
          </header>
          <Board className="board" ref={boardRef} board={board} size={DEFAULT_BOARD_SIZE} onSolve={requestSolver} />
        </>
      )}
      <Footer />
    </main>
  );
};
