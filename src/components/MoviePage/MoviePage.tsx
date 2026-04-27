import css from "./MoviePage.module.css";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { tmdbBackdropSrc } from "@/lib/tmdbImage";
import ItemContent from "@/components/ItemContent/ItemContent";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function MoviePage({ data }: Props) {
  const currentItem = data;

  return (
    <div className={css.container}>
      <section className={css.hero}>
        <div className={css.bg}>
          <Image
            src={tmdbBackdropSrc(
              currentItem.backdrop_path,
              currentItem.poster_path,
            )}
            alt={currentItem.title}
            className={css.bgImage}
            width={375}
            height={468}
            priority
            fetchPriority="high"
          />
          <div className={css.overlay}></div>
        </div>

        <div className={css.content}>
          <h1 className={css.title}>{currentItem.title}</h1>

          <button className={css.btn}>
            <Icon name="now" width={24} height={24} />
            Play Now
          </button>
        </div>
      </section>
      <ItemContent type="movie" data={currentItem} />
    </div>
  );
}
