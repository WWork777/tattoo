import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const navLinks = [
    { href: "/#special", text: "Услуги" },
    { href: "/#masters", text: "Мастера" },
    { href: "/#portfolio", text: "Портфолио" },
    { href: "/#contacts", text: "Контакты" },
    { href: "/#form", text: "Консультация" },
  ];

  // ✅ Укажи реальную почту
  const email = "adraytsev@mail.ru";

  // ✅ 3 файла (положи их в public/docs/)
  const legalDocs = [
    { href: "/docs/privacy-policy.pdf", text: "Политика конфиденциальности" },
    { href: "/docs/personal-data-consent.pdf", text: "Согласие на обработку персональных данных" },
    { href: "/docs/public-offer.pdf", text: "Пользовательское соглашение" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <img src="/images/logo/Logo1.svg" alt="logo" className={styles.logo} />
        <nav className={styles.footer__nav}>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className={styles.nav__link}>
              {link.text}
            </Link>
          ))}
          <div className={styles.lessons}>
            <Link href={"/obuchenie-tatu"} className={styles.nav__link}>
              <p style={{ color: "#c6ab7a", fontSize: "20px" }}>Обучение тату</p>
            </Link>
            <Link href={"/obuchenie-pirsingu"} className={styles.nav__link}>
              <p style={{ color: "#c6ab7a", fontSize: "20px" }}>Обучение пирсингу</p>
            </Link>
          </div>
        </nav>
      </div>

      <div className={styles.footer__content}>
        <div className={styles.footer__content__left}>
          {/* ✅ Почта */}
          <Link href={`mailto:${email}`} className={styles.item}>
            <img src="/icons/footer/mail.svg" alt="" /> <p>{email}</p>
          </Link>

          <div className={styles.item}>
            <img src="/icons/footer/geo.svg" alt="" />
            <p>Кирова 113/2, 16 этаж, офис 1604</p>
          </div>

          <Link href="tel:+79537931889" className={styles.item}>
            <img src="/icons/footer/phone.svg" alt="" />
            <p>+7(953) 793-18-89</p>
          </Link>

          <div className={styles.item}>
            <p>
              ИП Драйцев Антон Евгеньевич <br />
              ИНН: 421502753701 / ОГРНИП: 325547600003080
            </p>
          </div>

          <div className={styles.item}>
            <p style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {legalDocs.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nav__link}
                >
                  {doc.text}
                </a>
              ))}
            </p>
          </div>
        </div>

        <div className={styles.footer__content__right}>
          <Link
            href="https://t.me/Soprano2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/footer/tg.svg" alt="Telegram" />
          </Link>
          <Link
            href="https://www.instagram.com/soprano.tattoo.nsk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/footer/inst.svg" alt="Instagram" />
          </Link>
          <Link
            href="https://vk.com/soprano_tattoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/footer/vk.svg" alt="VKontakte" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
