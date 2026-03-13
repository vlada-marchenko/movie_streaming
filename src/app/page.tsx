import css from "./page.module.css";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <div className={css.page}>
      <div className={css.content}>
        <Hero/>
      </div>
    </div>
  );
}
