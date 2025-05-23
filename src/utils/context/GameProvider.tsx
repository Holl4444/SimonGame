import { useState, useMemo, type ReactNode } from 'react';
import getColourOrder from '../helperFunctions';
import { GameContext } from './GameContext';

// Make provider component to wrap the app and share state with lower level componenets
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState(getColourOrder());
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [memoryArray, setMemoryArray] = useState<string[]>([]);
  const [sequence, setSequence] = useState<string[]>([order[0]]);
  const [btnText, setBtnText] = useState<string>('Start');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [secToStart, setSecToStart] = useState(3);

  const value = useMemo(
    () => ({
      order,
      setOrder,
      currentOrderIndex,
      setCurrentOrderIndex,
      isDisabled,
      setIsDisabled,
      memoryArray,
      setMemoryArray,
      sequence,
      setSequence,
      btnText,
      setBtnText,
      isCountingDown,
      setIsCountingDown,
      secToStart,
      setSecToStart,
    }),
    [
      order,
      setOrder,
      currentOrderIndex,
      setCurrentOrderIndex,
      isDisabled,
      setIsDisabled,
      memoryArray,
      setMemoryArray,
      sequence,
      setSequence,
      btnText,
      setBtnText,
      isCountingDown,
      setIsCountingDown,
      secToStart,
      setSecToStart,
    ]
  );

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
