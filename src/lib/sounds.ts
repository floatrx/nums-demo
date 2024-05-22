/**
 * Play a sound effect
 * @param type - the type of sound to play
 */
export const playSound = (type: 'click' | 'click2' | 'success' | 'error') => {
  const sounds = {
    click: new Audio('/mp3/click.mp3'), // select
    click2: new Audio('/mp3/click2.mp3'), // deselect
    error: new Audio('/mp3/error.mp3'), // invalid selection
    success: new Audio('/mp3/success.mp3'), // solved
  };
  sounds[type].play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};
