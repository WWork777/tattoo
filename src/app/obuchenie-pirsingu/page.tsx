import HeroObucheniePirsing from "@/components/obuchenie-pirsingu/Hero/HeroObucheniePirsing"
import PrepodPirsing from "@/components/obuchenie-pirsingu/prepod/Prepod"
import ProgrammPirsing from "@/components/obuchenie-pirsingu/program/Program"
import PricePirsing from "@/components/obuchenie-pirsingu/price/Price"

export default function Page() {
    return (
        <>
            <HeroObucheniePirsing/>
            <PrepodPirsing/>
            <ProgrammPirsing/>
            <PricePirsing/>
        </>
    )
}