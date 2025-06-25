import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import confetti from "canvas-confetti";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizResult"));
    if (data) {
      setResult(data);
      const percentage = Math.round((data.correct / data.total) * 100);
      if (percentage >= 50) {
        setShowCongrats(true);
        launchConfetti();
      }
    }
  }, []);

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.4 },
      });
    }, 800);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "02:52";
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!result) {
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>
        Loading results...
      </p>
    );
  }

  const percentage = Math.round((result.correct / result.total) * 100);
  let ringColor = "#ef4444";
  let message = "Keep practicing!";
  if (percentage >= 80) {
    ringColor = "#4ade80";
    message = "Amazing job!";
  } else if (percentage >= 60) {
    ringColor = "#eab308";
    message = "Well done!";
  } else if (percentage >= 40) {
    ringColor = "#fb923c";
    message = "Good effort!";
  }

  return (
    <main className={styles.main}>
      {/* 🎉 Congrats Popup */}
      {showCongrats && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>🎉 Congratulations!</h2>
            <p>You scored {percentage}%. Great work!</p>
            <button
              className={styles.closeButton}
              onClick={() => setShowCongrats(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      <div className={styles.centerText}>
        <h2 className={styles.title}>🎉 Quiz Completed!</h2>
        <p className={styles.subtitle}>{message}</p>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressCircle}>
          <div
            className={styles.ring}
            style={{
              background: `conic-gradient(${ringColor} ${percentage}%, transparent 0)`,
            }}
          ></div>
          <div className={styles.percentCenter}>
            <span className={styles.percent}>{percentage}%</span>
            <span className={styles.scoreSmall}>
              {result.correct}/{result.total} Correct
            </span>
          </div>
        </div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.card}>
          ✅ <div className={styles.cardValue}>{result.correct}</div>
          <div className={styles.cardLabel}>Correct</div>
        </div>
        <div className={styles.card}>
          ❌ <div className={styles.cardValue}>{result.incorrect}</div>
          <div className={styles.cardLabel}>Incorrect</div>
        </div>
        <div className={styles.card}>
          ⏱ <div className={styles.cardValue}>{formatTime(result.time)}</div>
          <div className={styles.cardLabel}>Time Taken</div>
        </div>
      </section>

      <div className={styles.buttonGroup}>
        <button
          onClick={() => navigate(`/quiz/${result.topic}`)}
          className={styles.retakeBtn}
        >
          🔁 Retake Quiz
        </button>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          🏠 Back to Home
        </button>
      </div>
    </main>
  );
}
