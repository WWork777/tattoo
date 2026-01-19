'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './calculate.module.scss';

export default function TattooCalculator() {
  // Состояния
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    // Вопрос 1: У вас есть татуировки?
    hasTattoos: '',
    // Вопрос 2: На каком месте тату?
    placement: '',
    // Вопрос 3: Какой размер тату?
    size: '',
    // Вопрос 4: У вас уже есть эскиз или идея?
    sketchType: '',
    // Вопрос 5: Файлы (несколько)
    files: [] as File[],
    // Вопрос 6: Какой бюджет планируете?
    budget: '',
    // Вопрос 7: Если есть пожелания по тату, напишите
    notes: '',

    phone: '',
    name: '',
    contactMethod: '',
    telegram: '',

    // Чекбокс согласия
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedStep, setTouchedStep] = useState<Record<number, boolean>>({});

  // Опции
  const hasTattoosOptions = [
    'Нет, это будет первая',
    'Да, хочу коррекцию',
    'Пока нет идей, нужна консультация',
    'Да, хочу ещё!',
    'Да, нужно перекрытие',
    'Хочу приобрести сертификат',
  ];

  const placementOptions = ['Рука', 'Нога', 'Спина', 'Торс', 'Другое'];

  const sizeOptions = ['до 5 см', 'до 10 см', 'до 15 см', 'от 20 см и более'];

  const sketchOptions = [
    'Есть готовый эскиз',
    'Есть пример, нужна доработка',
    'Есть идея, нужен эскиз',
    'Пока нет идей, нужна консультация',
  ];

  const connectOptions = ['Звонок', 'Telegram', 'Whatsapp'];

  const totalSteps = 7;

  // Лимит файлов (вариант B: докидываем к уже выбранным)
  const MAX_FILES = 10;

  // Helpers
  const isValidPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (/^[78]\d{10}$/.test(cleaned)) return true;
    if (/^\+7\d{10}$/.test(cleaned)) return true;
    return false;
  };

  // Валидация шага
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.hasTattoos) newErrors.hasTattoos = 'Выберите вариант';
        break;
      case 2:
        if (!formData.placement)
          newErrors.placement = 'Выберите место нанесения';
        break;
      case 3:
        if (!formData.size) newErrors.size = 'Выберите размер татуировки';
        break;
      case 4:
        if (!formData.sketchType) newErrors.sketchType = 'Выберите вариант';
        break;
      case 6:
        if (!formData.budget) {
          newErrors.budget = 'Введите планируемый бюджет';
        } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
          newErrors.budget = 'Введите корректную сумму (только цифры)';
        }
        break;
      case 7:
        if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';

        if (!formData.phone.trim()) {
          newErrors.phone = 'Введите номер телефона';
        } else if (!isValidPhone(formData.phone)) {
          newErrors.phone = 'Введите корректный номер телефона';
        }

        if (!formData.contactMethod)
          newErrors.contactMethod = 'Выберите способ связи';

        if (formData.contactMethod === 'Telegram') {
          if (!formData.telegram.trim()) {
            newErrors.telegram = 'Введите ваш Telegram username';
          }
        }

        if (!formData.privacyAccepted) {
          newErrors.privacyAccepted =
            'Необходимо согласие на обработку персональных данных';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    setTouchedStep((prev) => ({ ...prev, [currentStep]: true }));
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Handlers
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const numbers = value.replace(/\D/g, '');

    let formattedValue = '';

    if (numbers.length > 0) {
      let phoneNumbers = numbers;
      if (!phoneNumbers.startsWith('7') && !phoneNumbers.startsWith('8')) {
        phoneNumbers = '7' + phoneNumbers;
      }

      if (phoneNumbers.length <= 1) {
        formattedValue = '+7';
      } else if (phoneNumbers.length <= 4) {
        formattedValue = `+7 (${phoneNumbers.substring(1, 4)}`;
      } else if (phoneNumbers.length <= 7) {
        formattedValue = `+7 (${phoneNumbers.substring(1, 4)}) ${phoneNumbers.substring(
          4,
          7
        )}`;
      } else if (phoneNumbers.length <= 9) {
        formattedValue = `+7 (${phoneNumbers.substring(1, 4)}) ${phoneNumbers.substring(
          4,
          7
        )}-${phoneNumbers.substring(7, 9)}`;
      } else {
        formattedValue = `+7 (${phoneNumbers.substring(1, 4)}) ${phoneNumbers.substring(
          4,
          7
        )}-${phoneNumbers.substring(7, 9)}-${phoneNumbers.substring(9, 11)}`;
      }
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
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

  // ✅ Вариант B: добавляем к уже выбранным + удаляем дубли + лимит + сброс value
  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const list = e.target.files;
    if (!list) return;

    const selected = Array.from(list);

    setFormData((prev) => {
      const merged = [...prev.files, ...selected];

      // Убираем дубли по (name+size+lastModified)
      const unique = Array.from(
        new Map(
          merged.map((f) => [`${f.name}_${f.size}_${f.lastModified}`, f])
        ).values()
      );

      return { ...prev, files: unique.slice(0, MAX_FILES) };
    });

    // важно: чтобы можно было снова выбрать тот же файл после удаления
    e.target.value = '';
  };

  const removeFile = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const clearAllFiles = (): void => {
    setFormData((prev) => ({ ...prev, files: [] }));
  };

  // Submit
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (currentStep === totalSteps) {
      setTouchedStep((prev) => ({ ...prev, [currentStep]: true }));
    }

    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('hasTattoos', formData.hasTattoos);
      formDataToSend.append('placement', formData.placement);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('sketchType', formData.sketchType);
      formDataToSend.append('budget', formData.budget);
      // formDataToSend.append('notes', formData.notes);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('contactMethod', formData.contactMethod);

      if (formData.telegram) {
        formDataToSend.append('telegram', formData.telegram);
      }

      formDataToSend.append('privacyAccepted', formData.privacyAccepted.toString());

      // ✅ Добавляем ВСЕ файлы одним ключом "files" много раз
      formData.files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      let response: Response;
      try {
        response = await fetch('/api/calculate-tattoo', {
          method: 'POST',
          body: formDataToSend,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.error('Таймаут при отправке заявки');
          setSubmitStatus('error');
          return;
        }
        throw fetchError;
      }

      let responseData: any = {};
      try {
        const text = await response.text();
        if (text) responseData = JSON.parse(text);
      } catch (parseError) {
        console.error('Ошибка парсинга ответа:', parseError);
        if (response.ok) {
          setSubmitStatus('success');
          return;
        }
      }

      if (response.ok && responseData.success !== false) {
        setSubmitStatus('success');
      } else {
        console.error('Ошибка отправки:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI шаги
  const renderStep = (): React.ReactElement => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 1 из 7</span>
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
                    type="radio"
                    name="hasTattoos"
                    checked={formData.hasTattoos === option}
                    onChange={() => handleRadioChange('hasTattoos', option)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {errors.hasTattoos && <div className={styles.error}>{errors.hasTattoos}</div>}
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 2 из 7</span>
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
                    type="radio"
                    name="placement"
                    checked={formData.placement === place}
                    onChange={() => handleRadioChange('placement', place)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{place}</span>
                </label>
              ))}
            </div>

            {errors.placement && <div className={styles.error}>{errors.placement}</div>}
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 3 из 7</span>
              <h3 className={styles.stepTitle}>Какой размер тату?</h3>
            </div>

            <div className={styles.radioGrid}>
              {sizeOptions.map((size) => (
                <label
                  key={size}
                  className={`${styles.radioLabel} ${formData.size === size ? styles.active : ''}`}
                >
                  <input
                    type="radio"
                    name="size"
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
              <span className={styles.stepNumber}>Шаг 4 из 7</span>
              <h3 className={styles.stepTitle}>У вас уже есть эскиз или идея?</h3>
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
                    type="radio"
                    name="sketchType"
                    checked={formData.sketchType === option}
                    onChange={() => handleRadioChange('sketchType', option)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {errors.sketchType && <div className={styles.error}>{errors.sketchType}</div>}
          </div>
        );

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 5 из 7</span>
              <h3 className={styles.stepTitle}>Загрузи пример или эскиз</h3>
              <p className={styles.stepSubtitle}>
                Необязательно, но поможет мастеру лучше понять вашу идею
              </p>
            </div>

            <div className={styles.fileUpload}>
              <input
                type="file"
                multiple
                onChange={handleFilesChange}
                accept="image/*,.pdf"
                className={styles.fileInput}
                id="file-upload"
              />

              <label htmlFor="file-upload" className={styles.fileLabel}>
                <div className={styles.fileIcon}>📁</div>
                <div className={styles.fileText}>Нажмите для загрузки файлов</div>
                <div className={styles.fileInfo}>JPG, PNG, PDF до 10MB (до {MAX_FILES} файлов)</div>
              </label>

              {/* Список файлов */}
              {formData.files.length > 0 && (
                <div className={styles.filePreviewList}>
                  {formData.files.map((f, i) => (
                    <div
                      key={`${f.name}_${f.size}_${f.lastModified}`}
                      className={styles.filePreview}
                    >
                      <div className={styles.filePreviewIcon}>📄</div>
                      <div className={styles.filePreviewInfo}>
                        <p className={styles.fileName}>{f.name}</p>
                        <p className={styles.fileSize}>
                          {(f.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className={styles.fileRemoveButton}
                        aria-label="Удалить файл"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={clearAllFiles}
                    className={styles.fileRemoveButton}
                    style={{ width: '100%', marginTop: '10px' }}
                  >
                    Очистить все
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
              <span className={styles.stepNumber}>Шаг 6 из 7</span>
              <h3 className={styles.stepTitle}>Какой бюджет планируешь?</h3>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Например: 15000"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <span className={styles.currency}>₽</span>
            </div>
            <p className={styles.inputHint}>Введите сумму цифрами</p>

            {errors.budget && <div className={styles.error}>{errors.budget}</div>}
          </div>
        );

      case 7:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 7 из 7</span>
              <h3 className={styles.stepTitle}>Оставьте Контактную информацию</h3>
            </div>

            <div className={styles.inputGroup}>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Ваше имя"
                maxLength={100}
              />
              {errors.name && <div className={styles.errorPoint}>{errors.name}</div>}

              <input
                style={{ marginTop: '20px' }}
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={styles.input}
                placeholder="+7 (123) 456-78-90"
                maxLength={18}
                inputMode="tel"
              />
              {touchedStep[7] && errors.phone && (
                <div className={styles.errorPoint}>{errors.phone}</div>
              )}
            </div>

            <div className={styles.stepHeader}>
              <h3 className={styles.stepTitle}>Как с вами лучше связаться?</h3>
            </div>

            <div className={styles.radioGrid}>
              {connectOptions.map((option) => (
                <label
                  key={option}
                  className={`${styles.radioLabel} ${
                    formData.contactMethod === option ? styles.active : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    checked={formData.contactMethod === option}
                    onChange={() => handleRadioChange('contactMethod', option)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {formData.contactMethod === 'Telegram' && (
              <div className={styles.inputGroup} style={{ marginTop: '20px' }}>
                <input
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="@username"
                  maxLength={100}
                />
                {errors.telegram && <div className={styles.errorPoint}>{errors.telegram}</div>}
              </div>
            )}

            <div className={styles.privacyCheckbox}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>
                  Я даю согласие на обработку персональных данных
                </span>
              </label>

              {errors.privacyAccepted ? (
                <div className={styles.error}>{errors.privacyAccepted}</div>
              ) : (
                errors.contactMethod && <div className={styles.error}>{errors.contactMethod}</div>
              )}
            </div>
          </div>
        );

      default:
        return <div className={styles.error}>Ошибка: неверный шаг</div>;
    }
  };

  return (
    <section className={styles.section} id="calculate">
      <div className={styles.container}>
        <h1 className={styles.title}>Рассчитать стоимость татуировки</h1>
        <p className={styles.subtitle}>Заполните форму и менеджер свяжется с вами для расчета</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Прогресс */}
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
                Менеджер свяжется с вами в течение 24 часов для расчета стоимости.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    hasTattoos: '',
                    placement: '',
                    size: '',
                    sketchType: '',
                    files: [],
                    budget: '',
                    notes: '',
                    privacyAccepted: false,
                    phone: '',
                    name: '',
                    contactMethod: '',
                    telegram: '',
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
              <button type="button" onClick={() => setSubmitStatus(null)} className={styles.retry}>
                Попробовать снова
              </button>
            </div>
          ) : (
            <>
              {renderStep()}

              <div className={styles.buttons}>
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className={styles.prevButton}>
                    Назад
                  </button>
                )}

                <button
                  type={currentStep === totalSteps ? 'submit' : 'button'}
                  onClick={currentStep === totalSteps ? handleSubmit : nextStep}
                  disabled={isSubmitting}
                  className={styles.nextButton}
                >
                  {isSubmitting
                    ? 'Отправка...'
                    : currentStep === totalSteps
                    ? 'Отправить заявку'
                    : 'Далее'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
