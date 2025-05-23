import { useState, useEffect } from 'react';
import getColourOrder from './helperFunctions';
import { playSequence } from './playSequence';
import type { ColourRefs } from './types';
import { useGameContext } from './context/contextHook';

export const useMemoryArray = () => {
  const [memoryArray, setMemoryArray] = useState<string[]>([]);
  return { memoryArray, setMemoryArray };
};

export const useOrder = () => {
  const [order, setOrder] = useState(getColourOrder());
  return { order, setOrder };
};

export const useCurrentOrderIndex = () => {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  return { currentOrderIndex, setCurrentOrderIndex };
};

export const useIsDisabled = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  return { isDisabled, setIsDisabled };
};

export const useSequence = () => {
  const { order } = useOrder();
  const { currentOrderIndex } = useCurrentOrderIndex();
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    setSequence(order.slice(0, currentOrderIndex));
  }, [order, currentOrderIndex]);
  
  return { sequence, setSequence };
};

export const useIsCountingDown = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  return { isCountingDown, setIsCountingDown };
};

export const useBtnText = () => {
  const [btnText, setBtnText] = useState('Start');
  return { btnText, setBtnText };
};

export const useSecToStart = () => {
  const [secToStart, setSecToStart] = useState(3);
  return { secToStart, setSecToStart };
};

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
