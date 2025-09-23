import styles from "./styles.module.scss";

const tarifList = [
  "Количество занятий : 6",
  "Количество часов  : 24 часа",
  "Формат занятий : до 4 человек",
  "Работы на искусственной коже : 5 работ",
  "Работы на настоящей коже",
  "Домашние задания",
  "Портфолио после курса",
  "Сопровождение после курса : месяц",
  "Оборудование со скидкой",
  "Скидка на следующий курс 10%",
  "Сертификат о прохождении",
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
        style={{ backgroundImage: `url(/images/hero/${img}.webp)` }}
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

              if (isTeamAccess) {
                if (tarifNumber === "3") {
                  dataStatus = "check";
                } else {
                  dataStatus = "cross";
                }
              } else if (isGuestRent || isInternship) {
                if (tarifNumber === "3") {
                  dataStatus = "check";
                } else if (tarifNumber === "1") {
                  dataStatus = "cross";
                }
              }
              // Пункты с двоеточием — без иконки
              else if (item.includes(":")) {
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
            <p>Купить</p>
          </button>
          <button>
            <p>Купить в рассрочку</p>
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
          img="hero"
          tarifNumber="1"
          tarifTitle="Стартовый курс"
          tarifList={tarifList}
          tarifPrice="28 500 ₽"
          tafirCreditPrice="2 500 ₽"
        />
        <PriceCard
          img="hero2"
          tarifNumber="2"
          tarifTitle="Стандартный курс"
          tarifList={tarifList}
          tarifPrice="54 000 ₽"
          tafirCreditPrice="5 000 ₽"
        />
        <PriceCard
          img="hero3"
          tarifNumber="3"
          tarifTitle="Углубленный курс"
          tarifList={tarifList}
          tarifPrice="76 500 ₽"
          tafirCreditPrice="7 500 ₽"
        />
      </div>
    </section>
  );
}
