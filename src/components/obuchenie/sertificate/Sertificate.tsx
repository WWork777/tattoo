"use client";
import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Sertificate() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );

  // Массив с данными для слайдов
  const reviews = [
    {
      id: 1,
      image: "/images/whous.webp",
      author: "Анна Петрова",
      shortText:
        "Отличный сервис! Массаж просто невероятный, осталась очень довольна...",
      fullText:
        "Отличный сервис! Массаж просто невероятный, осталась очень довольна. Процедура длилась около часа, массажист профессиональный, внимательный к деталям. Использовали качественные масла, атмосфера расслабляющая. После сеанса почувствовала значительное облегчение и расслабление. Обязательно вернусь снова и порекомендую друзьям!",
    },
    {
      id: 2,
      image: "/images/review2.jpg",
      author: "Михаил Сидоров",
      shortText:
        "Процедура была на высшем уровне. Очень рекомендую этот салон...",
      fullText:
        "Процедура была на высшем уровне. Очень рекомендую этот салон. Пришел с напряжением в шее и плечах, ушел как заново родился. Массажист Анна проявила себя как настоящий профессионал. Уютная атмосфера, приятные ароматы, качественные процедуры. Буду регулярно посещать этот салон!",
    },
    {
      id: 3,
      image: "/images/review3.jpg",
      author: "Елена Козлова",
      shortText:
        "Лучший массаж в городе! Спасибо за профессиональный подход...",
      fullText:
        "Лучший массаж в городе! Спасибо за профессиональный подход. Давно мечтала о таком расслаблении. Массажист Сергей знает свое дело, чувствуется большой опыт. Использовали натуральные масла, процедура прошла в комфортной обстановке. Результатом осталась очень довольна. Обязательно запишу мужа!",
    },
    {
      id: 4,
      image: "/images/review4.jpg",
      author: "Дмитрий Волков",
      shortText:
        "Приятная атмосфера и профессиональный подход. Вернусь обязательно...",
      fullText:
        "Приятная атмосфера и профессиональный подход. Вернусь обязательно. Впервые был в спа-салоне, немного волновался, но персонал сразу расположил к себе. Массажист Ирина объяснила все процедуры, помогла расслабиться. Чистота, порядок, уют - все на высшем уровне. Спасибо за отличный отдых!",
    },
    {
      id: 5,
      image: "/images/review5.jpg",
      author: "Ольга Морозова",
      shortText:
        "Салон превзошел все ожидания. Уютная атмосфера и отличные специалисты...",
      fullText:
        "Салон превзошел все ожидания. Уютная атмосфера и отличные специалисты. Пришла с подругой на двойной массаж, остались в восторге. Все процедуры проводились профессионально, с учетом наших пожеланий. Использовали только качественные средства. После процедуры чувствовали себя просто замечательно. Рекомендую всем!",
    },
    {
      id: 6,
      image: "/images/review6.jpg",
      author: "Александр Новиков",
      shortText:
        "Отличное место для релакса. Профессиональный подход и качественные услуги...",
      fullText:
        "Отличное место для релакса. Профессиональный подход и качественные услуги. Был несколько раз, всегда остаюсь доволен. Массажисты знают свое дело, внимательны к клиентам. Уютная атмосфера, приятные ароматы, качественные масла. После каждой процедуры чувствую значительное облегчение. Спасибо за отличный сервис!",
    },
  ];

  const toggleCard = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="container">
      <div className={styles.header}>
        <h2>Отзывы клиентов</h2>
      </div>

      <div className={styles.sliderContainer}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          slidesPerView={2}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation]}
          className={styles.mySwiper}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.slide}>
              <div className={styles.reviewCard}>
                {/* Контент с полупрозрачным градиентом поверх изображения */}
                <div className={styles.imageContainer}>
                  <img
                    src={review.image}
                    alt={review.author}
                    className={styles.reviewImage}
                  />

                  {/* Градиентный оверлей для текста */}
                  <div className={styles.contentOverlay}>
                    <div className={styles.reviewText}>
                      <p className={styles.shortText}>
                        {expandedCards[review.id]
                          ? review.fullText
                          : review.shortText}
                      </p>
                    </div>

                    {/* Шторка для раскрытия отзыва */}
                    <div
                      className={`${styles.dragHandle} ${
                        expandedCards[review.id] ? styles.expanded : ""
                      }`}
                      onClick={() => toggleCard(review.id)}
                    >
                      <div className={styles.dragIndicator}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={styles.arrowIcon}
                        >
                          <path
                            d="M7 10L12 15L17 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className={styles.dragText}>
                        {expandedCards[review.id]
                          ? "Свернуть отзыв"
                          : "Полный отзыв"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navigationButtons}>
          <button className={`${styles.swiperButtonPrev} ${styles.navButton}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className={`${styles.swiperButtonNext} ${styles.navButton}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
