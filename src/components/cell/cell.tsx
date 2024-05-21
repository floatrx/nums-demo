import { useCallback } from 'react';

// Styles
import { cn } from '@/lib/utils.ts';
import s from './cell.module.css';

interface IProps {
  coords: [number, number];
  onClick?: (coords: [number, number]) => void;
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
