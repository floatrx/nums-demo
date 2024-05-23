import { cn } from '@/lib/utils';
import type { TCoordinates } from '@/types/game';
// Styles
import s from './cell.module.scss';

interface IProps {
  position: TCoordinates;
  onClick?: (coords: TCoordinates) => void;
  value?: number;
  selected?: boolean;
  solved?: boolean;
}

export const Cell: FC<IProps> = ({ position, value, selected, solved, onClick }) => (
  <div onClick={() => onClick?.(position)} className={cn(s.cell, selected && s.selected, solved && s.passed)}>
    {value}
  </div>
);
