"use client";
import styles from "./Services.module.scss";
import ModalForm from "../modal/ModalForm";
import { useState } from "react";
import Link from "next/link";

interface Props {
  imageSrc: string;
  text: string | string[];
  onOpenModal: () => void;
}

const ImageCard = ({ imageSrc, text, onOpenModal }: Props) => {
  const renderText = () => {
    if (Array.isArray(text)) {
      return (
        <>
          {text.map((sentence, index) => (
            <span key={index}>
              {sentence}
              <br />
            </span>
          ))}
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
      <h3>{renderText()}</h3>
      <button>
        <Link href="https://t.me/Soprano2024" target="_blank">
          <p>Написать нам</p>
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
          text={["Разработка", "индивидуального", "эскиза бесплатно"]}
          imageSrc="special2"
          onOpenModal={openModal}
        />
        <ImageCard text="Пирсинг" imageSrc="special3" onOpenModal={openModal} />
        <ImageCard
          text={["Удаление тату"]}
          imageSrc="special5"
          onOpenModal={openModal}
        />
        <ImageCard
          text="Перманентный макияж"
          imageSrc="special6"
          onOpenModal={openModal}
        />
      </div>

      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};
