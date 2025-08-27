"use client";
import { useState } from "react";
import styles from "./Foq.module.scss";

export const Foq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Сколько стоит татуировка?",
      answer:
        "Точную стоимость назовёт мастер после консультации. Цена зависит от размера, стиля и сложности эскиза. Минимальный чек — 3 000₽. Для предварительной оценки воспользуйтесь нашим ботом.",
    },
    {
      question: "Сколько уже сделано работ/тату?",
      answer:
        "Много. В среднем каждый мастер делает 15 работ в месяц, в совокупности студия делает 100+ татуировок в месяц.",
    },
    {
      question: "Какие стили бьют ваши мастера?",
      answer:
        "Все. Наши мастера работают во всех популярных стилях: от реализма и графики до орнаментала и олдскула. Подберем исполнителя под вашу идею. Смотрите примеры в нашем портфолио.",
    },
    {
      question: "Какие краски и оборудования вы используете?",
      answer:
        "Лучшие. Работаем только профессиональным оборудованием (машинки Ambition Soldier, Spektra Flux) и стерильными иглами. Используем сертифицированные краски премиум-класса (World Famous, Allegory). Ваша безопасность — наш приоритет.",
    },
    {
      question: "Как подготовиться к татуировке?",
      answer:
        "Ты уже готов. На самом деле, все просто — увлажни место тату, хорошо поспи, поешь и отдохни после сеанса.",
    },
    {
      question: "Как ухаживать за татуировкой?",
      answer:
        "Как за любимой девушкой. И даже лучше — есть два способа заживления татуировки: открытый и закрытый. В нашей статье прочитай подробнее в зависимости от того способа, который вы выбрали с мастером.",
    },
  ];

  return (
    <section className="container-ellipse">
      <h2>Вопросы и ответы</h2>
      <div className={styles.accordion}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.accordion__item}>
            <button
              className={`${styles.accordion__header} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              <span>{item.question}</span>
              <span className={styles.accordion__icon}></span>
            </button>
            <div
              className={`${styles.accordion__content} ${
                activeIndex === index ? styles.open : ""
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
