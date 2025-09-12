import Link from "next/link";
import styles from "./Map.module.scss";

export const Map = () => {
  const phoneNumber = "+7(953) 793-18-89";
  const email = "soprano_tattoo";
  const address = "Кирова 113/2, 19 этаж, офис 1920";

  return (
    <section className="container" id="contacts">
      <h2>Контакты</h2>
      <div className={styles.contacts}>
        <div className={styles.contacts__info}>
          <div className={styles.contacts__item}>
            <div className={styles.contacts__icon}>
              <img src="/icons/footer/geo.svg" alt="Адрес" />
            </div>
            <div className={styles.contacts__content}>
              <h3>Адрес</h3>
              <p>{address}</p>
            </div>
          </div>

          <div className={styles.contacts__item}>
            <div className={styles.contacts__icon}>
              <img src="/icons/footer/phone.svg" alt="Телефон" />
            </div>
            <div className={styles.contacts__content}>
              <h3>Телефон</h3>
              <Link
                href={`tel:${phoneNumber.replace(/[^\d]/g, "")}`}
                className={styles.contacts__link}
              >
                {phoneNumber}
              </Link>
            </div>
          </div>

          <div className={styles.contacts__item}>
            <div className={styles.contacts__icon}>
              <img src="/icons/footer/mail.svg" alt="Email" />
            </div>
            <div className={styles.contacts__content}>
              <h3>Email</h3>
              <Link
                href={`mailto:${email}`}
                className={styles.contacts__link}
                target="_blank"
              >
                {email}
              </Link>
            </div>
          </div>

          <div className={styles.contacts__socials}>
            <h3>Мы в соцсетях</h3>
            <div className={styles.socials__icons}>
              <Link
                href="https://vk.com/soprano_tattoo"
                target="_blank"
                className={styles.social__icon}
              >
                <img src="/icons/footer/vk.svg" alt="ВКонтакте" />
              </Link>
              <Link
                href="https://t.me/Soprano2024"
                target="_blank"
                className={styles.social__icon}
              >
                <img src="/icons/footer/tg.svg" alt="Telegram" />
              </Link>
              <Link
                href="https://www.instagram.com/soprano_tattoo/"
                target="_blank"
                className={styles.social__icon}
              >
                <img src="/icons/footer/inst.svg" alt="Instagram" />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0c378b50faec6784004b0a04536276697570b360e7d0b4237f3f48ad586835e0&amp;source=constructor"
            width="100%"
            height="447"
            frameBorder="0"
            title="Карта салона Soprano"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
