import styles from "./Navbar.module.css";

export default function Navbar({ dark, setDark }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContent}>
        <h1 className={styles.logo}>QuizCraft</h1>
        <label className={styles.toggleWrapper}>
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
            className={styles.toggleCheckbox}
          />
          <div className={styles.toggleSlider}></div>
        </label>
      </div>
    </header>
  );
}
