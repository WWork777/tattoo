"use client";
import styles from "./Special.module.scss";
import ModalForm from "../modal/ModalForm";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  imageSrc: string;
  text: string | string[];
  onOpenModal: () => void;
  hasDetails?: boolean;
  detailsText?: string;
}

const ImageCard = ({
  imageSrc,
  text,
  onOpenModal,
  hasDetails = false,
  detailsText = "",
}: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

  const handleToggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <div
      className={`${styles.image__card} ${
        hasDetails ? styles.with_details : ""
      } ${isDetailsOpen ? styles.expanded : ""}`}
    >
      <style jsx>{`
        .${styles.image__card}::before {
          background-image: url(/images/${imageSrc}.webp);
        }
      `}</style>

      <div className={styles.card_content}>
        <h3>{renderText()}</h3>

        {hasDetails && (
          <div className={styles.details_section}>
            <button
              className={styles.details_toggle}
              onClick={handleToggleDetails}
              aria-expanded={isDetailsOpen}
            >
              <span>Подробнее</span>
              {isDetailsOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            <div
              className={`${styles.details_content} ${
                isDetailsOpen ? styles.open : ""
              }`}
            >
              <p>{detailsText}</p>
            </div>
          </div>
        )}
      </div>

      <button className={styles.action_button}>
        <Link href="https://t.me/Soprano2024" target="_blank">
          <p>Написать нам</p>
        </Link>
      </button>
    </div>
  );
};

export const Special = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container">
      <h2>Специальные предложения</h2>

      <div className={styles.grid}>
        <ImageCard
          text={["Скидка 10% ", "защитникам Отечества"]}
          imageSrc="special"
          onOpenModal={openModal}
        />

        <ImageCard
          text="Рассрочка или кредит"
          imageSrc="special4"
          onOpenModal={openModal}
          hasDetails={true}
          detailsText="Хотите сделать татуировку, освоить искусство тату или научиться пирсингу, но не готовы оплатить всё сразу? Мы позаботились о том, чтобы ваши планы стали реальностью — предлагаем удобные варианты оплаты в рассрочку или кредит на данные услуги."
        />

        {/* <ImageCard
          text="Новогодняя скидка 10% на обучение тату-мастера"
          imageSrc="02"
          onOpenModal={openModal}
          hasDetails={true}
          detailsText="Хотите освоить профессию татумастера в новом году? У нас — идеальный старт: специальная новогодняя скидка 10% на все курсы тату обучения! Действует до 31.12.2025"
        />

        <ImageCard
          text="Новогодняя скидка 10% на обучение по пирсингу"
          imageSrc="01"
          onOpenModal={openModal}
          hasDetails={true}
          detailsText="Мечтаете освоить искусство пирсинга? Начните новый год с профессионального обучения — воспользуйтесь специальной новогодней скидкой 10%. Действует до 31.12.2025"
        /> */}
      </div>

      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};
