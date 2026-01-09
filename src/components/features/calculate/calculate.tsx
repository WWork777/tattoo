'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './calculate.module.scss';
import { button } from 'framer-motion/client';

export default function TattooCalculator() {
  // Состояния
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    // Вопрос 1: У вас есть татуировки? (как у конкурентов)
    hasTattoos: '',
    // Вопрос 2: На каком месте тату?
    placement: '',
    // Вопрос 3: Какой размер тату?
    size: '',
    // Вопрос 4: У вас уже есть эскиз или идея? (как вопрос №2 у конкурентов)
    sketchType: '',
    // Вопрос 5: Файл (эскиз/пример)
    file: null as File | null,
    // Вопрос 6: Какой бюджет планируете?
    budget: '',
    // Вопрос 7: Если есть пожелания по тату, напишите
    notes: '',
    // Чекбокс согласия
    privacyAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Константы для вопросов
  // Вопрос 1: У вас есть татуировки? (как у конкурентов)
  const hasTattoosOptions = [
    'Нет, это будет первая',
    'Да, хочу коррекцию',
    'Пока нет идей, нужна консультация',
    'Да, хочу ещё!',
    'Да, нужно перекрытие',
    'Хочу приобрести сертификат',
  ];

  // Вопрос 2: На каком месте тату?
  const placementOptions = ['Рука', 'Нога', 'Спина', 'Торс', 'Другое'];

  // Вопрос 3: Какой размер тату?
  const sizeOptions = ['до 5 см', 'до 10 см', 'до 15 см', 'от 20 см и более'];

  // Вопрос 4: У вас уже есть эскиз или идея? (как вопрос №2 у конкурентов)
  const sketchOptions = [
    'Есть готовый эскиз',
    'Есть пример, нужна доработка',
    'Есть идея, нужен эскиз',
    'Пока нет идей, нужна консультация',
  ];

  const totalSteps = 6;

  // Функции
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        // Вопрос 1: Наличие татуировок
        if (!formData.hasTattoos) newErrors.hasTattoos = 'Выберите вариант';
        break;
      case 2:
        // Вопрос 2: Место нанесения
        if (!formData.placement)
          newErrors.placement = 'Выберите место нанесения';
        break;
      case 3:
        // Вопрос 3: Размер тату
        if (!formData.size) newErrors.size = 'Выберите размер татуировки';
        break;
      case 4:
        // Вопрос 4: Наличие эскиза/идеи
        if (!formData.sketchType) newErrors.sketchType = 'Выберите вариант';
        break;
      case 6:
        // Вопрос 6: Бюджет (только цифры)
        if (!formData.budget) {
          newErrors.budget = 'Введите планируемый бюджет';
        } else if (
          isNaN(Number(formData.budget)) ||
          Number(formData.budget) <= 0
        ) {
          newErrors.budget = 'Введите корректную сумму (только цифры)';
        }
        // Проверка чекбокса согласия
        if (!formData.privacyAccepted) {
          newErrors.privacyAccepted =
            'Необходимо согласие на обработку персональных данных';
        }
        break;
      // case 7:
      //   // Вопрос 7: Валидация чекбокса на последнем шаге
      //   if (!formData.privacyAccepted) {
      //     newErrors.privacyAccepted = 'Необходимо согласие на обработку персональных данных'
      //   }
      //   break
    }

    const isValid = Object.keys(newErrors).length === 0;
    setErrors(newErrors);
    return isValid;
  };

  const nextStep = (): void => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (name: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    // На последнем шаге проверяем валидацию
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('hasTattoos', formData.hasTattoos);
      formDataToSend.append('placement', formData.placement);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('sketchType', formData.sketchType);
      formDataToSend.append('budget', formData.budget);
      formDataToSend.append('notes', formData.notes);
      formDataToSend.append(
        'privacyAccepted',
        formData.privacyAccepted.toString()
      );

      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await fetch('/api/calculate-tattoo', {
        method: 'POST',
        body: formDataToSend,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Ошибка парсинга JSON ответа:', parseError);
        setSubmitStatus('error');
        return;
      }

      if (response.ok && data.success) {
        setSubmitStatus('success');
      } else {
        console.error('Ошибка ответа сервера:', data);
        // Показываем более понятное сообщение об ошибке
        if (data.code === 'TELEGRAM_NOT_CONFIGURED') {
          alert(
            'Ошибка: Telegram бот не настроен. Проверьте настройки сервера.'
          );
        } else if (data.telegramError) {
          alert(
            `Ошибка отправки в Telegram: ${data.error}\nПроверьте правильность токена и chat_id.`
          );
        } else {
          alert(`Ошибка отправки: ${data.error || 'Неизвестная ошибка'}`);
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Рендер шагов
  const renderStep = (): React.ReactElement => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 1 из 6</span>
              <h3 className={styles.stepTitle}>У вас есть татуировки?</h3>
            </div>

            <div className={styles.radioGrid}>
              {hasTattoosOptions.map((option) => (
                <label
                  key={option}
                  className={`${styles.radioLabel} ${
                    formData.hasTattoos === option ? styles.active : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='hasTattoos'
                    checked={formData.hasTattoos === option}
                    onChange={() => handleRadioChange('hasTattoos', option)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {errors.hasTattoos && (
              <div className={styles.error}>{errors.hasTattoos}</div>
            )}
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 2 из 6</span>
              <h3 className={styles.stepTitle}>На каком месте тату?</h3>
            </div>

            <div className={styles.radioGrid}>
              {placementOptions.map((place) => (
                <label
                  key={place}
                  className={`${styles.radioLabel} ${
                    formData.placement === place ? styles.active : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='placement'
                    checked={formData.placement === place}
                    onChange={() => handleRadioChange('placement', place)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{place}</span>
                </label>
              ))}
            </div>

            {errors.placement && (
              <div className={styles.error}>{errors.placement}</div>
            )}
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 3 из 6</span>
              <h3 className={styles.stepTitle}>Какой размер тату?</h3>
            </div>

            <div className={styles.radioGrid}>
              {sizeOptions.map((size) => (
                <label
                  key={size}
                  className={`${styles.radioLabel} ${
                    formData.size === size ? styles.active : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='size'
                    checked={formData.size === size}
                    onChange={() => handleRadioChange('size', size)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{size}</span>
                </label>
              ))}
            </div>

            {errors.size && <div className={styles.error}>{errors.size}</div>}
          </div>
        );

      case 4:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 4 из 6</span>
              <h3 className={styles.stepTitle}>
                У вас уже есть эскиз или идея?
              </h3>
            </div>

            <div className={styles.radioGrid}>
              {sketchOptions.map((option) => (
                <label
                  key={option}
                  className={`${styles.radioLabel} ${
                    formData.sketchType === option ? styles.active : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='sketchType'
                    checked={formData.sketchType === option}
                    onChange={() => handleRadioChange('sketchType', option)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {errors.sketchType && (
              <div className={styles.error}>{errors.sketchType}</div>
            )}
          </div>
        );

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 5 из 6</span>
              <h3 className={styles.stepTitle}>Загрузи пример или эскиз</h3>
              <p className={styles.stepSubtitle}>
                Необязательно, но поможет мастеру лучше понять вашу идею
              </p>
            </div>

            <div className={styles.fileUpload}>
              <input
                type='file'
                onChange={handleFileChange}
                accept='image/*,.pdf'
                className={styles.fileInput}
                id='file-upload'
              />

              <label htmlFor='file-upload' className={styles.fileLabel}>
                <div className={styles.fileIcon}>📁</div>
                <div className={styles.fileText}>
                  Нажмите для загрузки файла
                </div>
                <div className={styles.fileInfo}>JPG, PNG, PDF до 10MB</div>
              </label>

              {formData.file && (
                <div className={styles.filePreview}>
                  <div className={styles.filePreviewIcon}>📄</div>
                  <div className={styles.filePreviewInfo}>
                    <p className={styles.fileName}>{formData.file.name}</p>
                    <p className={styles.fileSize}>
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type='button'
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, file: null }))
                    }
                    className={styles.fileRemoveButton}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 6 из 6</span>
              <h3 className={styles.stepTitle}>Какой бюджет планируешь?</h3>
            </div>

            <div className={styles.inputGroup}>
              <input
                type='text'
                name='budget'
                value={formData.budget || ''}
                onChange={handleInputChange}
                className={styles.input}
                placeholder='Например: 15000'
                inputMode='numeric'
                pattern='[0-9]*'
              />
              <span className={styles.currency}>₽</span>
            </div>
            <p className={styles.inputHint}>Введите сумму цифрами</p>

            {errors.budget && (
              <div className={styles.error}>{errors.budget}</div>
            )}

            <div style={{ marginTop: '40px' }}>
              <h4
                className={styles.stepTitle}
                style={{
                  fontSize: '20px',
                  marginBottom: '20px',
                  textAlign: 'left',
                }}
              >
                Если есть пожелания по тату, напиши
              </h4>
              <textarea
                name='notes'
                value={formData.notes || ''}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder='Опишите ваши идеи, пожелания, особенности...'
                rows={4}
                maxLength={500}
              />
              <div className={styles.charCounter}>
                <span className={styles.charCount}>
                  {formData.notes.length}
                </span>
                <span className={styles.charMax}>/500 символов</span>
              </div>
            </div>

            {/* Чекбокс на последнем шаге */}
            <div className={styles.privacyCheckbox}>
              <label className={styles.checkboxLabel}>
                <input
                  type='checkbox'
                  name='privacyAccepted'
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>
                  Я соглашаюсь с обработкой персональных данных
                </span>
              </label>
              {errors.privacyAccepted && (
                <div className={styles.error}>{errors.privacyAccepted}</div>
              )}
            </div>
          </div>
        );

      // case 7:
      //   return (
      //     <div className={styles.step}>
      //       <div className={styles.stepHeader}>
      //         <span className={styles.stepNumber}>Шаг 7 из 7</span>
      //         <h3 className={styles.stepTitle}>Если есть пожелания по тату, напиши</h3>
      //       </div>

      //       <textarea
      //         name="notes"
      //         value={formData.notes}
      //         onChange={handleInputChange}
      //         className={styles.textarea}
      //         placeholder="Опишите ваши идеи, пожелания, особенности..."
      //         rows={6}
      //         maxLength={500}
      //       />

      //       <div className={styles.charCounter}>
      //         <span className={styles.charCount}>{formData.notes.length}</span>
      //         <span className={styles.charMax}>/500 символов</span>
      //       </div>

      //       {/* Чекбокс на последнем шаге */}
      //       <div className={styles.privacyCheckbox}>
      //         <label className={styles.checkboxLabel}>
      //           <input
      //             type="checkbox"
      //             name="privacyAccepted"
      //             checked={formData.privacyAccepted}
      //             onChange={handleInputChange}
      //             className={styles.checkboxInput}
      //           />
      //           <span className={styles.checkboxCustom}></span>
      //           <span className={styles.checkboxText}>
      //             Я соглашаюсь с обработкой персональных данных
      //           </span>
      //         </label>
      //         {errors.privacyAccepted && <div className={styles.error}>{errors.privacyAccepted}</div>}
      //       </div>
      //     </div>
      //   )

      default:
        return <div className={styles.error}>Ошибка: неверный шаг</div>;
    }
  };

  return (
    <section className={styles.section} id='calculate'>
      <div className={styles.container}>
        <h1 className={styles.title}>Рассчитать стоимость татуировки</h1>
        <p className={styles.subtitle}>
          Заполните форму и мастер свяжется с вами для расчета
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Прогресс бар внутри формы */}
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className={styles.progressText}>
              Шаг {currentStep} из {totalSteps}
            </div>
          </div>

          {submitStatus === 'success' ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✅</div>
              <h3 className={styles.successTitle}>Заявка отправлена!</h3>
              <p className={styles.successMessage}>
                Мастер свяжется с вами в течение 24 часов для расчета стоимости.
              </p>
              <button
                type='button'
                onClick={() => {
                  setFormData({
                    hasTattoos: '',
                    placement: '',
                    size: '',
                    sketchType: '',
                    budget: '',
                    notes: '',
                    file: null,
                    privacyAccepted: false,
                  });
                  setCurrentStep(1);
                  setSubmitStatus(null);
                }}
                className={styles.newRequest}
              >
                Новая заявка
              </button>
            </div>
          ) : submitStatus === 'error' ? (
            <div className={styles.error}>
              <div className={styles.errorIcon}>❌</div>
              <h3 className={styles.errorTitle}>Ошибка отправки</h3>
              <p className={styles.errorMessage}>
                Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.
              </p>
              <button
                type='button'
                onClick={() => setSubmitStatus(null)}
                className={styles.retry}
              >
                Попробовать снова
              </button>
            </div>
          ) : (
            <>
              {renderStep()}

              <div className={styles.buttons}>
                {currentStep > 1 && (
                  <button
                    type='button'
                    onClick={prevStep}
                    className={styles.prevButton}
                  >
                    Назад
                  </button>
                )}

                {currentStep === totalSteps ? (
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={styles.nextButton}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      nextStep();
                    }}
                    disabled={isSubmitting}
                    className={styles.nextButton}
                  >
                    Далее
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
