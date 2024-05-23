import { RotateCw, Shuffle } from 'lucide-react';
import type { TBoardSize } from '@/types/game';
// Styles
import s from './heading.module.scss';

interface IProps {
  size: TBoardSize;
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
    <div className={s.actions}>
      <button className={s.button} onClick={onReset}>
        <RotateCw className={s.icon} />
      </button>
      {canShuffle && (
        <button className={s.button} onClick={onShuffle}>
          <Shuffle className={s.icon} />
        </button>
      )}
    </div>
  </h2>
);
