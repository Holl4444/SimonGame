import { useMemo, useRef } from 'react';
import { useGameContext } from './utils/context/contextHook';
import { useStart, useCountDown } from './utils/hooks';
import styles from './App.module.css';
import ColourBlock from './ColourBlock';

export default function App() {
  const { btnText, sequenceLength } = useGameContext();

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
        <div className={styles.runInfo}>
          <span className={styles.runCount}>
            {sequenceLength === 0 ? 0 : sequenceLength - 1}
          </span>
        </div>
        <div className={styles.gameDisplay}>
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
              className={`${btnText !== 'Start' && styles.disable} ${
                (btnText === 'Game Over' || btnText === 'Listen') &&
                styles.red
              }`}
              ref={centreBtn}
              onClick={start}
            >
              {btnText}
            </button>
          </section>
        </div>
        <h1 className={`${styles.title} ${btnText !== 'Start' && styles.hide}`}> Put your memory to the test </h1>
      </article>
    </div>
  );
}
