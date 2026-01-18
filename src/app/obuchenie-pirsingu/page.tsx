import HeroObucheniePirsing from "@/components/obuchenie-pirsingu/Hero/HeroObucheniePirsing"
import PrepodPirsing from "@/components/obuchenie-pirsingu/prepod/Prepod"
import TrialForm from "@/components/obuchenie-pirsingu/trial-form/TrialForm"
import ProgrammPirsing from "@/components/obuchenie-pirsingu/program/Program"
import StudentWorks from "@/components/obuchenie-pirsingu/StudentsWorks/StudentWorks"
import PricePirsing from "@/components/obuchenie-pirsingu/price/Price"
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = headers();
  const host = (await headersList).get("host"); // Получает текущий домен
  const protocol = "https"; // Или 'http' если не используете https
  const fullURL = `${protocol}://${host}/obuchenie-tatu`;

    return {
        title: "Обучение пирсингу в Новосибирске | Soprano Tattoo",
        description:
        "Обучение пирсингу в Новосибирске: профессиональные курсы для начинающих и мастеров. Практика на моделях, стерильное оборудование и поддержка после обучения.",
        keywords:
        "обучение пирсингу Новосибирск, курсы пирсинга Новосибирск, школа пирсинга, обучение пирсингу с нуля, курсы пирсера, как стать пирсером, обучение пирсингу цена, курсы пирсинга с практикой, обучение пирсингу у мастера, пирсинг обучение Новосибирск",
        alternates: {
        canonical: fullURL,
        },
        openGraph: {
        title: "Обучение пирсингу в Новосибирске | Soprano Tattoo",
        description:
            "Обучение пирсингу в Новосибирске: профессиональные курсы для начинающих и мастеров. Практика на моделях, стерильное оборудование и поддержка после обучения.",
        url: fullURL,
        siteName: "Soprano Tattoo Новосибирск",
        images: [
            {
            url: `/images/hero/hero.jpg`,
            width: 1200,
            height: 630,
            alt: "Обучение пирсингу в студии Soprano Tattoo Новосибирск",
            },
        ],
        locale: "ru_RU",
        type: "website",
        },
        twitter: {
        card: "summary_large_image",
        title: "Обучение пирсингу в Новосибирске | Soprano Tattoo",
        description:
            "Профессиональное обучение пирсингу с практикой на моделях. Начни карьеру пирсера в Soprano Tattoo.",
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
    }
}

export default function Page() {
    return (
        <>
            <HeroObucheniePirsing/>
            <PrepodPirsing/>
            <TrialForm/>
            {/* <ProgrammPirsing/> */}
            <StudentWorks/>
            <PricePirsing/>
        </>
    )
}