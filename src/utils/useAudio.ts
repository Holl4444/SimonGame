import bmHigh from '../../assets/b-m-high.mp3';
import fTone from '../../assets/f.mp3';
import dmTone from '../../assets/d-m.mp3';
import bmLow from '../../assets/b-m-low.mp3';

// Create audio elements
export const audioFiles = {
  red: new Audio(fTone),
  blue: new Audio(bmLow),
  green: new Audio(bmHigh),
  yellow: new Audio(dmTone),
};

// Track the current audio file
let currentlyPlaying: HTMLAudioElement | null = null;

// Preload audio files when the app launches
Object.values(audioFiles).forEach((audio) => {
  audio.load();
});

export function playSound(id: string) {
  // Stop any sound currently playing
  if (currentlyPlaying && !currentlyPlaying.paused) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
  }

  const audio = audioFiles[id as keyof typeof audioFiles];
  // Always play from start
  audio.currentTime = 0;
  // Set as currently playing and play the sound
  currentlyPlaying = audio;
  audio
    .play()
    .catch((err) => console.log(`Audio player error: `, err));
}
