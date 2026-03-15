import css from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import GenreSectionHome from "@/components/GenreSectionHome/GenreSectionHome";


export default function Home() {
  return (
    <div className={css.page}>
        <Hero/>
        <GenreSectionHome/>
      </div>
  );
}
