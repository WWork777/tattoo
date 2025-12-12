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
    const notes = formData.get('notes') as string
    const privacyAccepted = formData.get('privacyAccepted') as string
    
    // Получаем файл, если он есть
    const file = formData.get('file') as File | null
    
    // Получаем данные Telegram из переменных окружения
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { error: 'Telegram bot not configured' },
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

*Вопрос 7: Если есть пожелания по тату:*
${notes || 'Не указано'}

*Согласие на обработку данных:* ${privacyAccepted === 'true' ? '✅ Да' : '❌ Нет'}

📅 *Дата заявки:* ${new Date().toLocaleString('ru-RU')}
    `.trim()

    // Отправляем текстовое сообщение в Telegram
    const textResponse = await fetch(
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
    )

    if (!textResponse.ok) {
      const errorData = await textResponse.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      )
    }

    // Если есть файл, отправляем его отдельно
    if (file && file.size > 0) {
      const buffer = await file.arrayBuffer()
      const blob = new Blob([buffer], { type: file.type })
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`
      
      const formDataForTelegram = new FormData()
      formDataForTelegram.append('chat_id', TELEGRAM_CHAT_ID)
      formDataForTelegram.append('document', blob, file.name)
      formDataForTelegram.append('caption', '📎 Прикрепленный файл от клиента')
      
      await fetch(url, {
        method: 'POST',
        body: formDataForTelegram,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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