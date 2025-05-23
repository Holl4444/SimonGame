import styles from '../App.module.css';
import type { ColourRefs } from "./types";

export const playSequence = (
    order: string[],
    currentOrderIndex: number,
    refs: ColourRefs,
    setIsDisabled: (disabled: boolean) => void,
    setSequence: (sequence: string[]) => void
) => {

    console.log('playSequence called');
      type ColourKey = keyof typeof refs;
    
      const sequence = order.slice(0, currentOrderIndex + 1);
      setSequence(sequence);
    
      setIsDisabled(true);
      const lastIndex = sequence.length - 1;
    
      sequence.forEach((colour, index) => {
        setTimeout(() => {
          const colourKey = colour as ColourKey;
          const colourPlaying = refs[colourKey];
          console.log(`Playing colour ${index + 1}/${sequence.length}: ${colour}`);
       
          if (colourPlaying?.current) {
            colourPlaying.current.classList.add(styles.playing);
    
            setTimeout(() => {
              colourPlaying.current?.classList.remove(styles.playing);
            }, 500);
            }
            
        if (index === lastIndex) {
            setTimeout(() => {
            setIsDisabled(false);
            }, 600);
            }
            
        }, (index + 1) * 1000);
      });
    }

