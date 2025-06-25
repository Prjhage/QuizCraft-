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

  const handleNext = () => {
    const q = questions[index];
    if (!q) return;

    const isCorrect =
      selected !== null && q.options[selected] === q.correct_answer;
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

    if (index + 1 === questions.length) {
      // Calculate final score for result page
      const finalScore = isCorrect ? score + 1 : score;

      const resultData = {
        correct: finalScore,
        incorrect: questions.length - finalScore,
        total: questions.length,
        // You might want to pass total time spent or average time per question if you're tracking that.
        // For now, I'll remove `time` from here as it was `questions.length * 15 - remaining` which might not be accurate for overall time.
        // If you need total time, you'd track a separate `totalTimeSpent` state.
        topic: language,
        answers: updatedAnswers,
      };

      localStorage.setItem("quizResult", JSON.stringify(resultData));
      navigate("/result");
    } else {
      setIndex(index + 1);
      setSelected(null);
      setRemaining(15);
      setAnswers(updatedAnswers);
    }
  };

  if (!isLoaded) {
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>
        Loading questions...
      </p>
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

  // Determine if the timer should be in a critical state for CSS classes
  const isTimerCritical = remaining <= 5; // Adjust threshold as needed

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <div className={styles.progressText}>
          Question {index + 1} of {questions.length}
        </div>
        <div
          className={`${styles.timerWrapper} ${
            isTimerCritical ? styles.critical : ""
          }`}
        >
          {/* Removed the timerCircle div as its functionality is now handled by the .timerWrapper's background and animation */}
          <div
            className={`${styles.timerText} ${
              isTimerCritical ? styles.critical : ""
            }`}
          >
            {remaining}s
          </div>
        </div>
      </div>

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

      <button
        type="button"
        onClick={handleNext}
        disabled={selected === null}
        className={styles.nextBtn}
      >
        Next
      </button>
    </main>
  );
}
