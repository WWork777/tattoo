"use client";
import { useState } from "react";
import styles from "./prepod2.module.scss";
import SliderArea from "./slider-area.svg";
import SliderArrow from "./slider-arrow.svg";

export default function Prepod() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/obuchenie/prepod2/01.jpg",
    },
    {
      id: 2,
      image: "/obuchenie/prepod2/02.jpg",
    },
    {
      id: 3,
      image: "/obuchenie/prepod2/03.jpg",
    },
    {
      id: 4,
      image: "/obuchenie/prepod2/04.jpg",
    },
    {
      id: 5,
      image: "/obuchenie/prepod2/05.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="container" id="prepod">
      <h2>Cтарший преподаватель</h2>
      <div className={styles.prepod}>
        <div className={styles.prepod__image}>
          <div
            className={styles.image__container}
            style={{
              backgroundImage: `url(/images/masters/tattoo2.webp)`,
            }}
          >
            <div className={styles.image__content}>
              <h3>Иван</h3>
              <ul>
                <li>Опыт 5 лет</li>
                <li>Специализируется во всех стилях в тату, как универсальный солдат</li>
                <li>С тонким педагогическим подходом к обучению</li>
                <li>Звезда Каргата</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.prepod__slider}>
          {/* Стрелки ВНЕ контейнера слайдов, но внутри prepod__slider */}
          <button
            className={styles.slider__arrow__left}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <img src={SliderArea.src} alt="" />
            <img src={SliderArrow.src} alt="" className={styles.arrow} />
          </button>

          <div className={styles.slider__container}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ""
                }`}
              >
                <div
                  className={styles.slide__content}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  {/* Подпись "Портфолио" внутри слайдера */}
                  <div className={styles.portfolio__badge}>
                    <span className={styles.portfolio__text}>Портфолио</span>
                    {/* <div className={styles.portfolio__underline}></div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Стрелки ВНЕ контейнера слайдов, но внутри prepod__slider */}
          <button
            className={styles.slider__arrow__right}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <img src={SliderArea.src} alt="" />
            <img src={SliderArrow.src} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}