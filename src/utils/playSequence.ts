import styles from '../ColourBlock.module.css'
import type { ColourRefs, ColourKey } from './types';
import UIfx from 'uifx';
import bmHigh from '../assets/B-m-high.mp3';
import fTone from '../assets/F.mp3';
import bmLow from '../assets/B-m-low.mp3';
import dmTone from '../assets/D-m.mp3';

export const playSequence = (
  order: string[],
  sequenceLength: number,
  refs: ColourRefs,
  memoryArray: string[] | null,
  setIsDisabled: (disabled: boolean) => void,
  setSequence: (sequence: string[]) => void,
  setBtnText: (btnText: string) => void,
  setSequenceLength: (sequenceLength: number) => void
) => {

  setBtnText('Listen');
  console.log(`memoryArray: `, memoryArray);
  function playTone(colour: string) {
    const tone = new UIfx(
      colour === 'red'
        ? fTone
        : colour === 'blue'
        ? bmLow
        : colour === 'green'
        ? bmHigh
        : dmTone,
      {
        volume: 1.0,
        throttleMs: 0,
      }
    );
    tone.play();
  }

  const sequence = order.slice(0, sequenceLength + 1);
  console.log(`sequenceLength: `, sequenceLength);

  setIsDisabled(true);
  const lastIndex = sequence.length - 1;

  sequence.forEach((colour, index) => {
    setTimeout(() => {
      const colourKey: ColourKey = colour;
      const colourPlaying = refs[colourKey];
      const colourTone = colour;
      console.log(
        `Playing colour ${index + 1}/${sequence.length}: ${colour}`
      );

      if (colourPlaying?.current) {
        colourPlaying.current.classList.add(styles.playing);
        colourPlaying.current.classList.remove(styles.disabled);
        playTone(colourTone);

        setTimeout(() => {
          colourPlaying.current?.classList.remove(styles.playing);
          colourPlaying.current?.classList.add(styles.disabled);
        }, 500);
      }

      if (index === lastIndex) {
        setTimeout(() => {
          setIsDisabled(false);
          setSequence(
            order.slice(
              0,
              sequence.length + 1
            )
          );
          setSequenceLength(sequenceLength + 1);
          setBtnText('Go')
        }, 600);
      }
    }, (index + 1) * 600);
  });

};
