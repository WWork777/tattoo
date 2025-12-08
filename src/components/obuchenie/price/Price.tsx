import Link from "next/link";
import styles from "./styles.module.scss";

// Создаем отдельные списки для каждого тарифа
const tarifList1 = [
  "Количество занятий : 6",
  "Количество часов : 18 часов",
  "Формат занятий : до 3 человек",
  "Работы на искусственной коже : 5 работ",
  "Работы на настоящей коже",
  "Домашние задания",
  "Портфолио после курса",
  "Оборудование со скидкой",
  "Сертификат о прохождении",
  "Сопровождение после курса : месяц",
  "Аренда гостевого места",
  "Стажировка в SOPRANO",
  "Возможность попасть в команду",
];

const tarifList2 = [
  "Количество занятий : 12",
  "Количество часов : 36 часов",
  "Формат занятий : до 3 человек",
  "Работы на искусственной коже : 10 работ",
  "Работы на настоящей коже",
  "Домашние задания",
  "Портфолио после курса",
  "Оборудование со скидкой",
  "Сертификат о прохождении",
  "Сопровождение после курса : месяц",
  "Аренда гостевого места",
  "Стажировка в SOPRANO",
  "Возможность попасть в команду",
];

const tarifList3 = [
  "Количество занятий : 18",
  "Количество часов : 54 часов",
  "Формат занятий : до 3 человек",
  "Работы на искусственной коже : 15 работ",
  "Работы на настоящей коже",
  "Домашние задания",
  "Портфолио после курса",
  "Оборудование со скидкой",
  "Сертификат о прохождении",
  "Сопровождение после курса : месяц",
  "Аренда гостевого места",
  "Стажировка в SOPRANO",
  "Возможность попасть в команду",
];

interface Props {
  img: string;
  tarifNumber: string;
  tarifTitle: string;
  tarifList: string[];
  tarifPrice: string;
  tafirCreditPrice: string;
}

const PriceCard = ({
  img,
  tarifNumber,
  tarifTitle,
  tarifList,
  tarifPrice,
  tafirCreditPrice,
}: Props) => {
  return (
    <div className={styles.tarifCard}>
      <div
        style={{ backgroundImage: `url(/obuchenie/price/${img}.webp)` }}
        className={styles.tarif__img}
      ></div>
      <div className={styles.tarif__content}>
        <div className={styles.tarif__header}>
          <span>Тариф №{tarifNumber}</span>
          <h3>{tarifTitle}</h3>
        </div>
        <div className={styles.tarif__features}>
          <ul>
            {tarifList.map((item, index) => {
              let dataStatus = undefined;

              const isTeamAccess = item === "Возможность попасть в команду";
              const isGuestRent = item === "Аренда гостевого места";
              const isInternship = item === "Стажировка в SOPRANO";
              const isSupport = item === "Сопровождение после курса : месяц";
              const isEquipment = item === "Оборудование со скидкой";
              const isCertificate = item === "Сертификат о прохождении";
              const isPortfolio = item === "Портфолио после курса";
              const isHomework = item === "Домашние задания";
              const isRealSkin = item === "Работы на настоящей коже";

              // Обработка для Тарифа №1
              if (tarifNumber === "1") {
                if (isTeamAccess || isGuestRent || isInternship || isSupport) {
                  dataStatus = "cross";
                } else if (
                  isRealSkin ||
                  isHomework ||
                  isPortfolio ||
                  isEquipment ||
                  isCertificate
                ) {
                  dataStatus = "check";
                }
              }
              // Обработка для Тарифа №2
              else if (tarifNumber === "2") {
                if (isTeamAccess) {
                  dataStatus = "cross";
                } else if (
                  isGuestRent ||
                  isInternship ||
                  isSupport ||
                  isRealSkin ||
                  isHomework ||
                  isPortfolio ||
                  isEquipment ||
                  isCertificate
                ) {
                  dataStatus = "check";
                }
              }
              // Обработка для Тарифа №3
              else if (tarifNumber === "3") {
                if (
                  isTeamAccess ||
                  isGuestRent ||
                  isInternship ||
                  isSupport ||
                  isRealSkin ||
                  isHomework ||
                  isPortfolio ||
                  isEquipment ||
                  isCertificate
                ) {
                  dataStatus = "check";
                }
              }

              // Пункты с двоеточием — без иконки (кроме тех, что уже обработаны)
              if (!dataStatus && item.includes(":")) {
                dataStatus = "colon";
              }

              return (
                <li key={index} data-status={dataStatus}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.tarif__pricing}>
          <span>{tarifPrice}</span>
          <div className={styles.tarif__line}></div>
          <span>
            {tafirCreditPrice} <br></br>
            <small>Стоимость в месяц при покупке в рассрочку</small>
          </span>
        </div>

        <div className={styles.tarif__actions}>
          <button>
            <Link href="https://t.me/Soprano2024">
              <p>Купить</p>
            </Link>
          </button>
          <button>
            <Link href="https://t.me/Soprano2024">
              <p>Купить в рассрочку</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Price() {
  return (
    <section className="container">
      <h2>Стоимость</h2>
      <div className={styles.tarif__grid}>
        <PriceCard
          img="40"
          tarifNumber="1"
          tarifTitle="СТАРТ"
          tarifList={tarifList1}
          tarifPrice="35 000 ₽"
          tafirCreditPrice="3 400 ₽"
        />
        <PriceCard
          img="41"
          tarifNumber="2"
          tarifTitle="БАЗА"
          tarifList={tarifList2}
          tarifPrice="65 000 ₽"
          tafirCreditPrice="5 900 ₽"
        />
        <PriceCard
          img="42"
          tarifNumber="3"
          tarifTitle="ПРО"
          tarifList={tarifList3}
          tarifPrice="105 000 ₽"
          tafirCreditPrice="9 200 ₽"
        />
      </div>
    </section>
  );
}
