import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestionsBySubject } from "../api/quizAPI";
import styles from "./Quiz.module.css";

export default function Quiz() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [remaining, setRemaining] = useState(15);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestionsBySubject(language);
      console.log("Fetched Questions:", data);
      setQuestions(data);
      setIsLoaded(true);
    };
    loadQuestions();
  }, [language]);

  useEffect(() => {
    if (!isLoaded || questions.length === 0) return;

    const timer = setInterval(() => {
      setTotalTime((prev) => prev + 1); // Track total elapsed time
      setRemaining((prev) => {
        if (prev === 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, isLoaded, questions.length]); // Added questions.length to dependencies

  const [toast, setToast] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleEndQuiz = () => {
    // Collect all answered questions so far
    const resultData = {
      correct: score,
      incorrect: index - score,
      total: questions.length,
      topic: language,
      answers: answers,
      time: totalTime,
      isEarlySubmit: true
    };

    // Save used question IDs (only up to current index)
    const usedIds = questions.slice(0, index).map((q) => q.id);
    const existingUsed =
      JSON.parse(localStorage.getItem(`usedQuestions-${language}`)) || [];
    const updatedUsed = [...new Set([...existingUsed, ...usedIds])];
    localStorage.setItem(
      `usedQuestions-${language}`,
      JSON.stringify(updatedUsed)
    );

    localStorage.setItem("quizResult", JSON.stringify(resultData));
    navigate("/result");
  };

  const handleNext = () => {
    const q = questions[index];
    if (!q) return;

    const isCorrect =
      selected !== null && q.options[selected] === q.correct_answer;

    // Show Toast
    setToast(isCorrect ? "Correct!" : "Oops! Incorrect");
    setTimeout(() => setToast(null), 1500);

    if (isCorrect) setScore((prev) => prev + 1);

    const updatedAnswers = [
      ...answers,
      {
        q: q.question,
        user: selected !== null ? q.options[selected] : "Skipped",
        correct: q.correct_answer,
        isCorrect,
      },
    ];

    setTimeout(() => {
      if (index + 1 === questions.length) {
        // Calculate final score for result page
        const finalScore = isCorrect ? score + 1 : score;

        const resultData = {
          correct: finalScore,
          incorrect: questions.length - finalScore,
          total: questions.length,
          topic: language,
          answers: updatedAnswers,
          time: totalTime + 1 // Include final second
        };

        // ✅ Save used question IDs to localStorage
        const usedIds = questions.map((q) => q.id);
        const existingUsed =
          JSON.parse(localStorage.getItem(`usedQuestions-${language}`)) || [];
        const updatedUsed = [...new Set([...existingUsed, ...usedIds])];
        localStorage.setItem(
          `usedQuestions-${language}`,
          JSON.stringify(updatedUsed)
        );

        localStorage.setItem("quizResult", JSON.stringify(resultData));
        navigate("/result");
      } else {
        setAnimating(true);
        setTimeout(() => {
          setIndex(index + 1);
          setSelected(null);
          setRemaining(15);
          setAnswers(updatedAnswers);
          setAnimating(false);
        }, 300);
      }
    }, 1000); // Small delay to enjoy the toast
  };

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Finding the perfect questions for you...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "3rem", color: "red" }}>
        ❌ No questions available for this subject.
      </p>
    );
  }

  const q = questions[index];
  const isTimerCritical = remaining <= 5;

  return (
    <main className={styles.main}>
      {toast && (
        <div className={`${styles.toast} ${toast.includes("Correct") ? styles.correct : styles.wrong}`}>
          {toast}
        </div>
      )}

      <div className={styles.topBar}>
        <div className={styles.progressText}>
          Question {index + 1} of {questions.length}
        </div>
        <div
          className={`${styles.timerWrapper} ${isTimerCritical ? styles.critical : ""
            }`}
        >
          <div className={styles.bubbleContainer}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={styles.bubble}
                style={{
                  left: `${Math.random() * 100}%`,
                  "--duration": `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div
            className={`${styles.timerText} ${isTimerCritical ? styles.critical : ""
              }`}
          >
            {remaining}s
          </div>
        </div>
      </div>

      <div className={`${styles.questionWrapper} ${animating ? styles.toastFadeOut : ""}`}>
        <div className={styles.question}>
          Q{index + 1}: {q.question}
        </div>

        <form className={styles.form}>
          {q.options.map((opt, i) => (
            <label key={i} className={styles.option}>
              <input
                type="radio"
                name="option"
                value={i}
                className={styles.radio}
                onChange={() => setSelected(i)}
                checked={selected === i}
              />
              <span>{opt}</span>
            </label>
          ))}
        </form>

        <div className={styles.buttonGroup}>
          <button
            onClick={handleEndQuiz}
            className={styles.endBtn}
          >
            End Quiz Early
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={selected === null || animating}
            className={styles.nextBtn}
          >
            {index + 1 === questions.length ? "Finish Test" : "Next Question"}
          </button>
        </div>
      </div>
    </main>
  );
}
