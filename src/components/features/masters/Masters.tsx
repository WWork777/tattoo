"use client";
import styles from "./Masters.module.scss";
import Link from "next/link";
import { useState } from "react";
import ModalForm from "../modal/ModalForm"; // Добавляем импорт модального окна

interface Master {
  id: number;
  imageSrc: string;
  name: string;
  description: string;
  tgLink: string;
  instaLink: string;
  vkLink: string;
  category: string;
}

interface Props {
  imageSrc: string;
  name: string;
  description: string;
  tgLink: string;
  instaLink: string;
  vkLink: string;
  onOpenModal: () => void; // Добавляем пропс для открытия модального окна
}

const Card = ({
  name,
  imageSrc,
  description,
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
      <p>{description}</p>
      <div className={styles.card__footer}>
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
        <button onClick={onOpenModal}>
          {" "}
          {/* Вызываем функцию открытия */}
          <p>Записаться</p>
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
      imageSrc: "tattoo.jpg",
      name: "Антон",
      description:
        "Более 10 лет в тату-индустрии. Специализация: Крупные проекты (рукава, ногава, спины)",
      tgLink: "https://t.me/soprano_tattoo",
      instaLink: "https://www.instagram.com/soprano_tattoo/",
      vkLink: "https://vk.com/soprano_tattoo",
      category: "tattoo",
    },
    {
      id: 2,
      imageSrc: "tattoo2.png",
      name: "Злата",
      description:
        "Специалист по нежной графике и минимализму. Каждая работа — аккуратная история, рассказанная через тонкие линии",
      tgLink: "https://t.me/soprano_tattoo",
      instaLink: "https://www.instagram.com/soprano_tattoo/",
      vkLink: "https://vk.com/soprano_tattoo",
      category: "tattoo",
    },
    {
      id: 3,
      imageSrc: "tattoo3.jpg",
      name: "Егор",
      description:
        "Амбассадор контуров 10 лет в тату — опыт, превращённый в уверенную руку и высокую скорость",
      tgLink: "https://t.me/soprano_tattoo",
      instaLink: "https://www.instagram.com/soprano_tattoo/",
      vkLink: "https://vk.com/soprano_tattoo",
      category: "tattoo",
    },
    {
      id: 4,
      imageSrc: "tattoo4.jpg",
      name: "Лиза",
      description:
        "Графика, в которой чувствуется характер Универсал — одинаково точно работает с разными стилями",
      tgLink: "https://t.me/soprano_tattoo",
      instaLink: "https://www.instagram.com/soprano_tattoo/",
      vkLink: "https://vk.com/soprano_tattoo",
      category: "tattoo",
    },
    {
      id: 5,
      imageSrc: "tattoo5.jpg",
      name: "Алина",
      description:
        "Бью стилевые и дерзкие татухи уже 5 лет. Моя страсть — андеграунд, дарк и аниме-графика, которые цепляют взгляд и отражают твой внутренний стиль",
      tgLink: "https://t.me/soprano_tattoo",
      instaLink: "https://www.instagram.com/soprano_tattoo/",
      vkLink: "https://vk.com/soprano_tattoo",
      category: "tattoo",
    },
  ];

  const filteredMasters = masters.filter(
    (master) => master.category === activeCategory
  );

  const categories = [
    { id: "tattoo", name: "Тату" },
    { id: "piercing", name: "Пирсинг" },
    { id: "removal", name: "Удаление тату" },
    { id: "permanent", name: "Перманент" },
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

      {/* <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={activeCategory === category.id ? styles.active : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            <p>{category.name}</p>
          </button>
        ))}
      </div> */}

      <div className={styles.grid}>
        {filteredMasters.map((master) => (
          <Card
            key={master.id}
            imageSrc={master.imageSrc}
            name={master.name}
            description={master.description}
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
