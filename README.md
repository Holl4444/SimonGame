# SIMON MEMORY GAME


Memo (Simon Game)
A modern, accessible Simon memory game built with React and TypeScript.

Features
Classic Simon gameplay: Repeat the sequence of tones and colors as it grows.
Keyboard accessible: Play using arrow keys (← for red, ↑ for blue, → for green, ↓ for yellow) or by clicking the coloured blocks.
Screen reader support: Hidden instructions and ARIA attributes for an inclusive experience.
Responsive design: Works on desktop and mobile browsers.
Accessible start button: Only interactable when the game is ready to start.

How to Play
Click the Start button or press Enter when focused.
Watch and listen to the sequence.
Repeat the sequence using your mouse or the arrow keys.
The sequence gets longer each round—see how far you can go!

Keyboard Controls
Start Game: Tab to the Start button and press Enter/Space, or click it.
Repeat Sequence: Use arrow keys:
Left Arrow (←): Red
Up Arrow (↑): Blue
Right Arrow (→): Green
Down Arrow (↓): Yellow

Accessibility
Screen reader only instructions are provided at the start of the game.
ARIA attributes are used for all interactive elements.
Tab order and focus management ensure smooth keyboard navigation.
No visual clutter: Accessibility features are implemented without affecting the minimalist UI.

Development
Install dependencies
Run locally
Build for production
Preview production build
Project Structure
ColourBlock.tsx – The main color button component
App.tsx – Main app logic and layout
handleKeys.ts – Keyboard and accessibility utilities
useAudio.ts – Audio playback logic

License
MIT

TODO:


// Add: Mark moment of win / loss

// Decide whether to permit endless chains / add High Score table

// Refactor state - not all needed

// Mobile responsitivity

//Get T to test this fix!: race conditions on button spamming