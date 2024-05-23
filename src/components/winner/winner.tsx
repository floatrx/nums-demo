// Styles
import s from './winner.module.scss';

interface IProps {
  score: number;
  onReset: () => void;
}

export const Winner: FC<IProps> = ({ score, onReset }) => {
  return (
    <div className={s.wrapper}>
      <em className={s.icon}>🎊</em>
      <span className={s.text}>YOU WON!</span>
      <div className={s.score} data-value={score}>
        {score}
      </div>
      <button className={s.button} onClick={onReset}>
        New Game
      </button>
    </div>
  );
};
