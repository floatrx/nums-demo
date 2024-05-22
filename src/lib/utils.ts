import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a random number between min and max
 * @param min - minimum value (default 1)
 * @param max - maximum value (default 10)
 */
export const getRandomNumber = (min: number = 1, max: number = 9) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculate the percentage of count in total
 * @param count
 * @param total
 */
export const calcPercentage = (count: number, total: number): number => {
  return +(!total ? 0 : (count / total) * 100).toFixed();
};
