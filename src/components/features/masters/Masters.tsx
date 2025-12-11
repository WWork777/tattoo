"use client";
import styles from "./Masters.module.scss";
import Link from "next/link";
import { useState } from "react";
import ModalForm from "../modal/ModalForm"; // Добавляем импорт модального окна

interface Master {
  id: number;
  imageSrc: string;
  name: string;
  description?: string;
  list?: string[];
  tgLink: string;
  instaLink: string;
  vkLink: string;
  category: string;
}

interface Props {
  imageSrc: string;
  name: string;
  description?: string;
  list?: string[];
  tgLink: string;
  instaLink: string;
  vkLink: string;
  onOpenModal: () => void; // Добавляем пропс для открытия модального окна
}

const Card = ({
  name,
  imageSrc,
  description,
  list,
  tgLink,
  instaLink,
  vkLink,
  onOpenModal, // Принимаем пропс
}: Props) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(/images/masters/${imageSrc})`,
        backgroundSize: "cover",
      }}
    >
      <h3>{name}</h3>
      {description == null ? '' : <p>{description}</p>}
      {list == null ? '' : 
        <ul>
          {list?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      }
      <div className={styles.card__footer}>
        <div>
          <div>
            <p>Портфолио</p>
          </div>
          <div className={styles.card__footer__socials}>
            <Link href={tgLink}>
              <img src="/icons/socials/tg.svg" alt="" />
            </Link>
            <Link href={instaLink}>
              <img src="/icons/socials/inst.svg" alt="" />
            </Link>
            <Link href={vkLink}>
              <img src="/icons/socials/vk.svg" alt="" />
            </Link>
          </div>
        </div>
        <button>
          {" "}
          {/* Вызываем функцию открытия */}
          <Link href="https://t.me/Soprano2024" target="_blank">
            <p>Записаться</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default function Masters() {
  const [activeCategory, setActiveCategory] = useState<string>("tattoo");
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  const masters: Master[] = [
    {
      id: 1,
      imageSrc: "tattoo.webp",
      name: "Антон",
      description:
        "Более 10 лет в тату-индустрии. Специализация: Крупные проекты (рукава, ногава, спины)",
      tgLink: "https://t.me/datsky_read",
      instaLink: "https://www.instagram.com/draytsev_tattoo",
      vkLink: "https://vk.com/tonismoke",
      category: "tattoo",
    },
    {
      id: 2,
      imageSrc: "tattoo2.webp",
      name: "Иван",
      description:
        "Стаж 5 лет - опыт, превращённый в уверенную руку и высокую скорость",
      tgLink: "#",
      instaLink: "#",
      vkLink: "#",
      category: "tattoo",
    },
    {
      id: 3,
      imageSrc: "piercing.webp",
      name: "Кирилл",
      list:
        ["7 лет опыта", "Мед. Образование", "Работает со всеми проколами классического пирсинга", "Работал во множествах студий Новосибирска, с разным прайсом и оборудованием"],
      tgLink: "#",
      instaLink: "#",
      vkLink: "#",
      category: "piercing",
    },
    {
      id: 4,
      imageSrc: "tattoo.webp",
      name: "Антон",
      description:
        "Куратор курса",
      tgLink: "https://t.me/datsky_read",
      instaLink: "https://www.instagram.com/draytsev_tattoo",
      vkLink: "https://vk.com/tonismoke",
      category: "lesson",
    },
    {
      id: 5,
      imageSrc: "tattoo2.webp",
      name: "Иван",
      description:
        "Старший мастер",
      tgLink: "#",
      instaLink: "#",
      vkLink: "#",
      category: "lesson",
    },
  ];

  const filteredMasters = masters.filter(
    (master) => master.category === activeCategory
  );

  const categories = [
    { id: "tattoo", name: "Тату" },
    { id: "piercing", name: "Пирсинг" },
    { id: "lesson", name: "Обучение тату" },
  ];

  // Функции для управления модальным окном
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container" id="masters">
      <h2>Мастера</h2>

      <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={activeCategory === category.id ? styles.active : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            <p>{category.name}</p>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredMasters.map((master) => (
          <Card
            key={master.id}
            imageSrc={master.imageSrc}
            name={master.name}
            description={master.description}
            list={master.list}
            tgLink={master.tgLink}
            instaLink={master.instaLink}
            vkLink={master.vkLink}
            onOpenModal={openModal}
          />
        ))}
      </div>

      {/* Модальное окно */}
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
