import Prepod from "@/components/obuchenie/prepod/Prepod";
import HeroObuchenie from "../../components/obuchenie/Hero/Hero";
import Put from "@/components/obuchenie/put-tatu/Put";
import Program from "@/components/obuchenie/program/Program";
import Practice from "@/components/obuchenie/practice/Practice";
import Models from "@/components/obuchenie/models/Models";
import Sertificate from "@/components/obuchenie/sertificate/Sertificate";
import Price from "@/components/obuchenie/price/Price";
import Rewievs from "@/components/obuchenie/rewievs/Rewievs";
import { Faq } from "@/components/obuchenie/FAQ/Faq";

export default function Page() {
  return (
    <>
      <HeroObuchenie />
      <Prepod />
      <Put />
      <Program />
      <Practice />
      <Models />
      <Sertificate />
      <Price />
      <Rewievs />
      <Faq />
    </>
  );
}
