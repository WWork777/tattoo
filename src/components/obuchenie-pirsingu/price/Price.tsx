import Link from "next/link";
import styles from "./styles.module.scss";

// Создаем отдельные списки для каждого тарифа
const tarifList1 = [
  "Количество занятий : 5",
  "Количество часов : 8 часов",
  "Формат занятий : до 3 человек",
  "График : Индивидуальный",
  "Основные проколы, которые изучаются на курсе : Мочка, крыло носа, пупок",
  "Количество проколов на практику : 6 проколов. Каждый изучаемый прокол делается по 2 раза на моделях",
  "Количество моделей: от 2 до 6",
  "Сертификат о прохождении",
];

const tarifList2 = [
  "Количество занятий : 8",
  "Количество часов : 12 часов",
  "Формат занятий : до 3 человек",
  "Основные проколы, которые изучаются на курсе : мочка, крыло носа, пупок + хеликс, конч, бровь",
  "Количество проколов на практику : 12 проколов. Каждый изучаемый прокол делается по 2 раза на моделях",
  "Количество моделей : от 3 до 12",
  "Сертификат о прохождении",
];

const tarifList3 = [
  "Количество занятий : 11",
  "Количество часов : 17 часов",
  "Формат занятий : до 3 человек",
  "Основные проколы, которые изучаются на курсе : мочка, крыло носа, пупок, хеликс, конч, бровь + трагус, индастриал, септум, язык, губы, соски",
  "Количество проколов на практику : 24 прокола. Каждый изучаемый прокол делается по 2 раза на моделях",
  "Количество моделей: от 5 до 24",
  "Сертификат о прохождении",
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
      {/* <div
        style={{ backgroundImage: `url(/obuchenie/price/${img}.webp)` }}
        className={styles.tarif__img}
      ></div> */}
      <div className={styles.tarif__content}>
        <div className={styles.tarif__header}>
          {/* <span>Тариф №{tarifNumber}</span> */}
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
                if (isTeamAccess || isGuestRent ||  isSupport) {
                  dataStatus = "cross";
                } else if (
                  isInternship ||
                  isRealSkin ||
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
          <span>{tafirCreditPrice}/месяц</span>
          <div className={styles.tarif__line}></div>
          <span>
            {tarifPrice}<br></br>
            <small>Стоимость при покупке единым платежом</small>
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

export default function PricePirsing() {
  return (
    <section className="container">
      <h2>Стоимость</h2>
      <div className={styles.tarif__grid}>
        <PriceCard
          img="40"
          tarifNumber="1"
          tarifTitle="СТАРТ"
          tarifList={tarifList1}
          tarifPrice="32 000 ₽"
          tafirCreditPrice="3100 ₽"
        />
        <PriceCard
          img="41"
          tarifNumber="2"
          tarifTitle="БАЗА"
          tarifList={tarifList2}
          tarifPrice="64 000 ₽"
          tafirCreditPrice="6 200 ₽"
        />
        <PriceCard
          img="42"
          tarifNumber="3"
          tarifTitle="ПРО"
          tarifList={tarifList3}
          tarifPrice="96 000 ₽"
          tafirCreditPrice="9 250 ₽"
        />
      </div>
    </section>
  );
}
