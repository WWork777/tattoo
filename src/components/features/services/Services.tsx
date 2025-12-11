"use client";
import styles from "./Services.module.scss";
import ModalForm from "../modal/ModalForm";
import { useState } from "react";
import Link from "next/link";

interface Props {
  imageSrc: string;
  title: string;
  subtitle: string;
  text: string | string[];
  onOpenModal: () => void;
  btn: boolean;
}

const ImageCard = ({ imageSrc, text, onOpenModal, btn, title, subtitle }: Props) => {
  const renderText = () => {
    if (Array.isArray(text)) {
      return (
        <>
        <div className={styles.imageCardTitle} style={{ textAlign: 'center' }}>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <ul>
          {text.map((sentence, index) => (
            <li key={index}>
              {sentence}
              <br />
            </li>
          ))}
        </ul>
        <span>стоимость: <span>от 3000 руб.</span></span>
        </>
      );
    }
    return text;
  };

  return (
    <div className={styles.image__card}>
      {/* Фон через ::before */}
      <style jsx>{`
        .${styles.image__card}::before {
          background-image: url(/images/${imageSrc}.webp);
        }
      `}</style>
      <div className={styles.imageContent}>{renderText()}</div>
      <button>
        <Link href={btn ? '#calculate' : 'https://t.me/Soprano2024'} target="_blank">
          <p>{btn ? 'Рассчитать стоимость' : 'Написать нам'}</p>
        </Link>
      </button>
    </div>
  );
};

export const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container" id="special">
      <h2>Услуги</h2>

      <div className={styles.grid}>
        <ImageCard
          title="разработка эскиза"
          subtitle="отрисуем эскиз с нуля или доработаем твой"
          text={["реализм", "графика", "цвет", "и еще 69 стилей"]} 
          imageSrc="special3" 
          onOpenModal={openModal}
          btn={false} 
        />
        <ImageCard
          title="Обучение на тату-мастера"
          subtitle="Всё в твоих руках"
          text={["полноценное обучение искусству татуировки от практикующих мастеров", "теория и обширная практика: от эскизов до работы на коже", "обратная связь и разбор ваших работ от преподавателей", "сертификат по окончании курса"]}
          imageSrc="special7"
          onOpenModal={openModal}
          btn={false}
        />
        <ImageCard
          title="сеанс татуировки"
          subtitle="найдем мастера под твой стиль"
          text={["новая тату", "коррекция тату", "перекрытие", "продолжение тату"]}
          imageSrc="special2"
          onOpenModal={openModal}
          btn={true}
        />
        <ImageCard
          title="сертификат"
          subtitle="пожалуй лучший подарок"
          text={["на пирсинг", "на тату", "с индивидуальным дизайном", "любой номинал от 5000₽"]}
          imageSrc="special5"
          onOpenModal={openModal}
          btn={false}
        />
        <ImageCard
          title="пирсинг"
          subtitle="сделаем прокол"
          text={["проколы ушей", "проколы на лице", "проколы на теле", "проколы во рту", "украшения из титана", "иглы с алмазной заточкой"]}
          imageSrc="special6"
          onOpenModal={openModal}
          btn={false}
        />
      </div>

      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};
