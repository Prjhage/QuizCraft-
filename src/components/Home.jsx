// src/components/Home.jsx
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import * as LucideIcons from "lucide-react";

const categories = [
  { name: "JavaScript", icon: "FileCode", path: "javascript" },
  { name: "Python", icon: "Code", path: "python" },
  { name: "Java", icon: "Coffee", path: "java" },
  { name: "SQL", icon: "Database", path: "sql" },
  { name: "C++", icon: "Cpu", path: "cpp" },
  { name: "PHP", icon: "Code2", path: "php" },
  { name: "Ruby", icon: "Gem", path: "ruby" },
  { name: "DSA", icon: "Layers", path: "dsa" },
];

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ready to challenge your coding skills?</h2>
        <p className={styles.subtitle}>
          Test your knowledge in{" "}
          <span className={styles.highlight}>JavaScript, Python, SQL</span> and
          more — choose a topic below and start the quiz!
        </p>
      </div>

      <section className={styles.grid}>
        {categories.map((cat) => {
          const Icon = LucideIcons[cat.icon];
          return (
            <Link
              to={`/quiz/${cat.path}`}
              key={cat.path}
              className={styles.card}
            >
              {Icon && <Icon className={styles.icon} />}
              <span className={styles.name}>{cat.name}</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
