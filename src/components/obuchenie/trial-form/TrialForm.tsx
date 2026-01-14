"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./TrialForm.module.scss";

interface TrialFormProps {
  tarif?: string | null;
  type?: string | null;
}
interface FormData {
  hasTattooExperience: string;
  hasDrawingExperience: string;
  startTime: string;
  name: string;
  phone: string;
  telegram: string;
  privacyAccepted: boolean;
  type: string | null;
  tarif: string | null;
}

interface FormErrors {
  hasTattooExperience?: string;
  hasDrawingExperience?: string;
  startTime?: string;
  name?: string;
  phone?: string;
  telegram?: string;
  privacyAccepted?: string;
}

export default function TrialForm({ tarif=null, type=null }: TrialFormProps) {
  const [formData, setFormData] = useState<FormData>({
    hasTattooExperience: "",
    hasDrawingExperience: "",
    startTime: "",
    name: "",
    phone: "",
    telegram: "",
    privacyAccepted: false,
    tarif: tarif,
    type: type
  });
  console.log(formData.type);
  console.log(formData.tarif);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.hasTattooExperience) {
      newErrors.hasTattooExperience = "Выберите вариант";
    }

    if (!formData.hasDrawingExperience) {
      newErrors.hasDrawingExperience = "Выберите вариант";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Выберите вариант";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else if (
      !/^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted =
        "Необходимо согласие на обработку персональных данных";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleButtonClick = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("hasTattooExperience", formData.hasTattooExperience);
      formDataToSend.append("hasDrawingExperience", formData.hasDrawingExperience);
      formDataToSend.append("startTime", formData.startTime);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      if (formData.type && formData.tarif) {
        formDataToSend.append("type", formData.type);
        formDataToSend.append("tarif", formData.tarif);
        const aa = formDataToSend.get('tarif') as string;
        console.log(formDataToSend.get('tarif') as string)
      }
      if (formData.telegram) {
        formDataToSend.append("telegram", formData.telegram);
      }
      formDataToSend.append("privacyAccepted", formData.privacyAccepted.toString());

      const response = await fetch("/api/trial-lesson", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки формы");
      }

      setIsSuccess(true);
      setFormData({
        hasTattooExperience: "",
        hasDrawingExperience: "",
        startTime: "",
        name: "",
        phone: "",
        telegram: "",
        tarif: null,
        type: null,
        privacyAccepted: false,
      });

      // Прокрутка к сообщению об успехе
      setTimeout(() => {
        successMessageRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }, 100);

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trial-form" className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form__content}>
          <h2>
            Запишись на пробное занятие - получи{" "}
            <span className={styles.gold_text}>скидку 10%</span> на курс
          </h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.form__grid}>
              {/* Левая колонка - вопросы */}
              <div className={styles.questions_column}>
                {/* Вопрос 1: Есть опыт татуирования? */}
                <div className={styles.question_group}>
                  <label className={styles.question_label}>
                    Есть опыт татуирования?
                  </label>
                  <div className={styles.buttons_row}>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasTattooExperience === "Да"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleButtonClick("hasTattooExperience", "Да")}
                    >
                      Да
                    </button>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasTattooExperience === "Нет"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("hasTattooExperience", "Нет")
                      }
                    >
                      Нет
                    </button>
                  </div>
                  {errors.hasTattooExperience && (
                    <span className={styles.error_text}>
                      {errors.hasTattooExperience}
                    </span>
                  )}
                </div>

                {/* Вопрос 2: Есть опыт рисования? */}
                <div className={styles.question_group}>
                  <label className={styles.question_label}>
                    Есть опыт рисования?
                  </label>
                  <div className={styles.buttons_row}>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasDrawingExperience === "Да"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("hasDrawingExperience", "Да")
                      }
                    >
                      Да
                    </button>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasDrawingExperience === "Нет"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("hasDrawingExperience", "Нет")
                      }
                    >
                      Нет
                    </button>
                  </div>
                  {errors.hasDrawingExperience && (
                    <span className={styles.error_text}>
                      {errors.hasDrawingExperience}
                    </span>
                  )}
                </div>

                {/* Вопрос 3: Когда хотел бы начать обучение? */}
                <div className={styles.question_group}>
                  <label className={styles.question_label}>
                    Когда хотел бы начать обучение?
                  </label>
                  <div className={styles.buttons_column}>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.startTime === "В ближайшее время"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleButtonClick("startTime", "В ближайшее время")}
                    >
                      В ближайшее время
                    </button>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.startTime === "В следующем месяце"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("startTime", "В следующем месяце")
                      }
                    >
                      В следующем месяце
                    </button>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.startTime === "Не знаю"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleButtonClick("startTime", "Не знаю")}
                    >
                      Не знаю
                    </button>
                  </div>
                  {errors.startTime && (
                    <span className={styles.error_text}>{errors.startTime}</span>
                  )}
                </div>
              </div>

              {/* Правая колонка - контактная информация */}
              <div className={styles.contact_section}>
                <h3 className={styles.contact_title}>Контактная информация</h3>

                <div className={styles.input_group}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Имя *"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.error : ""}
                  />
                  {errors.name && (
                    <span className={styles.error_text}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.input_group}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон *"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.error : ""}
                  />
                  {errors.phone && (
                    <span className={styles.error_text}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.input_group}>
                  <input
                    type="text"
                    name="telegram"
                    placeholder="Ник из телеграмма (необязательно)"
                    value={formData.telegram}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Чекбокс согласия */}
            <div className={styles.privacy_checkbox}>
              <label className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                <span className={styles.checkbox_custom}></span>
                <span className={styles.checkbox_text}>
                  Я даю согласие на{" "}
                  <a
                    href="/docs/personal-data-consent.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.privacy_link}
                  >
                    обработку персональных данных
                  </a>{" "}
                  и согласен с{" "}
                  <a
                    href="/docs/privacy-policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.privacy_link}
                  >
                    политикой конфиденциальности
                  </a>
                </span>
              </label>
              {errors.privacyAccepted && (
                <span className={styles.error_text}>
                  {errors.privacyAccepted}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit_button}
            >
              <p>{isSubmitting ? "Отправка..." : "Отправить заявку"}</p>
            </button>
          </form>

          {isSuccess && (
            <div ref={successMessageRef} className={styles.success_message}>
              ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее
              время.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

