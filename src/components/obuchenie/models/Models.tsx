'use client';
import './sales-slider.scss';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

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
        const swiper = swiperRef.current;
        if (swiper) {
          const totalSlides = slides.length;
          const nextIndex = (activeSlideIndex + 1) % totalSlides;
          swiper.slideTo(nextIndex);
        }
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
      title: 'Станислав',
      date: '02.2024',
      text: 'Открыл свою мастерскую в Кемерово, имеет 15+ сеансов в месяц',
    },
    {
      title: 'Полина',
      date: '07.2024',
      text: 'Работает в студии Старк-тату в Кемерово, специализируется на минимализме',
    },
    {
      title: 'Евгения',
      date: '03.2025',
      text: 'Работает в тату студии в Грузии в стиле реалистичная графика',
      tgLink: 'https://t.me/lisi_tattoo',
    },
    {
      title: 'Алина',
      date: '06.2025',
      text: 'Работает стажером в Soprano тату, имеет 3+ клиентов в неделю',
      tgLink: 'https://t.me/Akimova_Tattoo',
    },
    {
      title: 'Виолетта',
      date: '07.2025',
      text: 'Работает тату мастером в Бердске',
      tgLink: 'https://t.me/violaclubtattoo',
    },
    {
      title: 'Полина',
      date: '07.2024',
      text: 'Работает тату мастером во Владивостоке',
      tgLink: 'https://t.me/kak_stat_kruche',
    },
    {
      title: 'Ксения',
      date: '08.2024',
      text: 'Учмится в 10 классе, при этом имеет стабильный доход с татуировок',
      tgLink: 'https://t.me/firebreathingtattoo',
    },
    {
      title: 'София',
      date: '08.2024',
      text: 'Учиться в колледже 2 курс, в свободное время делает татуировки одногруппникам',
    },
  ];

  return (
    <section className='sales' id='learnWorks'>
      <div className='title__container'>
        <h2 className='title'>Переходим к моделям</h2>
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={0}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        initialSlide={0}
        centeredSlides={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        loop={false}
        breakpoints={{
          200: { slidesPerView: 1 },
          600: {
            slidesPerView: 1,
          },
          900: { slidesPerView: 1 },
          1300: { slidesPerView: 5 },
          1920: { slidesPerView: 5 },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className='mySwiper'
        onSlideChange={handleSlideChange}
        // autoplay={{
        //   delay: autoplayDelay,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: false,
        // }}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={pauseAutoplay}
        onTouchEnd={resumeAutoplay}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              swiperRef.current?.slideTo(index);
            }}
            className={activeSlideIndex === index ? 'active-slide' : ''}
          >
            <div
              className='slide-fon'
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
                <div className='slide-progress-container'>
                  <div
                    className='slide-progress-bar'
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className='slide-content'>
                {/* Заголовок и дата */}
                <div className='slide-header'>
                  <strong>{slide.title}</strong>
                  <span className='slide-date'>{slide.date}</span>
                </div>

                {/* Основной текст */}
                <div className='slide-text'>{slide.text}</div>

                {/* Кнопка Telegram */}
                {/* {slide.tgLink && (
                  <div className="slide-footer">
                    <Link href={slide.tgLink} target="_blank">
                      <img src="/icons/socials/tg.svg" alt="Telegram" />
                      Написать в Telegram
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link href={'/obuchenie-tatu#trial-form'} className='btn-trial'>
        Запишись на пробное занятие - Получи план подготовки с готовыми рекомендациями.
      </Link>
    </section>
  );
}
