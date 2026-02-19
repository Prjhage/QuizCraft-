import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, Clock, RotateCcw, Home as HomeIcon, Award } from "lucide-react";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizResult"));
    if (data) {
      setResult(data);
      const percentage = Math.round((data.correct / data.total) * 100);
      if (percentage >= 50) {
        launchCelebration();
      }
    }
  }, []);

  const launchCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!result) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Crunching your results...</p>
      </div>
    );
  }

  const percentage = Math.round((result.correct / result.total) * 100);
  const totalAnswered = result.answers.length;
  const avgTime = totalAnswered > 0 ? result.time / totalAnswered : 0;
  let ringColor = "#ef4444";
  let message = "Keep practicing!";
  let IconHero = Award;

  if (percentage >= 80) {
    ringColor = "#00ffab";
    message = "Masterful Performance!";
  } else if (percentage >= 60) {
    ringColor = "#4fd1c5";
    message = "Great Understanding!";
  } else if (percentage >= 40) {
    ringColor = "#f59e0b";
    message = "Good Progress!";
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <IconHero className={styles.heroIcon} style={{ color: ringColor }} />
        <h2 className={styles.title}>Quiz Completed</h2>
        <p className={styles.subtitle}>{message}</p>
      </div>

      <div className={styles.progressCircle}>
        <div className={styles.scoreWrapper}>
          <span className={styles.score}>{percentage}%</span>
          <span className={styles.scoreLabel}>{result.correct} / {result.total} Points</span>
        </div>
        <div className={styles.liquidPulse} style={{ borderColor: ringColor }}></div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.card}>
          <CheckCircle2 className={styles.statIcon} style={{ color: "#00ffab" }} />
          <div className={styles.statValue}>{result.correct}</div>
          <div className={styles.statLabel}>Correct</div>
        </div>
        <div className={styles.card}>
          <XCircle className={styles.statIcon} style={{ color: "#ef4444" }} />
          <div className={styles.statValue}>{result.incorrect}</div>
          <div className={styles.statLabel}>Incorrect</div>
        </div>
        <div className={styles.card}>
          <Clock className={styles.statIcon} style={{ color: "#4fd1c5" }} />
          <div className={styles.statValue}>{formatTime(avgTime)}</div>
          <div className={styles.statLabel}>Avg Speed</div>
        </div>
      </section>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => navigate(`/quiz/${result.topic}`)}
          className={styles.retakeBtn}
        >
          <RotateCcw size={20} /> Retake Test
        </button>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          <HomeIcon size={20} /> Exit to Home
        </button>
      </div>
    </main>
  );
}
