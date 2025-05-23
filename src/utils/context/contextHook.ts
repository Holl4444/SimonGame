import { useContext } from 'react';
import { GameContext } from './GameContext';
import type { GameContextType } from '../types';

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error(
      `useGameContext must be used within GameProvider`
    );
  }
  return context;
};
