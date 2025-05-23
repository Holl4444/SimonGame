import { useEffect } from 'react';
import getColourOrder from './helperFunctions';
import { playSequence } from './playSequence';
import type { ColourRefs } from './types';
import { useGameContext } from './context/contextHook';

export const useCountDown = (
  refs: ColourRefs,
) => {
   const {
      order,
      currentOrderIndex,
      setIsDisabled,
      setSequence,
      setBtnText,
      isCountingDown,
      setIsCountingDown,
      secToStart,
      setSecToStart,
    } = useGameContext();

  useEffect(() => {
    if (!isCountingDown) return;

    const countdownInterval = setInterval(() => {
      setBtnText(secToStart.toString());
      const newValue = secToStart - 1;
      setSecToStart(newValue);
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isCountingDown, secToStart, setBtnText, setSecToStart]);

  // When we countdown reaches zero
  useEffect(() => {
    if (secToStart === 0) {
      setBtnText('Start');
      setSecToStart(3);
      setIsCountingDown(false);
      playSequence(
        order,
        currentOrderIndex,
        refs,
        setIsDisabled,
        setSequence
      );
    }
  }, [
    secToStart,
    setBtnText,
    setSecToStart,
    setIsCountingDown,
    order,
    currentOrderIndex,
    refs,
    setIsDisabled,
    setSequence,
  ]);
};

export function useStart() {
  const { setCurrentOrderIndex, setMemoryArray, setOrder, setIsCountingDown } = useGameContext()
    return () => {
        setCurrentOrderIndex(0);
        setMemoryArray([]);
        setOrder(getColourOrder());
        setIsCountingDown(true);
    }
} 
