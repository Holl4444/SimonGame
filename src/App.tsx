import { useMemo, useRef } from 'react';
import { useGameContext } from './utils/context/contextHook';
import { useStart, useCountDown } from './utils/hooks';
import styles from './App.module.css';
import ColourBlock from './ColourBlock';

export default function App() {
  const {
    order,
    sequence,
    btnText,
  } = useGameContext();

  console.log(order);
  console.log(sequence);

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
  
  const start = useStart();

  useCountDown(refs);




  return (
    <div className={`${styles.content} ${styles.leagueGothicNormal}`}>
      <article className={styles.gameBoard}>
        <h1 className={styles.title}>🤖 Simon 🤖</h1>
        <section className={styles.colourContainer}>
          <ColourBlock id="red" refs={refs} />

          <ColourBlock id="blue" refs={refs} />

          <ColourBlock id="green" refs={refs} />

          <ColourBlock id="yellow" refs={refs} />

          <div id={styles.shadowCircleShade}></div>
          <div id={styles.vLine}></div>
          <div id={styles.hLine}></div>
          <div id={styles.centralCircle}></div>

          <button id={styles.playBtn} ref={centreBtn} onClick={start}>
            {btnText}
          </button>
        </section>
      </article>
    </div>
  );
}
