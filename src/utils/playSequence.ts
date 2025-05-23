import styles from '../ColourBlock.module.css'
import type { ColourRefs, ColourKey } from './types';

export const playSequence = (
  order: string[],
  sequenceLength: number,
  refs: ColourRefs,
  setIsDisabled: (disabled: boolean) => void,
  setSequence: (sequence: string[]) => void
) => {
  console.log(`sequenceLength: `, sequenceLength);
  const sequence = order.slice(0, sequenceLength + 1);
  setSequence(sequence);

  setIsDisabled(true);
  const lastIndex = sequence.length - 1;

  sequence.forEach((colour, index) => {
    setTimeout(() => {
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
        }, 600);
      }
    }, (index + 1) * 1000);
  });
};
