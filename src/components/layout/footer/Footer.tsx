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

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <img src="/images/logo/Logo 2.png" alt="logo" className={styles.logo} />
        <nav className={styles.footer__nav}>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className={styles.nav__link}>
              {link.text}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.footer__content}>
        <div className={styles.footer__content__left}>
          <Link href="mailto:soprano_tattoo" className={styles.item}>
            <img src="/icons/footer/mail.svg" alt="" /> <p>soprano_tattoo</p>
          </Link>
          <div className={styles.item}>
            <img src="/icons/footer/geo.svg" alt="" />{" "}
            <p>Кирова 113/2, 19 этаж, офис 1920</p>
          </div>
          <Link href="tel:+79537931889" className={styles.item}>
            <img src="/icons/footer/phone.svg" alt="" />{" "}
            <p>+7(953) 793-18-89</p>
          </Link>
        </div>
        <div className={styles.footer__content__right}>
          <Link
            href="https://t.me/soprano_tattoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/footer/tg.svg" alt="Telegram" />
          </Link>
          <Link
            href="https://www.instagram.com/soprano_tattoo/"
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
