import { sound } from '@pixi/sound';

type SoundTypes = 'click' | 'click2' | 'error' | 'success';

const sounds: Array<{ src: string; id: SoundTypes }> = [
  { src: '/mp3/click.mp3', id: 'click' },
  { src: '/mp3/click2.mp3', id: 'click2' },
  { src: '/mp3/error.mp3', id: 'error' },
  { src: '/mp3/success.mp3', id: 'success' },
];

sounds.forEach(({ src, id }) => {
  sound.add(id, src);
});

/**
 * Play a sound effect
 * @param type - the type of sound to play
 */
export const playSound = (type: SoundTypes) => {
  sound.play(type);
};
