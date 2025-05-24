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
        setBtnText('Start');
        setIsCountingDown(false);

        playSequence(
          order,
          currentOrderIndex,
          refs,
          setIsDisabled,
          setSequence
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
