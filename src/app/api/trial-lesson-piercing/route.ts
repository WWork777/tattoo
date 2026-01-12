import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Извлекаем данные из формы
    const hasPiercingExperience = formData.get('hasPiercingExperience') as string
    const startTime = formData.get('startTime') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const telegram = formData.get('telegram') as string | null
    const privacyAccepted = formData.get('privacyAccepted') as string
    
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
    const formatPhoneForClick = (phoneNumber: string): string => {
      const cleaned = phoneNumber.replace(/[^\d+]/g, '');
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
    const message = `
💎 <b>НОВАЯ ЗАЯВКА НА ПРОБНОЕ ЗАНЯТИЕ ПО ПИРСИНГУ</b>

<b>Вопрос 1: Был ли опыт пирсинга?</b>
${escapeHtml(hasPiercingExperience)}

<b>Вопрос 2: Когда хотел бы начать обучение?</b>
${escapeHtml(startTime)}

<b>Контактная информация:</b>
Имя: ${escapeHtml(name)}
Телефон: ${phoneForClick}${telegram ? `\nTelegram: @${escapeHtml(telegram)}` : ''}

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
        adminMessageSent = true;
      }

    } catch (fetchError) {
      console.error('Ошибка при вызове Telegram API:', fetchError);
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

    // Проверяем успешность отправки
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

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

