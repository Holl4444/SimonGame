import { useState } from 'react';
import styles from './ColourBlock.module.css';
import { useGameContext } from './utils/context/contextHook';
import { playSequence } from './utils/playSequence';
import type { ColourRefs } from './utils/types';
import { playSound } from './utils/useAudio';

export default function ColourBlock({
  id,
  refs,
}: {
  id: 'red' | 'blue' | 'green' | 'yellow';
  refs: ColourRefs;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const {
    order,
    currentOrderIndex,
    setCurrentOrderIndex,
    isDisabled,
    setIsDisabled,
    memoryArray,
    setMemoryArray,
    sequence,
    setSequence,
    sequenceLength,
    setSequenceLength,
    setBtnText,
  } = useGameContext();

  function handleClick() {
    if (isDisabled) return;

    Object.keys(refs).forEach((colour) => {
      refs[colour as keyof typeof refs].current?.classList.remove(
        styles.selected
      );
    });

    const expectedColour = sequence[currentOrderIndex];
    const nextIndex = currentOrderIndex + 1;
    const nextSequenceLength = sequenceLength + 1;

    playSound(id);

    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 500);

    refs[id].current?.classList.add(styles.selected);
    setTimeout(
      () => refs[id].current?.classList.remove(styles.selected),
      500
    );

    if (expectedColour !== id) {
      // Play aggresive wrong noise
      //Add `lost after X turns` message
      // Disable all colours
      setIsDisabled(true);
      console.log(`Game Over`);
      setBtnText(`Game Over`);
      setTimeout(() => {
        setBtnText('Start');
      }, 3000);

      return;
    }

    //if the entire order was completed
    if (nextIndex >= order.length) {
      console.log(`Woohoo you're amazing, you win`);
      setIsDisabled(true);
      setBtnText('You Win 😍');
      setTimeout(() => {
        setBtnText('Start');
      }, 3000);
      return;
      //add flashing light sequence
    }

    const updatedMemoryArray = [...memoryArray, id];
    setMemoryArray(updatedMemoryArray);
    setCurrentOrderIndex(nextIndex);

    // if the sequence is complete
    if (nextIndex >= sequenceLength) {
      console.log(`Sequence complete, next level...`);
      setSequenceLength(nextSequenceLength);
      setCurrentOrderIndex(0);
      setIsDisabled(true);
      setMemoryArray([]);

      setTimeout(() => {
        playSequence(
          order,
          sequenceLength,
          refs,
          updatedMemoryArray,
          setIsDisabled,
          setSequence,
          setBtnText,
          setSequenceLength
        );
      }, 1000);
    }
  }

  return (
    <div
      className={`${styles.colourBlock} ${
        isDisabled && styles.disableBtn
      } ${isSelected ? styles.selected : ''}`}
      id={styles[id]}
      ref={refs[id]}
      onMouseDown={handleClick}
    ></div>
  );
}
