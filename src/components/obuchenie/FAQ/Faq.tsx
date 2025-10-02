"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles.module.scss";

export const Faq = () => {
  const faqData = [
    {
      question: "Что такое SOPRANO SCHOOl?",
      answer:
        "Это школа, основанная на базе тату студии Soprano. Татуировщики практики обучают новых коллег на основе последних тенденций тату индустрии.",
    },
    {
      question: "Как проходят занятия?",
      answer:
        "Занятия проходят очно в просторной студии в центре города. Каждый ученик имеет свое рабочее место.",
    },
    {
      question: "Почему мы?",
      answer:
        "Курс основал Антон Драйцев. За его плечами 10 лет опыта, 3 тату студии, участие в тату фестивалях и желание обучать сильных тату мастеров, которых можно будет взять себе в команду.",
    },
    {
      question: "А можно в рассрочку?",
      answer:
        "Да, конечно! В тату школе есть терминал, по которому можно оформить банковскую рассрочку на удобный вам период.",
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
                <p>{item.question}</p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion__content}>
              <Typography component="p" className={styles.accordion__text}>
                <p>{item.answer}</p>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};
