"use client";
import styles from "./Portfolio.module.scss";
import { useState, useEffect } from "react"; // Добавлен useEffect

export const Portfolio = () => {
  const [activeSlider, setActiveSlider] = useState(0);

  // Данные для трех слайдеров
  const sliders = [
    {
      id: 1,
      title: "Большие тату",
      images: [
        "/images/portfolio/big.jpg",
        "/images/portfolio/big2.jpg",
        "/images/portfolio/big3.jpg",
        "/images/portfolio/big4.jpg",
        "/images/portfolio/big5.jpg",
      ],
    },
    {
      id: 2,
      title: "Мини-тату",
      images: [
        "/images/portfolio/mini.jpg",
        "/images/portfolio/mini2.jpg",
        "/images/portfolio/mini3.jpg",
        "/images/portfolio/mini4.jpg",
        "/images/portfolio/mini5.jpg",
      ],
    },
    {
      id: 3,
      title: "Проекты",
      images: [
        "/images/portfolio/project.jpg",
        "/images/portfolio/project2.png",
        "/images/portfolio/project3.jpg",
        "/images/portfolio/project4.jpg",
        "/images/portfolio/project5.jpg",
        "/images/portfolio/project6.jpg",
        "/images/portfolio/project7.jpg",
      ],
    },
  ];

  return (
    <section className="container" id="portfolio">
      {" "}
      {/* id перенесен сюда */}
      <h2>Портфолио</h2>
      <div className={styles.portfolio}>
        {/* Навигация между слайдерами */}
        <div className={styles.slider_nav}>
          {sliders.map((slider, index) => (
            <button
              key={slider.id}
              className={`${styles.nav_button} ${
                activeSlider === index ? styles.active : ""
              }`}
              onClick={() => setActiveSlider(index)}
            >
              {slider.title}
            </button>
          ))}
        </div>

        {/* Слайдеры */}
        {sliders.map((slider, sliderIndex) => (
          <div
            key={slider.id}
            className={`${styles.slider} ${
              activeSlider === sliderIndex ? styles.active : ""
            }`}
          >
            <SliderComponent images={slider.images} category={slider.title} />
          </div>
        ))}
      </div>
    </section>
  );
};

// Компонент для отдельного слайдера
const SliderComponent = ({
  images,
  category,
}: {
  images: string[];
  category: string;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Определяем количество изображений на странице в зависимости от экрана
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 768) {
        return 1; // Одно изображение на мобильных
      } else if (window.innerWidth <= 1250) {
        return 2; // Два изображения на планшетах
      }
    }
    return 3; // Три изображения на десктопах
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Обновляем количество изображений при изменении размера окна
  useEffect(() => {
    // Исправлено с useState на useEffect
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500); // Длительность анимации
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPage = (pageIndex: number) => {
    if (isAnimating || pageIndex === currentPage) return;
    setIsAnimating(true);
    setCurrentPage(pageIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Получаем изображения для текущей страницы
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, images.length);
  const currentImages = images.slice(startIndex, endIndex);

  return (
    <>
      <div className={styles.slider_container}>
        {" "}
        {/* Убран id отсюда */}
        <div
          className={`${styles.slider_wrapper} ${
            isAnimating ? styles.animating : ""
          }`}
        >
          {currentImages.map((image, index) => (
            <div
              key={`${category}-${startIndex + index}`}
              className={styles.slide}
            >
              <img
                src={image}
                alt={`${category} ${startIndex + index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>
        {/* Навигация слайдера */}
        {totalPages > 1 && (
          <div className={styles.slider_controls}>
            <button
              className={styles.slider_arrow_left}
              onClick={prevSlide}
              disabled={totalPages <= 1 || isAnimating}
            >
              ←
            </button>

            <div className={styles.slider_dots}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={`${category}-dot-${index}`}
                  className={`${styles.dot} ${
                    index === currentPage ? styles.active : ""
                  }`}
                  onClick={() => goToPage(index)}
                  disabled={isAnimating}
                />
              ))}
            </div>

            <button
              className={styles.slider_arrow_right}
              onClick={nextSlide}
              disabled={totalPages <= 1 || isAnimating}
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
};
