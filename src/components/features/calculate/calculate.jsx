'use client'

import { useState } from 'react'
import styles from './calculate.module.scss'

export default function Calculate() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    style: '',
    placement: '',
    size: '',
    sketchType: '',
    budget: '',
    notes: '',
    file: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const styleOptions = [
    'Минимализм', 'Лайнворк', 'Олд скул', 'Нью скул', 'Трайбл',
    'Реализм', 'Акварель', 'Японский', 'Черно-серая', 'Цветная', 'Другое'
  ]

  const placementOptions = ['Рука', 'Нога', 'Спина', 'Торс', 'Другое']
  const sizeOptions = ['до 5 см', 'до 10 см', 'до 15 см', 'от 20 см и более']
  const sketchOptions = [
    'Есть готовый эскиз',
    'Есть пример, нужна доработка',
    'Есть идея, нужен эскиз',
    'Пока нет идей, нужна консультация'
  ]

  const totalSteps = 7

  const validateCurrentStep = () => {
    const newErrors = {}
    
    switch(currentStep) {
      case 1:
        if (!formData.style) newErrors.style = 'Выберите стиль татуировки'
        break
      case 2:
        if (!formData.placement) newErrors.placement = 'Выберите место нанесения'
        break
      case 3:
        if (!formData.size) newErrors.size = 'Выберите размер татуировки'
        break
      case 4:
        if (!formData.sketchType) newErrors.sketchType = 'Выберите вариант'
        break
      case 6:
        if (!formData.budget) newErrors.budget = 'Введите планируемый бюджет'
        else if (isNaN(parseInt(formData.budget)) || parseInt(formData.budget) <= 0) {
          newErrors.budget = 'Введите корректную сумму'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currentStep < totalSteps) {
      nextStep()
      return
    }

    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('style', formData.style)
      formDataToSend.append('placement', formData.placement)
      formDataToSend.append('size', formData.size)
      formDataToSend.append('sketchType', formData.sketchType)
      formDataToSend.append('budget', formData.budget)
      formDataToSend.append('notes', formData.notes)
      
      if (formData.file) {
        formDataToSend.append('file', formData.file)
      }

      const response = await fetch('/api/calculate-tattoo', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 1 из 7</span>
              <h3 className={styles.stepTitle}>Какой стиль татуировки вас интересует?</h3>
              <p className={styles.stepSubtitle}>Выберите наиболее подходящий вариант</p>
            </div>
            
            <div className={styles.radioGrid}>
              {styleOptions.map(style => (
                <label 
                  key={style}
                  className={`${styles.radioLabel} ${formData.style === style ? styles.radioLabelActive : ''}`}
                >
                  <input
                    type="radio"
                    name="style"
                    checked={formData.style === style}
                    onChange={() => handleRadioChange('style', style)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>{style}</span>
                </label>
              ))}
            </div>
            
            {errors.style && <div className={styles.error}>{errors.style}</div>}
          </div>
        )

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 2 из 7</span>
              <h3 className={styles.stepTitle}>На каком месте тату?</h3>
              <p className={styles.stepSubtitle}>Выберите область нанесения</p>
            </div>
            
            <div className={styles.radioGrid}>
              {placementOptions.map(place => (
                <label 
                  key={place}
                  className={`${styles.radioLabel} ${formData.placement === place ? styles.radioLabelActive : ''}`}
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
        )

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 3 из 7</span>
              <h3 className={styles.stepTitle}>Какой размер тату?</h3>
              <p className={styles.stepSubtitle}>Выберите примерный размер</p>
            </div>
            
            <div className={styles.radioGrid}>
              {sizeOptions.map(size => (
                <label 
                  key={size}
                  className={`${styles.radioLabel} ${formData.size === size ? styles.radioLabelActive : ''}`}
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
        )

      case 4:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 4 из 7</span>
              <h3 className={styles.stepTitle}>У вас уже есть эскиз или идея?</h3>
              <p className={styles.stepSubtitle}>Расскажите о готовности эскиза</p>
            </div>
            
            <div className={styles.radioGrid}>
              {sketchOptions.map(option => (
                <label 
                  key={option}
                  className={`${styles.radioLabel} ${formData.sketchType === option ? styles.radioLabelActive : ''}`}
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
        )

      case 5:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 5 из 7</span>
              <h3 className={styles.stepTitle}>Загрузите пример или эскиз</h3>
              <p className={styles.stepSubtitle}>Если есть примеры или готовый эскиз - загрузите файл</p>
            </div>
            
            <div className={styles.fileUpload}>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.jpg,.jpeg,.png,.ai,.psd"
                className={styles.fileInput}
                id="file-upload"
              />
              
              <label htmlFor="file-upload" className={styles.fileLabel}>
                <div className={styles.fileIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className={styles.fileText}>
                  <p>Нажмите для загрузки файла</p>
                  <p className={styles.fileSubtitle}>или перетащите файл сюда</p>
                </div>
                <div className={styles.fileInfo}>
                  <p>Поддерживаемые форматы: JPG, PNG, PDF, AI, PSD</p>
                  <p>Максимальный размер: 10 MB</p>
                </div>
              </label>
              
              {formData.file && (
                <div className={styles.filePreview}>
                  <div className={styles.filePreviewIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className={styles.filePreviewInfo}>
                    <p className={styles.fileName}>{formData.file.name}</p>
                    <p className={styles.fileSize}>
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                    className={styles.fileRemoveButton}
                    title="Удалить файл"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case 6:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 6 из 7</span>
              <h3 className={styles.stepTitle}>Какой бюджет планируете?</h3>
              <p className={styles.stepSubtitle}>Укажите примерный бюджет в рублях</p>
            </div>
            
            <div className={styles.budgetInput}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Например: 15000"
                  inputMode="numeric"
                />
                <span className={styles.currency}>₽</span>
              </div>
              
              {errors.budget && <div className={styles.error}>{errors.budget}</div>}
              
              <div className={styles.budgetNote}>
                <p>💡 Стоимость будет рассчитана мастером индивидуально</p>
                <p>На основе ваших ответов мы подготовим точный расчет</p>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNumber}>Шаг 7 из 7</span>
              <h3 className={styles.stepTitle}>Если есть пожелания по тату, напишите</h3>
              <p className={styles.stepSubtitle}>Опишите ваши идеи, пожелания, особенности</p>
            </div>
            
            <div className={styles.notesArea}>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Например: Хочу совместить несколько символов, важна детализация, предпочитаю темные тона, хочу добавить элемент природы..."
                rows={6}
                maxLength={500}
              />
              
              <div className={styles.charCounter}>
                <span className={styles.charCount}>{formData.notes.length}</span>
                <span className={styles.charMax}>/500 символов</span>
              </div>
              
              <div className={styles.notesTips}>
                <h4>Что можно указать:</h4>
                <ul>
                  <li>Цветовую гамму и стилистику</li>
                  <li>Особые детали и символы</li>
                  <li>Ссылки на примеры или референсы</li>
                  <li>Пожелания по срокам выполнения</li>
                  <li>Любые особые требования</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className={styles.section} id="calculate-cost">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Рассчитать стоимость татуировки</h1>
          <p className={styles.subtitle}>Заполните форму, и наш мастер свяжется с вами для точного расчета</p>
        </div>
        
        <div className={styles.progressBar}>
          <div className={styles.progressTrack}>
            {[...Array(totalSteps)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index + 1)}
                className={`${styles.progressStep} ${currentStep >= index + 1 ? styles.progressStepActive : ''} ${currentStep === index + 1 ? styles.progressStepCurrent : ''}`}
                disabled={submitStatus === 'success' || index + 1 > currentStep}
                type="button"
              >
                <span className={styles.progressStepNumber}>{index + 1}</span>
                <span className={styles.progressStepLabel}>
                  {index === 0 && 'Стиль'}
                  {index === 1 && 'Место'}
                  {index === 2 && 'Размер'}
                  {index === 3 && 'Эскиз'}
                  {index === 4 && 'Файл'}
                  {index === 5 && 'Бюджет'}
                  {index === 6 && 'Пожелания'}
                </span>
              </button>
            ))}
          </div>
          
          <div className={styles.progressLine}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            {submitStatus === 'success' ? (
              <div className={styles.successScreen}>
                <div className={styles.successIcon}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Заявка успешно отправлена!</h3>
                <p className={styles.successMessage}>
                  Спасибо за вашу заявку! Наш мастер свяжется с вами в течение 24 часов 
                  для обсуждения деталей и расчета точной стоимости.
                </p>
                <div className={styles.successInfo}>
                  <h4>Ваша заявка:</h4>
                  <div className={styles.successDetails}>
                    <div className={styles.successDetail}>
                      <span className={styles.detailLabel}>Стиль:</span>
                      <span className={styles.detailValue}>{formData.style}</span>
                    </div>
                    <div className={styles.successDetail}>
                      <span className={styles.detailLabel}>Место:</span>
                      <span className={styles.detailValue}>{formData.placement}</span>
                    </div>
                    <div className={styles.successDetail}>
                      <span className={styles.detailLabel}>Размер:</span>
                      <span className={styles.detailValue}>{formData.size}</span>
                    </div>
                    <div className={styles.successDetail}>
                      <span className={styles.detailLabel}>Эскиз:</span>
                      <span className={styles.detailValue}>{formData.sketchType}</span>
                    </div>
                    <div className={styles.successDetail}>
                      <span className={styles.detailLabel}>Бюджет:</span>
                      <span className={styles.detailValue}>
                        {formData.budget ? `${parseInt(formData.budget).toLocaleString('ru-RU')} ₽` : 'Не указан'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      style: '',
                      placement: '',
                      size: '',
                      sketchType: '',
                      budget: '',
                      notes: '',
                      file: null,
                    })
                    setCurrentStep(1)
                    setSubmitStatus(null)
                  }}
                  className={styles.newRequestButton}
                >
                  Отправить новую заявку
                </button>
              </div>
            ) : submitStatus === 'error' ? (
              <div className={styles.errorScreen}>
                <div className={styles.errorIcon}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className={styles.errorTitle}>Произошла ошибка</h3>
                <p className={styles.errorMessage}>
                  Не удалось отправить заявку. Пожалуйста, попробуйте еще раз 
                  или свяжитесь с нами по телефону для расчета стоимости.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className={styles.retryButton}
                >
                  Попробовать снова
                </button>
              </div>
            ) : (
              <>
                {renderStep()}
                
                <div className={styles.stepNavigation}>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className={styles.prevButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Назад
                    </button>
                  )}
                  
                  <button
                    type={currentStep === totalSteps ? 'submit' : 'button'}
                    onClick={currentStep === totalSteps ? null : nextStep}
                    disabled={isSubmitting}
                    className={`${currentStep === totalSteps ? styles.submitButton : styles.nextButton} ${isSubmitting ? styles.disabled : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        Отправка...
                      </>
                    ) : currentStep === totalSteps ? (
                      'Отправить заявку мастеру'
                    ) : (
                      <>
                        Далее
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
        
        <div className={styles.privacy}>
          <p>
            Нажимая кнопку "Отправить заявку мастеру", вы соглашаетесь с обработкой 
            персональных данных. Стоимость рассчитывается мастером индивидуально 
            после изучения вашей заявки.
          </p>
        </div>
      </div>
    </section>
  )
}