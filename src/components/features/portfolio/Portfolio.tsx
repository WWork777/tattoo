"use client";
import styles from "./Portfolio.module.scss";
import { useState, useEffect } from "react";

export const Portfolio = () => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalSliderIndex, setModalSliderIndex] = useState(0);

  // Данные для трех слайдеров
  const sliders = [
    {
      id: 1,
      title: "Большие тату",
      images: [
        "/images/portfolio/big.webp",
        "/images/portfolio/big2.webp",
        "/images/portfolio/big3.webp",
        "/images/portfolio/big4.webp",
        "/images/portfolio/big5.webp",
      ],
    },
    {
      id: 2,
      title: "Мини-тату",
      images: [
        "/images/portfolio/mini.webp",
        "/images/portfolio/mini2.webp",
        "/images/portfolio/mini3.webp",
        "/images/portfolio/mini4.webp",
        "/images/portfolio/mini5.webp",
      ],
    },
    {
      id: 3,
      title: "Проекты",
      images: [
        "/images/portfolio/project.webp",
        "/images/portfolio/project2.webp",
        "/images/portfolio/project3.webp",
        "/images/portfolio/project4.webp",
        "/images/portfolio/project5.webp",
        "/images/portfolio/project6.webp",
        "/images/portfolio/project7.webp",
      ],
    },
  ];

  // Функция для открытия модального окна
  const openModal = (sliderIndex: number, imageIndex: number) => {
    setModalSliderIndex(sliderIndex);
    setModalImageIndex(imageIndex);
    setModalOpen(true);
  };

  // Функции навигации в модальном окне
  const nextModalImage = () => {
    const currentSlider = sliders[modalSliderIndex];
    setModalImageIndex((prev) =>
      prev === currentSlider.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    const currentSlider = sliders[modalSliderIndex];
    setModalImageIndex((prev) =>
      prev === 0 ? currentSlider.images.length - 1 : prev - 1
    );
  };

  // Закрытие модального окна по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Блокируем скролл страницы
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset"; // Восстанавливаем скролл
    };
  }, [modalOpen]);

  return (
    <section className="container" id="portfolio">
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
            <SliderComponent
              images={slider.images}
              category={slider.title}
              onImageClick={(imageIndex) => openModal(sliderIndex, imageIndex)}
            />
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <ModalView
          images={sliders[modalSliderIndex].images}
          currentIndex={modalImageIndex}
          onNext={nextModalImage}
          onPrev={prevModalImage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

// Компонент для отдельного слайдера
const SliderComponent = ({
  images,
  category,
  onImageClick,
}: {
  images: string[];
  category: string;
  onImageClick: (index: number) => void;
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
        <div
          className={`${styles.slider_wrapper} ${
            isAnimating ? styles.animating : ""
          }`}
        >
          {currentImages.map((image, index) => (
            <div
              key={`${category}-${startIndex + index}`}
              className={styles.slide}
              onClick={() => onImageClick(startIndex + index)}
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

// Компонент модального окна
const ModalView = ({
  images,
  currentIndex,
  onNext,
  onPrev,
  onClose,
}: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onNext();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onPrev();
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Обработка нажатий клавиш для навигации
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close_button} onClick={onClose}>
          ×
        </button>

        <div className={styles.modal_image_container}>
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className={styles.modal_image}
          />
        </div>

        <div className={styles.modal_controls}>
          <button
            className={styles.modal_arrow_left}
            onClick={handlePrev}
            disabled={isAnimating}
          >
            ←
          </button>

          <span className={styles.image_counter}>
            {currentIndex + 1} / {images.length}
          </span>

          <button
            className={styles.modal_arrow_right}
            onClick={handleNext}
            disabled={isAnimating}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
