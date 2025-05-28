import { useMemo, useRef, useEffect } from 'react';
import { useGameContext } from './utils/context/contextHook';
import { audioFiles } from './utils/useAudio';
import { useStart, useCountDown } from './utils/hooks';
import styles from './App.module.css';
import ColourBlock from './ColourBlock';

export default function App() {
  const { btnText, sequenceLength } = useGameContext();

  useEffect(() => {
    const unlockAudioForIOS = () => {
      try {
        // Create and immediately play+pause a silent audio buffer
        // prettier-ignore
        // eslint-disable-next-line
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          const buffer = audioContext.createBuffer(1, 1, 22050);
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start(0);
          source.stop(0.001);
        }

        // Also "wake up" your audio elements
        if (audioFiles) {
          Object.values(audioFiles).forEach((audio) => {
            audio.volume = 0;
            audio
              .play()
              .then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 1;
              })
              .catch(() => {});
          });
        }

        console.log('Audio unlocked for iOS');
      } catch (e) {
        console.log('Audio unlock failed:', e);
      }
    };

    // Listen for first touch
    document.addEventListener('touchstart', unlockAudioForIOS, {
      once: true,
    });

    // Clean up
    return () => {
      document.removeEventListener('touchstart', unlockAudioForIOS);
    };
  }, []);

  const red = useRef<HTMLDivElement>(null);
  const blue = useRef<HTMLDivElement>(null);
  const green = useRef<HTMLDivElement>(null);
  const yellow = useRef<HTMLDivElement>(null);

  const centreBtn = useRef<HTMLButtonElement>(null);

  const refs = useMemo(
    () => ({
      red,
      blue,
      green,
      yellow,
    }),
    []
  );

  const colours: string[] = ['red', 'blue', 'green', 'yellow'];

  const start = useStart();

  useCountDown(refs);

  return (
    <div className={`${styles.content} ${styles.leagueGothicNormal}`}>
      <article className={styles.gameBoard}>
        <h1 className={styles.title}>🤖 Simon 🤖</h1>
        <section className={styles.colourContainer}>
          {colours.map((colour) => (
            <ColourBlock
              key={colour}
              id={colour as 'red' | 'blue' | 'green' | 'yellow'}
              refs={refs}
            />
          ))}
          <div id={styles.shadowCircleShade}></div>
          <div id={styles.vLine}></div>
          <div id={styles.hLine}></div>
          <div id={styles.centralCircle}></div>
          <button
            id={styles.playBtn}
            className={`${
              (btnText === 'Game Over' || btnText === 'Listen') &&
              styles.red
            }`}
            ref={centreBtn}
            onClick={start}
          >
            {btnText}
          </button>
        </section>
        <div className={styles.runInfo}>
          <span>Run length:</span>
          <span className={styles.runCount}>
            {sequenceLength === 0 ? 0 : sequenceLength - 1}
          </span>
        </div>
      </article>
    </div>
  );
}
