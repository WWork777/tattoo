"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.scss";

export default function Programm() {
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
          320: { slidesPerView: 1 }, // телефоны
          768: { slidesPerView: 1.2 }, // планшеты
          1024: { slidesPerView: 1.2 }, // десктоп
        }}
      >
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/17.webp" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/18.webp" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/19.webp" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/20.webp" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/21.webp" alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/program/22.webp" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
