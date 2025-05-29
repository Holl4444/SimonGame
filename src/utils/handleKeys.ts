import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect } from 'react';
import type { ColourKey, ColourRefs } from './types';

// Keyboard compatability
export default function handleKeys(
  e: ReactKeyboardEvent<HTMLDivElement>,
  isDisabled: boolean,
  handleClick: () => void
) {
  if (isDisabled) return;

  // Handle tab selection
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
}

// Allow arrow key play to avoid tabbing through entire page.
export function useArrowKeys(refs: ColourRefs, isDisabled: boolean) {
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (isDisabled) return;

      let arrowId: ColourKey | null = null;

      switch (e.key) {
        case 'ArrowUp':
          arrowId = 'red';
          break;
        case 'ArrowRight':
          arrowId = 'blue';
          break;
        case 'ArrowDown':
          arrowId = 'green';
          break;
        case 'ArrowLeft':
          arrowId = 'yellow';
          break;
        default:
          break;
      }

      if (arrowId) {
        e.preventDefault();
      }

      // Trigger a click on the matching ColourBlock
      if (arrowId && refs[arrowId]?.current) {
        refs[arrowId].current?.dispatchEvent(
          new MouseEvent('mousedown', { bubbles: true })
        );
      }
    };

    document.addEventListener('keydown', handleArrowKeys);
    return () => {
      document.removeEventListener('keydown', handleArrowKeys);
    };
  }, [isDisabled, refs]);
}
