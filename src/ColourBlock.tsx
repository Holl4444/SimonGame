import styles from './ColourBlock.module.css';
import { useMemoryArray, useOrder, useCurrentOrderIndex, useIsDisabled, useSequence } from './utils/hooks';
import { playSequence } from './utils/playSequence';
import type { ColourRefs } from './utils/types';

export default function ColourBlock({ id, refs}: {id: 'red' | 'blue' | 'green' | 'yellow', refs: ColourRefs}) {

    const { order } = useOrder();
    const { currentOrderIndex, setCurrentOrderIndex } = useCurrentOrderIndex();
    const { isDisabled, setIsDisabled } = useIsDisabled();
    const { memoryArray, setMemoryArray } = useMemoryArray();
    const { sequence, setSequence } = useSequence();
    
      function handleClick() {
        
        if (order[currentOrderIndex] !== id) {
          // Play aggresive wrong noise
          //Add `lost after X turns` message
          // Disable all colours
          setIsDisabled(true);
          console.log(`Game Over`);
        } else {
          setMemoryArray([...memoryArray, id])
          const nextIndex = currentOrderIndex + 1;
          setCurrentOrderIndex(nextIndex);
    
          if (nextIndex >= order.length) {
            console.log(`Woohoo you're amazing, you win`);
            setIsDisabled(true);
            return;
            //add flashing light sequence
          }
    
          if (nextIndex >= sequence.length) {
            console.log(`Sequence complete, next level...`);
            setTimeout(() => {
              playSequence(
                order,
                currentOrderIndex,
                refs,
                setIsDisabled,
                setSequence
              );
            }, 1000);
          }
    
        }
      }
    return (
      <div
        className={`${styles.colourBlock} ${
          isDisabled && styles.disableBtn
        }`}
        id={styles[id]}
        ref={refs[id]}
        onClick={handleClick}
      ></div>
    );
}