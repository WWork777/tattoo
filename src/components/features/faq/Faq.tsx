"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Foq.module.scss";

export const Foq = () => {
  const faqData = [
    {
      question: "Сколько стоит татуировка?",
      answer:
        "Точную стоимость назовёт мастер после консультации. Цена зависит от размера, стиля и сложности эскиза. Минимальный чек — 3000₽. Для предварительной оценки воспользуйтесь нашим ботом.",
    },
    {
      question: "Сколько уже сделано работ/тату?",
      answer:
        "Много. В среднем каждый мастер делает 15 работ в месяц, в совокупности студия делает 100+ татуировок в месяц.",
    },
    {
      question: "Обучаете ли вы тату и пирсингу?",
      answer:
        "Да, конечно! Мы проводим профессиональное обучение как татуировке, так и пирсингу — от базовых навыков до продвинутых техник. Наши курсы помогут вам уверенно войти в профессию и освоить искусство создания уникальных образов!",
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
    <section className="container">
      <h2>Вопросы и ответы</h2>
      <div className={styles.accordion}>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            elevation={0} // Убираем тень
            className={styles.accordion__item}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.accordion__icon} />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
              className={styles.accordion__header}
            >
              <Typography component="span" className={styles.accordion__title}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion__content}>
              <Typography component="p" className={styles.accordion__text}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};
