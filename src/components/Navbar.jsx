import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContent}>
        <h1 className={styles.logo}>QuizCraft</h1>
      </div>
    </header>
  );
}
