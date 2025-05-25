import { useCallback, useEffect } from 'react';
import getColourOrder from './helperFunctions';
import { playSequence } from './playSequence';
import type { ColourRefs } from './types';
import { useGameContext } from './context/contextHook';

export const useCountDown = (refs: ColourRefs) => {
  const {
    order,
    currentOrderIndex,
    setIsDisabled,
    setSequence,
    setBtnText,
    isCountingDown,
    setIsCountingDown,
    memoryArray,
    setSequenceLength
  } = useGameContext();

  const startCountdown = useCallback(() => {
    let count = 3;
    setBtnText(count.toString());

    const countdownInterval = setInterval(() => {
      count--;

      if (count > 0) {
        setBtnText(count.toString());
      } else {
        clearInterval(countdownInterval);
        setIsCountingDown(false);

        playSequence(
          order,
          currentOrderIndex,
          refs,
          memoryArray,
          setIsDisabled,
          setSequence,
          setBtnText,
          setSequenceLength
          
        );
      }
    }, 800);

    return () => clearInterval(countdownInterval);
  }, [
    order,
    currentOrderIndex,
    refs,
    setBtnText,
    setIsCountingDown,
    setIsDisabled,
    setSequence,
    memoryArray
  ]);

  useEffect(() => {
    if (!isCountingDown) return;

    return startCountdown();
  }, [isCountingDown, startCountdown]);
};

export function useStart() {
  const {
    setCurrentOrderIndex,
    setMemoryArray,
    setOrder,
    setIsCountingDown,
  } = useGameContext();
  return () => {
    setCurrentOrderIndex(0);
    setMemoryArray([]);
    setOrder(getColourOrder());
    setIsCountingDown(true);
  };
}
