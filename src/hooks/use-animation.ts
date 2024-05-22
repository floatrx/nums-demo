import { useCallback, useRef } from 'react';
import { playSound } from '@/lib/sounds.ts';

export const useAnimation = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shake = useCallback(() => {
    if (!ref.current) return;

    playSound('shake');

    ref.current?.classList.add('animation-shake');
    const timer = setTimeout(() => {
      ref.current?.classList.remove('animation-shake');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    shake,
    ref,
  };
};
