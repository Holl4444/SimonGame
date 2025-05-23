import { createContext } from 'react';
import type { GameContextType } from '../types';

// Initialise context with empty state
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
