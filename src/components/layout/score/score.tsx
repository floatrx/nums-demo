// Styles
import s from './score.module.css';

interface IProps {
  value: number;
  multiplier: number;
}

export const Score: FC<IProps> = ({ value, multiplier }) => {
  if (!value) return null;
  return (
    <div className={s.wrapper}>
      🕹️ <span className={s.value}>{value}</span> <span className={s.multiplier}>{multiplier > 1 ? `×${multiplier}` : ''}</span>
    </div>
  );
};
