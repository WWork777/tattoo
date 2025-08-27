"use client";
import styles from "./Whous.module.scss";
import Arrow from "./arrow.svg";
import ArrowSecond from "./arrow-second.svg";
import Link from "next/link";
import React from "react";
import ModalForm from "../modal/ModalForm";
import { useState } from "react";

const ImageCard = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      className={styles.image__card}
      style={{ backgroundImage: `url(/images/${imageSrc}.jpg)` }}
    ></div>
  );
};

const TextCard = ({
  text,
  titleText,
  color,
  colorText,
  arrow,
  arrowSecond,
  link,
}: {
  titleText: string | React.ReactNode;
  text: string | string[];
  color: string;
  colorText: string;
  arrow?: string;
  arrowSecond?: string;
  link?: string;
}) => {
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
  if (arrow) {
    return (
      <Link
        href={`${link}`}
        className={styles.text__card}
        style={{ backgroundColor: color }}
      >
        <img src={arrow} alt="" className={styles.arrow__left} />
        {arrowSecond && (
          <img src={arrowSecond} alt="" className={styles.arrow__right} />
        )}
        <h3 style={{ color: colorText }}>{titleText}</h3>
        <p style={{ color: colorText }}>{renderText()}</p>
      </Link>
    );
  }

  return (
    <div className={styles.text__card} style={{ backgroundColor: color }}>
      <h3 style={{ color: colorText }}>{titleText}</h3>
      <p style={{ color: colorText }}>{renderText()}</p>
    </div>
  );
};

const Whous = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container">
      <h2>Кто мы?</h2>
      <div className={styles.grid}>
        <ImageCard imageSrc="whous" />
        <TextCard
          text={[
            "Тату-студия в Новосибирске, где каждый мастер — не просто профессионал, а художник со своей философией.",
            "Мы работаем с разными стилями, но неизменными остаются аккуратность, чистота и индивидуальный подход.",
          ]}
          titleText="SOPRÁNO"
          color="rgba(236, 236, 236, 0.34)"
          colorText="white"
        />
        <ImageCard imageSrc="whous2" />
        <TextCard
          text={[
            "— Татуировки от минимализма до масштабных проектов— Все виды пирсинга, включая интимные",
            "— Удаление татуировки",
            "— Перманентный макияж— Украшения из титана — от 400₽",
          ]}
          titleText="Услуги студии:"
          color="#C6B79C"
          link="/#special"
          colorText="black"
          arrow={Arrow.src}
          arrowSecond={ArrowSecond.src}
        />
        <TextCard
          text={[
            "— Бесплатная консультация",
            "— Эскиз, созданный под тебя или доработка твоей задумки",
            "— Комфортная, эстетичная атмосфера студии",
            "— 100% стерильность",
          ]}
          titleText="Что тебя ждет:"
          color="rgba(236, 236, 236, 0.34)"
          colorText="white"
        />
        <ImageCard imageSrc="whous3" />
        <TextCard
          text={[
            "Мы не только делаем тату, но и обучаем этому искусству.",
            "У нас можно пройти путь от новичка до уверенного мастера.",
            "Всё — на практике, под руководством опытных художников.",
          ]}
          titleText={
            <>
              Хочешь стать <br /> тату-мастером?
            </>
          }
          link="/#form"
          color="#C6B79C"
          colorText="black"
          arrow={Arrow.src}
          arrowSecond={ArrowSecond.src}
        />
        <ImageCard imageSrc="whous4" />
      </div>
    </section>
  );
};

export default Whous;
