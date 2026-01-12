import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Извлекаем данные из формы
    const hasTattoos = formData.get('hasTattoos') as string
    const placement = formData.get('placement') as string
    const size = formData.get('size') as string
    const sketchType = formData.get('sketchType') as string
    const budget = formData.get('budget') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const contactMethod = formData.get('contactMethod') as string
    const telegram = formData.get('telegram') as string | null
    // const notes = formData.get('notes') as string
    const privacyAccepted = formData.get('privacyAccepted') as string
    
    // Получаем файл, если он есть
    const file = formData.get('file') as File | null
    
    // Получаем данные Telegram из переменных окружения
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
    const TELEGRAM_ADMIN_ID = process.env.TELEGRAM_ADMIN_ID
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { 
          error: 'Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local', 
          success: false,
          code: 'TELEGRAM_NOT_CONFIGURED'
        },
        { status: 500 }
      )
    }

    // Функция для преобразования номера телефона в международный формат
    // Telegram автоматически распознает номера в формате +7XXXXXXXXXX и делает их кликабельными
    const formatPhoneForClick = (phoneNumber: string): string => {
      // Убираем все кроме цифр и знака +
      const cleaned = phoneNumber.replace(/[^\d+]/g, '');
      // Если номер начинается с +7, оставляем как есть, иначе добавляем +7
      if (cleaned.startsWith('+7')) {
        return cleaned;
      } else if (cleaned.startsWith('7')) {
        return '+' + cleaned;
      } else if (cleaned.startsWith('8')) {
        return '+7' + cleaned.substring(1);
      } else {
        return '+7' + cleaned;
      }
    };

    const phoneForClick = formatPhoneForClick(phone);

    // Экранируем специальные символы для HTML
    const escapeHtml = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    // Формируем сообщение для Telegram в HTML формате
    // Показываем номер в читаемом формате, но также добавляем его в международном формате
    // Telegram автоматически распознает номер в формате +7XXXXXXXXXX и делает его кликабельным
    const message = `
🎨 <b>НОВАЯ ЗАЯВКА НА ТАТУИРОВКУ</b>

<b>Вопрос 1: У вас есть татуировки?</b>
${escapeHtml(hasTattoos)}

<b>Вопрос 2: На каком месте тату?</b>
${escapeHtml(placement)}

<b>Вопрос 3: Какой размер тату?</b>
${escapeHtml(size)}

<b>Вопрос 4: У вас уже есть эскиз или идея?</b>
${escapeHtml(sketchType)}

<b>Вопрос 6: Какой бюджет планируешь?</b>
${escapeHtml(budget)} ₽

<b>Вопрос 7: Контактная информация</b>
Имя: ${escapeHtml(name)}
Телефон: ${phoneForClick}
Связь: ${escapeHtml(contactMethod)}${telegram ? `\nTelegram: ${escapeHtml(telegram)}` : ''}

<b>Согласие на обработку данных:</b> ${privacyAccepted === 'true' ? '✅ Да' : '❌ Нет'}

📅 <b>Дата заявки:</b> ${escapeHtml(new Date().toLocaleString('ru-RU'))}
    `.trim()

    // Отправляем текстовое сообщение в Telegram в оба чата
    let mainMessageSent = false;
    let adminMessageSent = false;
    
    try {
      // Отправляем основное сообщение в основной чат (групповой)
      const mainResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      );

      if (mainResponse.ok) {
        mainMessageSent = true;
      } else {
        const errorData = await mainResponse.json().catch(() => ({}));
        console.error('Ошибка отправки основного сообщения в Telegram:', {
          status: mainResponse.status,
          errorData
        });
      }

      // Отправляем копию на личный аккаунт админа (обязательно, если указан)
      if (TELEGRAM_ADMIN_ID) {
        try {
          const adminResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                chat_id: TELEGRAM_ADMIN_ID,
                text: message,
                parse_mode: 'HTML',
              }),
            }
          );
          
          if (adminResponse.ok) {
            adminMessageSent = true;
          } else {
            const errorData = await adminResponse.json().catch(() => ({}));
            console.error('Ошибка отправки сообщения админу:', {
              status: adminResponse.status,
              errorData
            });
          }
        } catch (adminError) {
          console.error('Ошибка при отправке сообщения админу:', adminError);
        }
      } else {
        // Если TELEGRAM_ADMIN_ID не указан, считаем что админское сообщение "отправлено"
        adminMessageSent = true;
      }

    } catch (fetchError) {
      console.error('Ошибка при вызове Telegram API:', fetchError);
      // Если основное сообщение не отправилось, возвращаем ошибку
      if (!mainMessageSent) {
        return NextResponse.json(
          { 
            error: 'Network error when sending to Telegram', 
            success: false, 
            details: fetchError instanceof Error ? fetchError.message : 'Unknown fetch error',
            telegramError: true
          },
          { status: 500 }
        );
      }
    }

    // Проверяем успешность отправки: основное сообщение обязательно, админское - если указан
    const requiredMessagesSent = mainMessageSent && (TELEGRAM_ADMIN_ID ? adminMessageSent : true);
    
    if (!requiredMessagesSent) {
      return NextResponse.json(
        { 
          error: 'Failed to send message to Telegram', 
          success: false, 
          telegramError: true,
          details: {
            mainChat: mainMessageSent,
            adminChat: adminMessageSent
          }
        },
        { status: 500 }
      );
    }

    // Возвращаем успешный ответ сразу, не дожидаясь отправки файла
    // Отправку файла делаем асинхронно, чтобы не блокировать ответ клиенту
    const response = NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    )

    // Если есть файл, отправляем его асинхронно (не блокируя ответ)
    if (file && file.size > 0) {
      // Запускаем отправку файла асинхронно, не дожидаясь завершения
      ;(async () => {
        try {
          // Проверяем размер файла (Telegram ограничение: 50MB для документов)
          const maxFileSize = 50 * 1024 * 1024; // 50MB
          if (file.size > maxFileSize) {
            console.warn(`Файл слишком большой (${(file.size / 1024 / 1024).toFixed(2)}MB), максимальный размер 50MB`);
            return;
          }

          const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`
          
          // Читаем файл один раз
          const buffer = await file.arrayBuffer()
          const blob = new Blob([buffer], { type: file.type })
          
          // Функция для отправки файла в чат с таймаутом
          const sendFileToChat = async (chatId: string, chatName: string, fileBlob: Blob) => {
            try {
              const formData = new FormData()
              formData.append('chat_id', chatId)
              formData.append('document', fileBlob, file.name)
              formData.append('caption', '📎 Прикрепленный файл от клиента')
              
              // Создаем AbortController для таймаута (20 секунд)
              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 20000)
              
              try {
                const fetchResponse = await fetch(url, {
                  method: 'POST',
                  body: formData,
                  signal: controller.signal,
                })
                
                clearTimeout(timeoutId)

                if (!fetchResponse.ok) {
                  const errorText = await fetchResponse.text().catch(() => 'Unknown error')
                  console.error(`Ошибка отправки файла в ${chatName}:`, {
                    status: fetchResponse.status,
                    statusText: fetchResponse.statusText,
                    error: errorText
                  })
                }
              } catch (fetchError: any) {
                clearTimeout(timeoutId)
                if (fetchError.name === 'AbortError') {
                  console.error(`Таймаут при отправке файла в ${chatName}`)
                } else {
                  throw fetchError
                }
              }
            } catch (error) {
              console.error(`Ошибка при отправке файла в ${chatName}:`, error)
            }
          }
          
          // Отправляем файл в основной чат
          await sendFileToChat(TELEGRAM_CHAT_ID, 'основной чат', blob)

          // Отправляем файл админу (если указан) - создаем новый blob из того же buffer
          if (TELEGRAM_ADMIN_ID) {
            // Создаем новый blob для второго запроса из того же buffer
            const blobForAdmin = new Blob([buffer], { type: file.type })
            // Добавляем небольшую задержку между запросами
            await new Promise(resolve => setTimeout(resolve, 500))
            await sendFileToChat(TELEGRAM_ADMIN_ID, 'личный чат админа', blobForAdmin)
          }
        } catch (fileError) {
          console.error('Ошибка обработки файла:', fileError)
          // Файл - это дополнительная информация, основная заявка уже получена
        }
      })()
    }

    return response

  } catch (error) {
    console.error('Error processing form:', error)
    return NextResponse.json(
      { error: 'Internal server error', success: false, details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}