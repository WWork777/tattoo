"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import SliderArea from "./slider-area.svg";
import SliderArrow from "./slider-arrow.svg";

export default function Prepod() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/hero/hero.webp",
    },
    {
      id: 2,
      image: "/images/hero/hero2.webp",
    },
    {
      id: 3,
      image: "/images/hero/hero3.webp",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="container">
      <h2>Создатель курса и старший преподаватель</h2>
      <div className={styles.prepod}>
        <div className={styles.prepod__image}>
          <div
            className={styles.image__container}
            style={{
              backgroundImage: `url(/images/masters/tattoo.webp)`,
            }}
          >
            <div className={styles.image__content}>
              <h3>Антон Драйцев</h3>
              <ul>
                <li>Основатель тату-студии SOPRÁNO</li>
                <li>Более 10 лет в тату-индустрии</li>
                <li>Есть свой почерк и стиль</li>
                <li>Специализация: Крупные проекты (рукава, ногава, спины)</li>
                <li>Выпустил 15+ мастеров тату</li>
                <li>Постоянный участник тату фестивалей</li>
                <li>Участник русского медвежонка</li>
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
