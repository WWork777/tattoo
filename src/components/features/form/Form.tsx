"use client";
import { useState } from "react";
import styles from "./Form.module.scss";

export const Form = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  // Функции для открытия ссылок
  const openTelegram = () => {
    window.open("https://t.me/https://t.me/Soprano2024", "_blank");
    setIsSuccess(true);

    // Скрываем сообщение об успехе через 5 секунд
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const openVK = () => {
    window.open("https://vk.com/soprano_tattoo", "_blank");
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const makePhoneCall = () => {
    window.location.href = "tel:+79537931889";
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section className="container" id="form">
      <div className={styles.form}>
        <div className={styles.form__content}>
          <h2>Свяжись с нами</h2>

          <div className={styles.buttons_container}>
            <button
              type="button"
              onClick={openTelegram}
              className={styles.contact_button}
            >
              <div className={styles.button_icon}>
                {/* Иконка Telegram - можно заменить на SVG или изображение */}
                <img src="/icons/socials/tg.svg" alt="" />
              </div>
              <div className={styles.button_content}>
                <p className={styles.button_title}>Написать в Telegram</p>
                <p className={styles.button_description}>
                  Быстрый ответ в мессенджере
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={openVK}
              className={styles.contact_button}
            >
              <div className={styles.button_icon}>
                {/* Иконка ВКонтакте */}
                <img src="/icons/socials/vk.svg" alt="" />
              </div>
              <div className={styles.button_content}>
                <p className={styles.button_title}>Написать в ВК</p>
                <p className={styles.button_description}>
                  Связь через ВКонтакте
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={makePhoneCall}
              className={styles.contact_button}
            >
              <div className={styles.button_icon}>
                {/* Иконка телефона */}
                <img src="/icons/footer/phone.svg" alt="" />
              </div>
              <div className={styles.button_content}>
                <p className={styles.button_title}>Позвонить нам</p>
                <p className={styles.button_description}>+7 (953) 739-18-89</p>
              </div>
            </button>
          </div>

          <span>
            Выбирайте удобный способ связи. Мы ответим в ближайшее время!
          </span>
        </div>

        <div className={styles.form__image}></div>
      </div>
    </section>
  );
};
