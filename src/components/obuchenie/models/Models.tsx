"use client";
import "./sales-slider.scss";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Models() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const progressStartTime = useRef<number>(0);

  const autoplayDelay = 5000;

  // Управление прогресс-баром
  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (isPaused) {
      return;
    }

    // Запуск прогресс-бара
    progressStartTime.current = Date.now() - (progress * autoplayDelay) / 100;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - progressStartTime.current;
      const percent = Math.min((elapsed / autoplayDelay) * 100, 100);
      setProgress(percent);

      // Если прогресс достиг 100%, останавливаем интервал и переключаем слайд
      if (percent >= 100) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        // Принудительно переключаем слайд
        swiperRef.current?.slideNext();
      }
    }, 50);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [activeSlideIndex, isPaused, autoplayDelay, progress]);

  // Обработчики событий
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlideIndex(swiper.realIndex);
    setProgress(0); // Сброс прогресса при смене слайда
  };

  const pauseAutoplay = () => {
    setIsPaused(true);
    swiperRef.current?.autoplay.stop();
  };

  const resumeAutoplay = () => {
    setIsPaused(false);
    swiperRef.current?.autoplay.start();
  };

  const slides = [
    {
      title: "2в1: лето пришло, а ты ещё не похудел?",
      content:
        "Попробуйте уникальный комплекс услуг: ДУШ ШАРКО + МАССАЖ СТАРВАК!",
    },
    {
      title: "10% скидка новому клиенту на первое посещение",
      content:
        "Мы всегда рады новым клиентам, и пытаемся окутать заботой и комфортом каждого нового человека. Поэтому для новых клиентов мы делаем скидку 10% на первое посещение.",
    },
    {
      title: "15% скидка на все услуги в ваш день рождения",
      content:
        "День рождения — прекрасный повод сделать себе подарок и записаться на уходовую процедуру. Скидка действует 3 дня до и 3 дня после вашего дня рождения.",
    },
  ];

  return (
    <section className="sales">
      <div className="title__container">
        <h2 className="title">Переходим к моделям</h2>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={0}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        initialSlide={0}
        centeredSlides={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        loop={false}
        breakpoints={{
          200: { slidesPerView: 1 },
          600: { slidesPerView: 1 },
          900: { slidesPerView: 1 },
          1300: { slidesPerView: 5 },
          1920: { slidesPerView: 5 },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={pauseAutoplay}
        onTouchEnd={resumeAutoplay}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              swiperRef.current?.slideToLoop(index);
            }}
            className={activeSlideIndex === index ? "active-slide" : ""}
          >
            <div
              className="slide-fon"
              onMouseDown={pauseAutoplay}
              onMouseUp={resumeAutoplay}
              onMouseLeave={() => {
                if (isPaused) {
                  resumeAutoplay();
                }
              }}
              onTouchStart={pauseAutoplay}
              onTouchEnd={resumeAutoplay}
            >
              {activeSlideIndex === index && (
                <div className="slide-progress-container">
                  <div
                    className="slide-progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className="slide-content">
                <strong>{slide.title}</strong>
                <p>{slide.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
