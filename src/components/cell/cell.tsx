import { useCallback } from 'react';

// Styles
import { cn } from '@/lib/utils';
import s from './cell.module.css';
import type { TCoordinates } from '@/types/game';

interface IProps {
  coords: [number, number];
  onClick?: (coords: TCoordinates) => void;
  value?: number;
  selected?: boolean;
  passed?: boolean;
}

export const Cell: FC<IProps> = ({ coords, value, selected, passed, onClick }) => {
  const handleSelect = useCallback(() => {
    onClick?.(coords);
  }, [onClick, coords]);

  return (
    <div onClick={handleSelect} className={cn(s.cell, selected && s.selected, passed && s.passed)}>
      {value}
    </div>
  );
};
