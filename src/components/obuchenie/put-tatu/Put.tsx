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
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1.2} // ←←← Показываем 1 слайд + часть второго
        // navigation
        // pagination={{ clickable: true }}
        loop={false}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.slide}>
          <img src="/images/special.webp" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/images/special.webp" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <img src="/images/special.webp" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
