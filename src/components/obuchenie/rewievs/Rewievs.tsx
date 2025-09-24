"use client";
import styles from "./styles.module.scss";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Rewievs() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );

  const reviews = [
    {
      id: 1,
      image: "/obuchenie/rewievs/rewievs.webp",
    },
    {
      id: 2,
      image: "/obuchenie/rewievs/rewievs2.webp",
    },
    {
      id: 3,
      image: "/obuchenie/rewievs/rewievs3.webp",
    },
    {
      id: 4,
      image: "/obuchenie/rewievs/rewievs4.webp",
    },
    {
      id: 5,
      image: "/obuchenie/rewievs/rewievs5.webp",
    },
    {
      id: 6,
      image: "/obuchenie/rewievs/rewievs6.webp",
    },
    {
      id: 7,
      image: "/obuchenie/rewievs/rewievs7.webp",
    },
    {
      id: 8,
      image: "/obuchenie/rewievs/rewievs8.webp",
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
      <h2>Отзывы</h2>

      <div className={styles.sliderContainer}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          slidesPerView={4}
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
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation]}
          className={styles.mySwiper}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.slide}>
              <div
                className={styles.reviewCard}
                style={{
                  backgroundImage: `url(${review.image})`,
                }}
              ></div>
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
