"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.scss";

export default function ProgrammPirsing() {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Программа</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        loop={false}
        className={styles.swiper}
        breakpoints={{
          320: { slidesPerView: 1.2 }, // телефоны
          500: { slidesPerView: 1.3 }, // телефоны
          700: { slidesPerView: 1.5 }, // планшеты
          800: { slidesPerView: 1.3 }, // планшеты
          919: { slidesPerView: 1.6 }, // планшеты
          1050: { slidesPerView: 1.1 }, // десктоп
          1180: { slidesPerView: 1.2 }, // десктоп
          1280: { slidesPerView: 1.3 }, // десктоп
          1380: { slidesPerView: 1.4 }, // десктоп
          1460: { slidesPerView: 1.5 }, // десктоп
          1550: { slidesPerView: 1.6 }, // десктоп
          1640: { slidesPerView: 1.7 }, // десктоп
        }}
      >
        <SwiperSlide className={styles.slide}>
          <img src="/obucheniePirsing/Programm/programm1.webp" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obucheniePirsing/Programm/programm2.webp" alt="Slide 2" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
