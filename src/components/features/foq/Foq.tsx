"use client";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"; // Импортируем компоненты
import "react-accessible-accordion/dist/fancy-example.css"; // Импортируем базовые стили (опционально)
import styles from "./Foq.module.scss";

// Не забудьте импортировать стили, если хотите избежать конфликтов
// import './your-accordion-styles.css'; // Ваш собственный CSS модуль

export const Foq = () => {
  // Данные FAQ остаются прежними
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
      {/* Используем Accordion из react-accessible-accordion */}
      {/* allowZeroExpanded позволяет закрыть все панели одновременно */}
      {/* allowMultipleExpanded позволяет открыть несколько панелей одновременно (по умолчанию false) */}
      <Accordion
        allowZeroExpanded
        className={styles.accordion} // Применяем ваш внешний класс
        preExpanded={[0]} // Опционально: раскрыть первый элемент по умолчанию
      >
        {/* Используем AccordionItem для каждого элемента FAQ */}
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            uuid={index}
            className={styles.accordion__item}
          >
            <AccordionItemHeading>
              <AccordionItemButton
                className={`${styles.accordion__header}`} // Применяем ваш класс для кнопки
                // Классы состояния (например, для активной кнопки) добавляются автоматически библиотекой
                // Вы можете стилизовать их в вашем CSS модуле (например, .accordion__header[aria-expanded="true"])
              >
                <span>{item.question}</span>
                {/* Иконка теперь может быть стилизована через CSS, используя селекторы библиотеки */}
                {/* Например, в styles.accordion__header можно добавить стили для ::after */}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel
              className={`${styles.accordion__content}`} // Применяем ваш класс для панели
              // Классы состояния (например, для открытой панели) добавляются автоматически
              // Вы можете стилизовать их в вашем CSS модуле (например, .accordion__content[hidden])
            >
              <p>{item.answer}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
