/* eslint-disable @typescript-eslint/no-explicit-any */
import css from "./ItemContent.module.css";
import Icon from "@/components/Icon/Icon";
import { getMovieDetails } from "@/lib/movies";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function ItemContent() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const {
    data: moviesData,
    isLoading,
    error,
  } = useQuery({
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

  const getStarFill = (index: number, rating: number) => {
    const stars = rating / 2;
    if (index < Math.floor(stars)) return "full";
    if (index < stars) return "half";
    return "empty";
  };

  const currentItem = moviesData;

  return (
    <div className={css.container}>
      <section className={css.contentSection}>
        <div className={css.details}>
          <span className={css.title}>Description</span>
          <p className={css.value}>{currentItem.overview}</p>
        </div>
        <div className={css.details}>
          <div className={css.detail}>
            <span className={css.title}>
              <Icon name="date" width={20} height={20} />
              Realeased Year
            </span>
            <span className={css.value}>
              {currentItem.release_date.slice(0, 4)}
            </span>
          </div>
          <div className={css.detail}>
            <span className={css.title}>
              <Icon name="lang" width={20} height={20} />
              Language
            </span>
            <div className={css.cont}>
              <span className={css.value}>{currentItem.original_language}</span>
            </div>
          </div>
          <div className={css.detail}>
            <span className={css.title}>
              <Icon name="star" width={20} height={20} />
              Rating
            </span>
            <div className={css.cont}>
              <span className={css.value}>
                <div className={css.stars}>
                  {[...Array(5)].map((_, i) => {
                    const fillType = getStarFill(i, currentItem.vote_average);
                    return (
                      <span key={i} className={css.starWrapper}>
                        <Icon
                          name="star"
                          width={14}
                          height={14}
                          className={css.starEmpty}
                        />
                        {fillType !== "empty" && (
                          <Icon
                            name="star"
                            width={14}
                            height={14}
                            className={
                              fillType === "half" ? css.starHalf : css.starFull
                            }
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
              </span>
            </div>
          </div>
          <div className={css.detail}>
            <span className={css.title}>
              <Icon name="genres" width={20} height={20} />
              Genres
            </span>
            <div className={css.genres}>
              {currentItem.genres.map((genre: any) => (
                <div key={genre.id} className={css.cont}>
                  <span className={css.value}>{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
