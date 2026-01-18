import Prepod from '@/components/obuchenie/prepod/Prepod';
import Prepod2 from '@/components/obuchenie/prepod2/prepod2';
import HeroObuchenie from '../../components/obuchenie/Hero/Hero';
import TrialForm from '@/components/obuchenie/trial-form/TrialForm';
import Put from '@/components/obuchenie/put-tatu/Put';
import Program from '@/components/obuchenie/program/Program';
import VideoPlayer from '@/components/obuchenie/VideoPlayer/VideoPlayer';
import Practice from '@/components/obuchenie/practice/Practice';
import Models from '@/components/obuchenie/models/Models';
import Sertificate from '@/components/obuchenie/sertificate/Sertificate';
import Price from '@/components/obuchenie/price/Price';
import Rewievs from '@/components/obuchenie/rewievs/Rewievs';
import { Faq } from '@/components/obuchenie/FAQ/Faq';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headersList = headers();
  const host = (await headersList).get('host'); // Получает текущий домен
  const protocol = 'https'; // Или 'http' если не используете https
  const fullURL = `${protocol}://${host}/obuchenie-tatu`;

  return {
    title: 'Обучение татуировке в Новосибирске | Soprano Tattoo',
    description:
      'Обучение татуировке в Новосибирске: авторские курсы для начинающих и мастеров. Практика на моделях, современное оборудование и помощь в трудоустройстве.',
    keywords:
      'обучение татуировке Новосибирск,курсы тату Новосибирск, обучение тату мастерству, школа тату Новосибирск, курсы татуировки для начинающих, как стать тату мастером, тату обучение с нуля,тату курсы с практикой, обучение татуировке цена, путь тату мастера Новосибирск',
    alternates: {
      canonical: fullURL,
    },
    openGraph: {
      title: `Обучение татуировке в Новосибирске | Soprano Tattoo`,
      description: `Обучение татуировке в Новосибирске: авторские курсы для начинающих и мастеров. Практика на моделях, современное оборудование и помощь в трудоустройстве.`,
      url: fullURL,
      siteName: 'Soprano Tattoo Новосибирск',
      images: [
        {
          url: `/images/hero/hero.jpg`,
          width: 1200,
          height: 630,
          alt: `Примеры работ тату салона Soprano Tattoo Новосибирск`,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Soprano Tattoo | Тату салон в Новосибирске',
      description:
        'Уникальные татуировки от опытных мастеров. Запишитесь на консультацию!',
      images: [`/images/hero/hero.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Page() {
  return (
    <>
      <HeroObuchenie />
      <VideoPlayer src='/video/promo.mp4' poster="/video/promoPreview.png"/>
      <Prepod />
      <Prepod2 />
      <TrialForm />
      <Put />
      <Program />
      
      <Practice />
      <Models />
      <Sertificate />
      <Price />
      <Rewievs />
      <Faq />
      <TrialForm />
    </>
  );
}
