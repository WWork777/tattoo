"use client";
import { useState } from "react";
import styles from "./Hero.module.scss";
import Arrow from "./arrow.svg";
import ArrowSecond from "./arrow-second.svg";
import SliderArea from "./slider-area.svg";
import SliderArrow from "./slider-arrow.svg";
// import ModalForm from "../modal/ModalForm";
import Link from "next/link";

const HeroObuchenie = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Сделай шаг в новую профессию без лишних трат!",
      subtitle:
        "Профессии можно обучиться самостоятельно, но это займет большое количество времени, нервов и денег. Поэтому мы создали курсы, обучаясь на которых вы сэкономите все эти три ресурса!",
      image: "/obuchenie/hero/1.webp",
    },
    {
      id: 2,
      title: "Карта лояльности",
      subtitle:
        "За каждые 10 000 руб., потраченные в студии, клиент получает скидку 1000 бонусов на следующую услугу.",
      image: "/images/hero/hero2.webp",
    },
    {
      id: 3,
      title: "Большие проекты под ключ",
      subtitle:
        "Хочешь сделать спину/полурукав/рукав/ногав — мы готовы сделать большой проект под ключ с четким дедлайном и железной ценой и подкрепим все договором.",
      image: "/images/hero/hero3.webp",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container-ellipse-hero">
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.slider}>
            {/* <button
              className={styles.slider__arrow__left}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <img src={SliderArea.src} alt="" />
              <img src={SliderArrow.src} alt="" className={styles.arrow} />
            </button> */}

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
                    <div className={styles.slide__text}>
                      <h1
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      ></h1>
                      <div className={styles.slide__line}></div>
                      <p className={styles.slide__subtitle}>{slide.subtitle}</p>
                      <button>
                        <Link href="https://t.me/Soprano2024" target="_blank">
                          <p>Написать нам</p>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Стрелка вправо */}
            {/* <button
              className={styles.slider__arrow__right}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <img src={SliderArea.src} alt="" />
              <img src={SliderArrow.src} alt="" />
            </button> */}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.right__top}>
            <p>
              Запишись <br></br> на консультацию по обучению
            </p>
            <p>
              и получи <b>бесплатную стратегию</b> с чего начать тату мастеру.
            </p>
            <button className={styles.right__top__button}>
              <Link href="https://t.me/Soprano2024" target="_blank">
                <p>Написать нам</p>
              </Link>
            </button>
          </div>
          <div className={styles.right__bottom}>
            <Link
              href="/obuchenie-tatu/#prepod"
              className={styles.right__bottom__left}
            >
              <img src={Arrow.src} alt="" className={styles.arrow__left} />
              <img
                src={ArrowSecond.src}
                alt=""
                className={styles.arrow__second}
              />
              <p>Работы преподавателей</p>
            </Link>
            <Link
              href="/obuchenie-tatu/#learnWorks"
              className={styles.right__bottom__right}
            >
              <img src={Arrow.src} alt="" className={styles.arrow__right} />
              <img
                src={ArrowSecond.src}
                alt=""
                className={styles.arrow__second}
              />
              <p>
                Работы <br></br> учеников
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroObuchenie;
