import styles from "./styles.module.scss";

const PracticeCard = () => {
  return (
    <div className={styles.practice__image}>
      <div
        className={styles.image__container}
        style={{
          backgroundImage: `url(/obuchenie/practice/24.webp)`,
        }}
      >
        <div className={styles.image__content}>
          <p>1. Безопасность и отсутствие рисков для живых людей</p>
          <p>2. Отработка мышечной памяти и техники без стресса</p>
          <p>3. Тестирование материалов и эскизов</p>
          <p>4. Формирование портфолио</p>
          <p>5. Психологическая уверенность</p>
        </div>
      </div>
    </div>
  );
};

const PracticeCardSecond = () => {
  return (
    <div className={styles.practice__image}>
      <div
        className={styles.image__container}
        style={{
          backgroundImage: `url(/obuchenie/practice/25.webp)`,
        }}
      >
        <div className={styles.image__content}>
          <p>
            Работая на искусственной коже, можно совершать сколько угодно
            ошибок. Все эти ошибки преподаватель сможет подметить и указать на
            их исправление. После хорошей работы с искусственной кожей вы
            сможете спокойно выходить на моделей.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Practice() {
  return (
    <section className="container">
      <h2>Переходим к практике</h2>
      <h3 className={styles.practice__subtitle}>сначала искусственная кожа</h3>
      <div className={styles.practice__container}>
        <PracticeCard />
        <PracticeCardSecond />
      </div>
    </section>
  );
}
