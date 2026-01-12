"use client";
import { useState, useRef } from "react";
import styles from "./TrialForm.module.scss";

interface FormData {
  hasPiercingExperience: string;
  startTime: string;
  name: string;
  phone: string;
  telegram: string;
  privacyAccepted: boolean;
}

interface FormErrors {
  hasPiercingExperience?: string;
  startTime?: string;
  name?: string;
  phone?: string;
  telegram?: string;
  privacyAccepted?: string;
}

export default function TrialForm() {
  const [formData, setFormData] = useState<FormData>({
    hasPiercingExperience: "",
    startTime: "",
    name: "",
    phone: "",
    telegram: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.hasPiercingExperience) {
      newErrors.hasPiercingExperience = "Выберите вариант";
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
      formDataToSend.append("hasPiercingExperience", formData.hasPiercingExperience);
      formDataToSend.append("startTime", formData.startTime);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      if (formData.telegram) {
        formDataToSend.append("telegram", formData.telegram);
      }
      formDataToSend.append("privacyAccepted", formData.privacyAccepted.toString());

      const response = await fetch("/api/trial-lesson-piercing", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки формы");
      }

      setIsSuccess(true);
      setFormData({
        hasPiercingExperience: "",
        startTime: "",
        name: "",
        phone: "",
        telegram: "",
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
                {/* Вопрос 1: Был ли опыт пирсинга? */}
                <div className={styles.question_group}>
                  <label className={styles.question_label}>
                    Был ли опыт пирсинга?
                  </label>
                  <div className={styles.buttons_row}>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasPiercingExperience === "Да"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => handleButtonClick("hasPiercingExperience", "Да")}
                    >
                      Да
                    </button>
                    <button
                      type="button"
                      className={`${styles.option_button} ${
                        formData.hasPiercingExperience === "Нет"
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        handleButtonClick("hasPiercingExperience", "Нет")
                      }
                    >
                      Нет
                    </button>
                  </div>
                  {errors.hasPiercingExperience && (
                    <span className={styles.error_text}>
                      {errors.hasPiercingExperience}
                    </span>
                  )}
                </div>

                {/* Вопрос 2: Когда хотел бы начать обучение? */}
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

