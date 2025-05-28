import styles from '../ColourBlock.module.css';
import type { ColourRefs, ColourKey } from './types';
import { playSound } from '../utils/useAudio';

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

  const sequence = order.slice(0, sequenceLength + 1);
  console.log(`sequenceLength: `, sequenceLength);

  setIsDisabled(true);
  const lastIndex = sequence.length - 1;

  sequence.forEach((colour, index) => {
    setTimeout(() => {
      playSound(colour);
      const colourKey: ColourKey = colour;
      const colourPlaying = refs[colourKey];
      console.log(
        `Playing colour ${index + 1}/${sequence.length}: ${colour}`
      );

      if (colourPlaying?.current) {
        colourPlaying.current.classList.add(styles.playing);
        colourPlaying.current.classList.remove(styles.disabled);

        setTimeout(() => {
          colourPlaying.current?.classList.remove(styles.playing);
          colourPlaying.current?.classList.add(styles.disabled);
        }, 500);
      }

      if (index === lastIndex) {
        setTimeout(() => {
          setIsDisabled(false);
          setSequence(order.slice(0, sequence.length + 1));
          setSequenceLength(sequenceLength + 1);
          setBtnText('Go');
        }, 600);
      }
    }, (index + 1) * 600);
  });
};
