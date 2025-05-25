import { useMemo, useRef } from 'react';
import { useGameContext } from './utils/context/contextHook';
import { useStart, useCountDown } from './utils/hooks';
import styles from './App.module.css';
import ColourBlock from './ColourBlock';

export default function App() {
  const { btnText } = useGameContext();

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
      </article>
    </div>
  );
}
