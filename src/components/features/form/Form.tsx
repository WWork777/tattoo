"use client";
import { useState } from "react";
import styles from "./Form.module.scss";

// Определяем типы для данных формы и ошибок
interface FormData {
  name: string;
  phone: string;
  vkLink: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  vkLink?: string;
}

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    vkLink: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    // Ссылка на ВК не обязательна
    if (formData.vkLink && formData.vkLink.trim().length < 3) {
      newErrors.vkLink =
        "Введите корректную ссылку на ВК или оставьте поле пустым";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка изменений в полях
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очищаем ошибку при вводе
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Отправка данных в Telegram
  const sendToTelegram = async (data: FormData) => {
    const botToken = "8281662695:AAEg-faLY8Giv_T_VBH7Y7zyGxQIUQQDciQ";
    const chatId = "-4914999892";

    if (!botToken || !chatId) {
      throw new Error("Не настроены параметры Telegram бота");
    }

    const message = `
🔔 Новая заявка на консультацию

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
🔗 Ссылка на ВК: ${data.vkLink || "Не указана"}
    `;

    // Исправлен URL (убран лишний пробел)
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка отправки в Telegram: ${errorData.description}`);
    }

    return response.json();
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      await sendToTelegram(formData);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", vkLink: "" });

      // Скрываем сообщение об успехе через 5 секунд
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
    <section className="container" id="form">
      <div className={styles.form}>
        <div className={styles.form__content}>
          <h2>Запишись на консультацию</h2>

          {isSuccess && (
            <div className={styles.success_message}>
              ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее
              время.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <input
                type="text"
                name="name"
                placeholder="Твоё имя"
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
                placeholder="89991234567"
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
                name="vkLink"
                placeholder="Ссылка на ВК (необязательно)"
                value={formData.vkLink}
                onChange={handleChange}
                className={errors.vkLink ? styles.error : ""}
              />
              {errors.vkLink && (
                <span className={styles.error_text}>{errors.vkLink}</span>
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              <p>{isSubmitting ? "Отправка..." : "Отправить заявку"}</p>
            </button>
          </form>

          <span>
            Нажимая «Отправить», Вы соглашаетесь с политикой обработки
            персональных данных
          </span>
        </div>

        <div className={styles.form__image}></div>
      </div>
    </section>
  );
};
