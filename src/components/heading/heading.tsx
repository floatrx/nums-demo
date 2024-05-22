import { Shuffle } from 'lucide-react';
import { TGridSize } from '@/types/game';
import { cn } from '@/lib/utils';

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
      <button className={cn(s.button, s.shuffle)} onClick={onShuffle}>
        <Shuffle className={s.icon} />
      </button>
    )}
  </h2>
);
