import css from "./MoviePage.module.css";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { getMovieDetails } from "@/lib/movies";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { tmdbBackdropSrc } from "@/lib/tmdbImage";
import ItemContent from "@/components/ItemContent/ItemContent";

export default function MoviePage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { data: moviesData, isLoading, error} = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => id && getMovieDetails(id),
    enabled: !!id,
  });

    if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movie details</div>;
  }

  if (!moviesData) {
    return <div>No movie found</div>;
  }

  const currentItem = moviesData;

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
            fill
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
     <ItemContent />
    </div>
  );
}
