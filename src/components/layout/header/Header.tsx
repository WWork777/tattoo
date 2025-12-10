"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/#special", text: "Услуги" },
    { href: "/#masters", text: "Мастера" },
    { href: "/#portfolio", text: "Портфолио" },
    { href: "/blog", text: "Блог" },
    { href: "/#form", text: "Консультация" },
  ];

  const phoneNumber = "+7(953) 793-18-89";

  return (
    <header className={styles.header}>
      <div className={styles.header__content__left}>
        <Link href="/">
          <img src="/images/logo/Logo.svg" alt="logo" />
        </Link>

        {/* Навигация для десктопа */}
        <nav className={styles.nav__desktop}>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <p>{link.text}</p>
            </Link>
          ))}
          <div
            className={styles.line}
            style={{
              width: "2px",
              height: "50px",
              backgroundColor: "#c6ab7a",
              margin: "12px 0",
            }}
          ></div>
          <div className={styles.lessons}>
          <Link href={"/obuchenie-tatu"}>
            <p style={{ color: "#c6ab7a", fontSize: "20px" }}>Обучение тату</p>
          </Link>
          <Link href={"/obuchenie-pirsingu"}>
            <p style={{ color: "#c6ab7a", fontSize: "20px" }}>Обучение пирсингy</p>
          </Link>
          </div>
        </nav>
      </div>

      <div className={styles.header__content__right}>
        <Link
          href={`tel:${phoneNumber.replace(/[^\d]/g, "")}`}
          className={styles.phone__desktop}
        >
          <p>{phoneNumber}</p>
        </Link>
        <Link href={"https://www.instagram.com/soprano.tattoo.nsk"}>
          <img src="/icons/header/inst.svg" alt="Instagram" />
        </Link>
        <Link href="https://t.me/sopranotattoo">
          <img src="/icons/header/tg.svg" alt="Telegram" />
        </Link>
        <Link href="https://vk.com/soprano_tattoo">
          <img src="/icons/header/vk.svg" alt="VK" />
        </Link>

        {/* Бургер меню для мобильных */}
        <button
          className={`${styles.menu__toggle} ${
            isMenuOpen ? styles.active : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Мобильное меню */}
      <div
        className={`${styles.nav__mobile} ${isMenuOpen ? styles.active : ""}`}
      >
        {/* Логотип в мобильном меню */}
        <div className={styles.nav__mobile__header}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <img src="/images/logo/Logo 2.png" alt="logo" />
          </Link>
          <button
            className={styles.menu__close}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={styles.nav__mobile__content}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              <p>{link.text}</p>
            </Link>
          ))}
          <Link href={"/obuchenie-tatu"}>
            <p
              style={{ color: "#c6ab7a", fontSize: "20px" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Обучение тату
            </p>
          </Link>
          {/* Номер телефона в мобильном меню */}
          <Link
            href={`tel:${phoneNumber.replace(/[^\d]/g, "")}`}
            className={styles.phone__mobile}
            onClick={() => setIsMenuOpen(false)}
          >
            <p>{phoneNumber}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};
