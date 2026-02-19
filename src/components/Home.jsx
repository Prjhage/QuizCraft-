// src/components/Home.jsx
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import * as LucideIcons from "lucide-react";

const categories = [
  { name: "JavaScript", icon: "FileCode", path: "javascript", color: "var(--color-javascript)" },
  { name: "Python", icon: "Code", path: "python", color: "var(--color-python)" },
  { name: "Java", icon: "Coffee", path: "java", color: "var(--color-java)" },
  { name: "SQL", icon: "Database", path: "sql", color: "var(--color-sql)" },
  { name: "C++", icon: "Cpu", path: "cpp", color: "var(--color-cpp)" },
  { name: "PHP", icon: "Code2", path: "php", color: "var(--color-php)" },
  { name: "Ruby", icon: "Gem", path: "ruby", color: "var(--color-ruby)" },
  { name: "DSA", icon: "Layers", path: "dsa", color: "var(--color-dsa)" },
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
        {categories.map((cat, index) => {
          const Icon = LucideIcons[cat.icon];
          return (
            <Link
              to={`/quiz/${cat.path}`}
              key={cat.path}
              className={styles.card}
              style={{
                "--index": index,
                borderColor: cat.color ? `calc(${cat.color} + '33')` : '' // Adding subtle transparent border
              }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: `${cat.color}22` }}>
                {Icon && <Icon className={styles.icon} style={{ color: cat.color }} />}
              </div>
              <span className={styles.name}>{cat.name}</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
