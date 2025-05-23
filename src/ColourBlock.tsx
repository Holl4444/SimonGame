import styless from './ColourBlock.module.css';
import { useGameContext } from './utils/context/contextHook';
import { playSequence } from './utils/playSequence';
import type { ColourRefs } from './utils/types';

export default function ColourBlock({
  id,
  refs,
}: {
  id: 'red' | 'blue' | 'green' | 'yellow';
  refs: ColourRefs;
}) {
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
  } = useGameContext();

  function handleClick() {
    const expectedColour = sequence[currentOrderIndex];
    const nextIndex = currentOrderIndex + 1;
    const nextSequenceLength = sequenceLength + 1;

    if (expectedColour !== id) {
      // Play aggresive wrong noise
      //Add `lost after X turns` message
      // Disable all colours
      setIsDisabled(true);
      console.log(`Game Over`);
      return;
    }

    //if the entire order was completed
    if (nextIndex >= order.length) {
      console.log(`Woohoo you're amazing, you win`);
      setIsDisabled(true);
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
          setIsDisabled,
          setSequence
        );
      }, 1000);
    }
  }

  return (
    <div
      className={`${styless.colourBlock} ${
        isDisabled && styless.disableBtn
      }`}
      id={styless[id]}
      ref={refs[id]}
      onClick={handleClick}
    ></div>
  );
}
