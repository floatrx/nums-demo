/**
 * Generate a random number between min and max
 * @param min - minimum value (default 1)
 * @param max - maximum value (default 10)
 */
export const randomNumber = (min: number = 1, max: number = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
