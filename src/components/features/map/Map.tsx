import Link from "next/link";
import styles from "./Map.module.scss";

export const Map = () => {
  const phoneNumber = "+7(953) 793-18-89";
  const email = "soprano_tattoo";
  const address = "Кирова 113/2, 16 этаж, офис 1604";

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
            id="map_345070441" 
            frameBorder="0" 
            width="100%" 
            height="470px" 
            src="https://makemap.2gis.ru/widget?data=eJw1jktuwzAMRO_CboXAH8mRfYAU3WUXoEUWjsW2AmRTkBkgqeG7l7ZargjOcOYtQMlhQveKNCInjzN0HwvwMyJ0cMKe7wlBQUwUMfGuLzBQoCT6y2dxs9VNdPYctg9ZHc5D8pE9Tfnw8zY5fEBXFv-zKvjKhc8t7q_tTH5i8Q8kUH7qeYex1aE1um1qZcyhKGvbXOXdO-iOrV2vCsY-nmn2uW-B0DN02WpaY7UpjK4VhE3NWZXWTVk3-qitwBGNgmYlU7AphMs3Ynjfr5zuuP4Cfb1ZKQ" 
            sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          >
          </iframe>
          <Link href={"https://2gis.ru/novosibirsk/firm/70000001096896409?m=82.95482%2C55.013448%2F16"} className={styles.btn2gis}>2ГИС</Link>
        </div>
      </div>
    </section>
  );
};
