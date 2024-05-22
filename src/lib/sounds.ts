import { Howl } from 'howler';

type SoundTypes = 'click' | 'click2' | 'error' | 'success';

const sounds: Record<SoundTypes, Howl> = {
  click: new Howl({ src: ['/mp3/click.mp3'] }),
  click2: new Howl({ src: ['/mp3/click2.mp3'] }),
  error: new Howl({ src: ['/mp3/error.mp3'] }),
  success: new Howl({ src: ['/mp3/success.mp3'] }),
};

/**
 * Play a sound effect
 * @param type - the type of sound to play
 */
export const playSound = (type: SoundTypes) => {
  sounds[type].play();
};

/*
export const backgroundMusic = new Howl({
  src: ['/mp3/game.mp3'],
  loop: true,
  volume: 2,
  autoplay: true,
  onplay: function () {
    // Fade in the volume from 0 to 1 over 2 seconds (2000 milliseconds)
    backgroundMusic.fade(0, 0.01, 10000);
  },
  onplayerror: function () {
    backgroundMusic.once('unlock', function () {
      alert('Please interact with the page to play the background music');
      backgroundMusic.play();
    });
  },
});
*/
