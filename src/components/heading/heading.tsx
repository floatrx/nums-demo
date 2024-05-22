import { TGridSize } from '@/types/game';

// Styles
import s from './heading.module.css';

interface IProps {
  size: TGridSize;
  onReset: () => void;
  onShuffle: () => void;
  canShuffle: boolean;
}

export const Heading: FC<IProps> = ({ size, onReset, canShuffle, onShuffle }) => (
  <h2 className={s.wrapper}>
    <span className={s.name}>
      Nums{' • '}
      <small>
        {size.cols}×{size.rows}
      </small>
    </span>
    <button className={s.button} onClick={onReset}>
      New <span className={s.optional}>Game</span>
    </button>
    {canShuffle && (
      <button className={s.button} onClick={onShuffle}>
        Shuffle
      </button>
    )}
  </h2>
);
