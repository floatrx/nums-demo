import { useCallback, useRef } from 'react';

import { playSound } from '@/lib/sounds';

export const useAnimation = () => {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const shake = useCallback(() => {
    if (!boardRef.current) return;

    playSound('shake');

    boardRef.current?.classList.add('animation-shake');

    const timer = setTimeout(() => {
      boardRef.current?.classList.remove('animation-shake');
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return {
    shake,
    boardRef,
  };
};
