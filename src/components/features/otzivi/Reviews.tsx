"use client";
import { useState } from "react";
import styles from "./Reviews.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.scss";
import { image } from "framer-motion/client";

export const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("2ГИС");

  const reviews = [
    {
      id: 1,
      name: "Ольга Семенова",
      date: "20.06.2025",
      rating: 5,
      text: "Человеческий подход и отношение к клиенту. Всё на высшем уровне. Мастер работу делает как для себя. Всегда на связи.Это большой плюс! Советы адекватные,по существу. Делала вторую татуировку....нервничала чуть-чуть. Оказалось зря- в хорошие руки попала. Благодарю мастера и желаю процветания,и побольше адекватных клиентов.",
      source: "Авито",
      image: "/images/reviews/avito/1.jpg"
    },
    {
      id: 2,
      name: "Евгения",
      date: "24.04.2025",
      rating: 5,
      text: "Вот и завершилось моё обучение «Основы художественной татуировки» у Антона, спешу делиться впечатлениями!)\nМне несказанно повезло оказаться в руках такого опытного, чуткого и внимательного мастера. За время обучения он не просто передал знания о татуировке, но и помог обрести уверенность в себе, поставил руку и поддерживал на каждом этапе...",
      source: "Авито",
      image: "/images/reviews/avito/2.jpg"
    },
    {
      id: 3,
      name: "Максим",
      date: "11.01.2022",
      rating: 5,
      text: "Всё супер!!! Рекомендую!!! Честный продавец!!!",
      source: "Авито",
      image: "/images/reviews/avito/3.jpg"
    },
    {
      id: 4,
      name: "Custom Shop",
      date: "11.01.2022",
      rating: 5,
      text: "Продавец приятный человек, договорились о доставке, пришло все в лучшем виде",
      source: "Авито",
      image: "/images/reviews/avito/4.jpg"
    },
    {
      id: 5,
      name: "Анатолий",
      date: "19.05.2020",
      rating: 5,
      text: "Всё отлично",
      source: "Авито",
      image: "/images/reviews/avito/5.jpg"
    },
    {
      id: 6,
      name: "Артемий Сотворенный",
      date: "3.09.2025",
      rating: 5,
      text: "Замечательное заведение с классными рабочими.\nСделали замечательный искиз взяв в учёт все мои пожелания.\nРекомендую сотрудницу Лизу вайбовая девочка с замечательным чувством юмора.\nПрофи своего дела.",
      source: "2ГИС",
      image: "/images/reviews/2gis/6.jpg"
    },
    {
      id: 7,
      name: "Валерия Розенталь",
      date: "25.08.2025",
      rating: 5,
      text: "Я просто в восторге от работы Алины! Это не просто тату мастер, а настоящий художник с золотыми руками. С момента, как я пришла в салон, она создала такую уютную атмосферу, что я сразу почувствовала себя комфортно...",
      source: "2ГИС",
      image: "/images/reviews/2gis/7.jpg"
    },
    {
      id: 8,
      name: "Оксана Бочкарева",
      date: "23.08.2025",
      rating: 5,
      text: "Мастер Алина просто чудо❤️ Подкорректировала эскиз, учла все мои пожелания. Не больно и очень аккуратно. Теперь только к ней)",
      source: "2ГИС",
      image: "/images/reviews/2gis/8.jpg"
    },
    {
      id: 9,
      name: "Андрей Дронов",
      date: "19.08.2025",
      rating: 5,
      text: "best тату студия in my life атмосфера огонь, отношение максимально доброжелательное, музыка вообще бомба теперь только к вам)",
      source: "2ГИС",
      image: "/images/reviews/2gis/9.jpg"
    },
    {
      id: 10,
      name: "Serezha Isadchenko",
      date: "21.01.2025",
      rating: 5,
      text: "Татуировка на высшем уровне, качественно прорисованы даже мелкие детали, сама Татуировка очень хорошо детализирована. С Антоном можно поговорить на любые темы так что не будете скучать на сеансе)). В дальнейшем планирую забивать остальную часть предплечье у него)",
      source: "Вконтакте",
      image: "/images/reviews/vk/10.jpg"
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
            className={activeFilter === "Авито" ? styles.active : ""}
            onClick={() => setActiveFilter("Авито")}
          >
            <p>Авито</p>
          </button>
          <button
            className={activeFilter === "2ГИС" ? styles.active : ""}
            onClick={() => setActiveFilter("2ГИС")}
          >
            <p>2ГИС</p>
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
                    src={review.image ? review.image : "/images/reviews/obsh.jpg"}
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
