"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.scss";

export default function Put() {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Путь тату мастера</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        loop={false}
        className={styles.swiper}
        breakpoints={{
          320: { slidesPerView: 1 }, // телефоны
          768: { slidesPerView: 1.2 }, // планшеты
          1024: { slidesPerView: 1.5 }, // десктоп
        }}
      >
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/put/29.webp" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/obuchenie/put/Фон.webp" alt="Slide 2" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
