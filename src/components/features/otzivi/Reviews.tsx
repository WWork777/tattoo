"use client";
import { useState } from "react";
import styles from "./Reviews.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.scss";

export const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("2ГИС");

  const reviews = [
    {
      id: 1,
      name: "Маргарита Куприянова",
      date: "04.08.2025",
      rating: 5,
      text: "Я посетила сеанс у мастера Златы. В салоне царит замечательная атмосфера, где можно не только отдохнуть и расслабиться, но и пообщаться с другими клиентами. Мне очень понравилось, как Злата выполнила свою работу. Я обязательно вернусь сюда снова.",
      source: "2ГИС",
    },
    {
      id: 10,
      name: "Маргарита Куприянова",
      date: "04.08.2025",
      rating: 5,
      text: "Я посетила сеанс у мастера Златы. В салоне царит замечательная атмосфера, где можно не только отдохнуть и расслабиться, но и пообщаться с другими клиентами. Мне очень понравилось, как Злата выполнила свою работу. Я обязательно вернусь сюда снова.",
      source: "2ГИС",
    },
    {
      id: 2,
      name: "Александр Културный",
      date: "28.12.2024",
      rating: 5,
      text: "При проведении сеансов, мастер лояльный, внимательный и ответственный, никогда не бросает почти законченный проект, он может задержаться что бы уже все вам доделать и отпустить вас заживлять уже готовый проект, так же очень спасибо за консультацию и инструктаж по заживлению, очень советую и рекомендую",
      source: "Авито",
    },
    {
      id: 3,
      name: "Елизавета Сидорова",
      date: "28.12.2024",
      rating: 5,
      text: "Антон, профессионал, отлично выполняет работу, к каждому клиенту подходит индивидуально, в общем советую!",
      source: "Вконтакте",
    },
    {
      id: 4,
      name: "Иван Петров",
      date: "15.01.2025",
      rating: 5,
      text: "Отличный сервис, профессиональный подход. Очень доволен результатом и буду рекомендовать друзьям.",
      source: "2ГИС",
    },
    {
      id: 5,
      name: "Ольга Семенова",
      date: "22.01.2025",
      rating: 5,
      text: "Прекрасное место, уютная атмосфера. Мастер уделила внимание всем деталям и учла все пожелания.",
      source: "Авито",
    },
  ];

  const filteredReviews = reviews.filter(
    (review) => review.source === activeFilter
  );

  return (
    <div className={styles.reviewsSection}>
      <div className="container-slider">
        <h2>Отзывы</h2>

        <div className={styles.filters}>
          <button
            className={activeFilter === "2ГИС" ? styles.active : ""}
            onClick={() => setActiveFilter("2ГИС")}
          >
            <p>2ГИС</p>
          </button>
          <button
            className={activeFilter === "Авито" ? styles.active : ""}
            onClick={() => setActiveFilter("Авито")}
          >
            <p>Авито</p>
          </button>
          <button
            className={activeFilter === "Вконтакте" ? styles.active : ""}
            onClick={() => setActiveFilter("Вконтакте")}
          >
            <p>Вконтакте</p>
          </button>
        </div>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          className="promo-catalog"
        >
          {filteredReviews.map((review) => (
            <SwiperSlide key={review.id} className={styles.slide}>
              <div className={styles.reviewCard}>
                <div className={styles.reviewCardTop}>
                  <img
                    src={"/images/reviews/review.jpg"}
                    alt={review.name}
                    className={styles.avatar}
                  />
                  <div className={styles.reviewCardInfo}>
                    <span className={styles.name}>{review.name}</span>
                    <span className={styles.date}>{review.date}</span>
                    <div className={styles.rating}>
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <div className={styles.reviewCardBottom}>
                  <p>{review.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
