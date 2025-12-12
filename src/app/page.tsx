import Hero from "@/components/features/Hero/Hero";
import "./globals.scss";
import Whous from "@/components/features/whous/Whous";
import { Special } from "@/components/features/stecial/Special";
import Masters from "@/components/features/masters/Masters";
import { Portfolio } from "@/components/features/portfolio/Portfolio";
import { Leaders } from "@/components/features/leaders/Leaders";
import { Reviews } from "@/components/features/otzivi/Reviews";
import { Form } from "@/components/features/form/Form";
import { Foq } from "@/components/features/faq/Faq";
import { Map } from "@/components/features/map/Map";
import { headers } from "next/headers";
import { Services } from "@/components/features/services/Services";
import TattooCalculator from "@/components/features/calculate/calculate";

export async function generateMetadata() {
  const headersList = headers();
  const host = (await headersList).get("host"); // Получает текущий домен
  const protocol = "https"; // Или 'http' если не используете https
  const fullURL = `${protocol}://${host}`;

  return {
    title: "Тату Новосибирск | Soprano Tattoo",
    description:
      "Профессиональное тату в Новосибирске. Индивидуальный дизайн, работа по предварительному эскизу. Опытные мастера, качественные материалы. Запишитесь на консультацию!",
    keywords:
      "тату Новосибирск, тату салон, индивидуальный эскиз, татуировка, пирсинг Новосибирск, мастер тату, студия тату Новосибирск, большие татуировки, мини тату",
    alternates: {
      canonical: fullURL,
    },
    openGraph: {
      title: `Soprano Tattoo | Тату салон в Новосибирске`,
      description: `Создайте уникальную татуировку с мастерами Soprano Tattoo. Индивидуальный подход, качественные материалы, комфортная атмосфера в центре Новосибирска.`,
      url: fullURL,
      siteName: "Soprano Tattoo Новосибирск",
      images: [
        {
          url: `/images/hero/hero.jpg`,
          width: 1200,
          height: 630,
          alt: `Примеры работ тату салона Soprano Tattoo Новосибирск`,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Soprano Tattoo | Тату салон в Новосибирске",
      description:
        "Уникальные татуировки от опытных мастеров. Запишитесь на консультацию!",
      images: [`/images/hero/hero.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TattooCalculator />
      <Whous />
      <Special />
      <Services />
      <Masters />
      <Portfolio />
      <Leaders />
      <Reviews />
      <Form />
      <Foq />
      <Map />
    </main>
  );
}
