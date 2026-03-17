import css from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import GenreSectionHome from "@/components/GenreSectionHome/GenreSectionHome";
import Devices from "@/components/Devices/Devices";
import FAQ from "@/components/FAQ/FAQ";

export default function Home() {
  return (
    <div className={css.page}>
        <Hero/>
        <GenreSectionHome/>
        <Devices/>
        <FAQ/>
      </div>
  );
}
