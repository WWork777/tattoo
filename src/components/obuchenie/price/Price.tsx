'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import TrialForm from '../trial-form/TrialForm';
import Link from 'next/link';

// Создаем отдельные списки для каждого тарифа
const tarifList1 = [
  'Количество занятий : 6',
  'Количество часов : 18 часов',
  'Формат занятий : до 3 человек',
  'Работы на искусственной коже : 5 работ',
  'Работы на настоящей коже',
  'Домашние задания',
  'Портфолио после курса',
  'Оборудование со скидкой',
  'Сертификат о прохождении',
  'Сопровождение после курса : месяц',
  'Аренда гостевого места',
  'Стажировка в SOPRANO',
  'Возможность попасть в команду',
];

const tarifList2 = [
  'Количество занятий : 12',
  'Количество часов : 36 часов',
  'Формат занятий : до 3 человек',
  'Работы на искусственной коже : 10 работ',
  'Работы на настоящей коже',
  'Домашние задания',
  'Портфолио после курса',
  'Оборудование со скидкой',
  'Сертификат о прохождении',
  'Сопровождение после курса : месяц',
  'Аренда гостевого места',
  'Стажировка в SOPRANO',
  'Возможность попасть в команду',
];

const tarifList3 = [
  'Количество занятий : 18',
  'Количество часов : 54 часов',
  'Формат занятий : до 3 человек',
  'Работы на искусственной коже : 15 работ',
  'Работы на настоящей коже',
  'Домашние задания',
  'Портфолио после курса',
  'Оборудование со скидкой',
  'Сертификат о прохождении',
  'Сопровождение после курса : месяц',
  'Аренда гостевого места',
  'Стажировка в SOPRANO',
  'Возможность попасть в команду',
];

interface Props {
  img: string;
  tarifNumber: string;
  tarifTitle: string;
  tarifList: string[];
  tarifPrice: string;
  tafirCreditPrice: string;
  onButtonClick: (type: 'buy' | 'installment') => void;
}

const PriceCard = ({
  img,
  tarifNumber,
  tarifTitle,
  tarifList,
  tarifPrice,
  tafirCreditPrice,
  onButtonClick,
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

              const isTeamAccess = item === 'Возможность попасть в команду';
              const isGuestRent = item === 'Аренда гостевого места';
              const isInternship = item === 'Стажировка в SOPRANO';
              const isSupport = item === 'Сопровождение после курса : месяц';
              const isEquipment = item === 'Оборудование со скидкой';
              const isCertificate = item === 'Сертификат о прохождении';
              const isPortfolio = item === 'Портфолио после курса';
              const isHomework = item === 'Домашние задания';
              const isRealSkin = item === 'Работы на настоящей коже';

              // Обработка для Тарифа №1
              if (tarifNumber === '1') {
                if (isTeamAccess || isGuestRent || isInternship || isSupport) {
                  dataStatus = 'cross';
                } else if (
                  isRealSkin ||
                  isRealSkin ||
                  isHomework ||
                  isPortfolio ||
                  isEquipment ||
                  isCertificate
                ) {
                  dataStatus = 'check';
                }
              }
              // Обработка для Тарифа №2
              else if (tarifNumber === '2') {
                if (isTeamAccess) {
                  dataStatus = 'cross';
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
                  dataStatus = 'check';
                }
              }
              // Обработка для Тарифа №3
              else if (tarifNumber === '3') {
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
                  dataStatus = 'check';
                }
              }

              // Пункты с двоеточием — без иконки (кроме тех, что уже обработаны)
              if (!dataStatus && item.includes(':')) {
                dataStatus = 'colon';
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
            {tarifPrice}
            <br></br>
            <small>Стоимость при покупке единым платежом</small>
          </span>
        </div>

        <div className={styles.tarif__actions}>
          <button onClick={() => onButtonClick('buy')}>
            <p>Купить</p>
          </button>
          <button onClick={() => onButtonClick('installment')}>
            <p>Купить в рассрочку</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Price() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buy' | 'installment'>('buy');
  const [selectedTarif, setSelectedTarif] = useState({
    title: '',
    price: '',
    creditPrice: '',
    number: '',
  });

  // Функции для открытия модалки с разными тарифами
  const openModalWithTarif1 = (type: 'buy' | 'installment') => {
    setSelectedTarif({
      title: 'СТАРТ',
      price: '35 000 ₽',
      creditPrice: '3 400 ₽',
      number: '1',
    });
    setModalType(type);
    setIsModalOpen(true);
  };

  const openModalWithTarif2 = (type: 'buy' | 'installment') => {
    setSelectedTarif({
      title: 'БАЗА',
      price: '65 000 ₽',
      creditPrice: '5 900 ₽',
      number: '2',
    });
    setModalType(type);
    setIsModalOpen(true);
  };

  const openModalWithTarif3 = (type: 'buy' | 'installment') => {
    setSelectedTarif({
      title: 'ПРО',
      price: '105 000 ₽',
      creditPrice: '9 200 ₽',
      number: '3',
    });
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Блокировка скролла
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <section className={styles.container}>
      <h2>Стоимость</h2>
      <div className={styles.tarif__grid}>
        <PriceCard
          img='40'
          tarifNumber='1'
          tarifTitle='СТАРТ'
          tarifList={tarifList1}
          tarifPrice='35 000 ₽'
          tafirCreditPrice='3 400 ₽'
          onButtonClick={openModalWithTarif1}
        />
        <PriceCard
          img='41'
          tarifNumber='2'
          tarifTitle='БАЗА'
          tarifList={tarifList2}
          tarifPrice='65 000 ₽'
          tafirCreditPrice='5 900 ₽'
          onButtonClick={openModalWithTarif2}
        />
        <PriceCard
          img='42'
          tarifNumber='3'
          tarifTitle='ПРО'
          tarifList={tarifList3}
          tarifPrice='105 000 ₽'
          tafirCreditPrice='9 200 ₽'
          onButtonClick={openModalWithTarif3}
        />
      </div>
      <Link href={'/obuchenie-tatu#trial-form'} className={styles.btnTrial}>
        Запишись на пробное занятие - получи скидку 10% на курс
      </Link>
      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              {/* <h3>
                {modalType === "buy" 
                  ? `Заявка на тариф "${selectedTarif.title}"` 
                  : `Заявка на рассрочку "${selectedTarif.title}"`
                }
              </h3> */}
              <button className={styles.modalClose} onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* <div className={styles.tarifInfo}>
                <p><strong>Тариф:</strong> {selectedTarif.title} (№{selectedTarif.number})</p>
                <p><strong>Стоимость:</strong> {
                  modalType === "buy" 
                    ? selectedTarif.price 
                    : `${selectedTarif.creditPrice}/месяц`
                }</p>
              </div> */}
              <TrialForm tarif={selectedTarif.title} type={modalType} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
