"use client";
import { useEffect, useState } from "react";
import styles from "./ModalForm.module.scss";

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

const ModalForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    vkLink: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Закрытие модального окна по нажатию Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Предотвращаем скролл body при открытом модальном окне
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Сброс формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", phone: "", vkLink: "" });
      setErrors({});
      setIsSuccess(false);
    }
  }, [isOpen]);

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

      // Автоматически закрываем модальное окно через 3 секунды после успеха
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modal__close}
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          ×
        </button>

        <div className={styles.form__content}>
          <h2>Записаться</h2>

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
                required
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
                required
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
      </div>
    </div>
  );
};

export default ModalForm;
