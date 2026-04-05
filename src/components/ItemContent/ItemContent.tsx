/* eslint-disable @typescript-eslint/no-explicit-any */
import css from "./ItemContent.module.css";
import Icon from "@/components/Icon/Icon";
import { getMovieDetails } from "@/lib/movies";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/lib/movies";
import { getSeriesCredits } from "@/lib/series";
import Image from "next/image";
import { tmdbPosterSrc } from "@/lib/tmdbImage";


interface Props {
  type: "movie" | "series";
  data: any
}

export default function ItemContent({ type, data }: Props) {
  const id = data?.id;

  const { data: creditsData } = useQuery({
    queryKey: [type === "movie" ? "movieCredits" : "seriesCredits", id],
    queryFn: () => type === "movie" ? getMovieCredits(id) : getSeriesCredits(id),
    enabled: !!id,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  const getStarFill = (index: number, rating: number) => {
    const stars = rating / 2;
    if (index < Math.floor(stars)) return "full";
    if (index < stars) return "half";
    return "empty";
  };

  const currentItem = data;

    const releaseYear = type === "movie" 
    ? currentItem.release_date?.slice(0, 4) 
    : currentItem.first_air_date?.slice(0, 4);

  return (
    <div className={css.container}>
      <section className={css.contentSection}>
        <div className={css.details + " " + css.overview}>
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
              {releaseYear || "N/A"}
            </span>
          </div>
          <div className={css.detail}>
            <span className={css.title}>
              <Icon name="lang" width={20} height={20} />
              Language
            </span>
            <div className={css.cont}>
              <span className={css.value}>{currentItem.original_language?.toUpperCase()}</span>
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
              {currentItem.genres?.map((genre: any) => (
                <div key={genre.id} className={css.cont}>
                  <span className={css.value}>{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={css.cast}>
          <span className={css.title}>
            Cast
          </span>
          <div className={css.castGrid}>
            {creditsData?.cast.filter((person: any) => person.known_for_department === "Acting").slice(0, 4).map((person: any) => (
              <div key={person.id} className={css.castCard}>
                {person.profile_path && (
                  <Image
                    src={tmdbPosterSrc(person.profile_path)}
                    alt={person.name}
                    width={100}
                    height={150}
                    className={css.castImage}
                  />
                )}
                <p className={css.castName}>{person.name}</p>
                <p className={css.castCharacter}>{person.character}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={css.reviews}>
          <span className={css.title}>
            Reviews
            </span>
            <div className={css.review}></div>
        </div>
      </section>
    </div>
  );
}
