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

    // Формируем сообщение для Telegram
    const message = `
🎨 *НОВАЯ ЗАЯВКА НА ТАТУИРОВКУ*

*Вопрос 1: У вас есть татуировки?*
${hasTattoos}

*Вопрос 2: На каком месте тату?*
${placement}

*Вопрос 3: Какой размер тату?*
${size}

*Вопрос 4: У вас уже есть эскиз или идея?*
${sketchType}

*Вопрос 6: Какой бюджет планируешь?*
${budget} ₽

*Вопрос 7: Контактная информация*
Имя: ${name}
Телефон: ${phone}
Связь: ${contactMethod}

*Согласие на обработку данных:* ${privacyAccepted === 'true' ? '✅ Да' : '❌ Нет'}

📅 *Дата заявки:* ${new Date().toLocaleString('ru-RU')}
    `.trim()

    // Отправляем текстовое сообщение в Telegram
    let textResponse;
    try {
      textResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );

      textResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_ADMIN_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );


    } catch (fetchError) {
      console.error('Ошибка при вызове Telegram API:', fetchError);
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

    if (!textResponse.ok) {
      let errorData;
      try {
        errorData = await textResponse.json();
      } catch (e) {
        const text = await textResponse.text();
        errorData = { message: text, status: textResponse.status, statusText: textResponse.statusText };
      }
      console.error('Telegram API error:', {
        status: textResponse.status,
        statusText: textResponse.statusText,
        errorData
      });
      return NextResponse.json(
        { 
          error: 'Failed to send message to Telegram', 
          success: false, 
          details: errorData,
          telegramError: true,
          telegramStatus: textResponse.status
        },
        { status: 500 }
      );
    }

    // Если есть файл, отправляем его отдельно
    if (file && file.size > 0) {
      try {
        const buffer = await file.arrayBuffer()
        const blob = new Blob([buffer], { type: file.type })
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`
        
        const formDataForTelegram = new FormData()
        formDataForTelegram.append('chat_id', TELEGRAM_CHAT_ID)
        formDataForTelegram.append('document', blob, file.name)
        formDataForTelegram.append('caption', '📎 Прикрепленный файл от клиента')
        
        const fileResponse = await fetch(url, {
          method: 'POST',
          body: formDataForTelegram,
        })

        if (!fileResponse.ok) {
          const errorData = await fileResponse.json()
          console.error('Telegram file upload error:', errorData)
          // Не прерываем выполнение, т.к. основное сообщение уже отправлено
        }
      } catch (fileError) {
        console.error('Error sending file to Telegram:', fileError)
        // Не прерываем выполнение, т.к. основное сообщение уже отправлено
      }
    }

    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    )

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