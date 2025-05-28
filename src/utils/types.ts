import type { RefObject } from 'react';

export interface ColourRefs {
  red: RefObject<HTMLDivElement | null>;
  blue: RefObject<HTMLDivElement | null>;
  green: RefObject<HTMLDivElement | null>;
  yellow: RefObject<HTMLDivElement | null>;

  [key: string]: RefObject<HTMLDivElement | null>;
}

export interface GameContextType {
  order: string[];
  setOrder: (order: string[]) => void;
  currentOrderIndex: number;
  setCurrentOrderIndex: (index: number) => void;
  isDisabled: boolean;
  setIsDisabled: (disabled: boolean) => void;
  memoryArray: string[];
  setMemoryArray: (memory: string[]) => void;
  sequence: string[];
  setSequence: (sequence: string[]) => void;
  btnText: string;
  setBtnText: (text: string) => void;
  isCountingDown: boolean;
  setIsCountingDown: (counting: boolean) => void;
  secToStart: number;
  setSecToStart: (seconds: number) => void;
  sequenceLength: number;
  setSequenceLength: (length: number) => void;
}

export type ColourKey = keyof ColourRefs;
