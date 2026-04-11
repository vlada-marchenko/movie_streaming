/* eslint-disable @typescript-eslint/no-explicit-any */
import css from "./ItemContent.module.css";
import Icon from "@/components/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/lib/movies";
import { getSeriesCredits } from "@/lib/series";
import Image from "next/image";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import { useEffect } from "react";
import { getMovieReviews } from "@/lib/movies";
import { getSeriesReviews } from "@/lib/series";
import { useUiStore } from "@/store/uiStore";
import { getSeasonDetails } from "@/lib/series";

interface Props {
  type: "movie" | "series";
  data: any;
}

export default function ItemContent({ type, data }: Props) {
  const id = data?.id;

  const {
    paginations,
    setPaginationState,
    expandedReviews,
    setExpandedReview,
    selectedSeasons,
    setSelectedSeasons,
  } = useUiStore();

  const castPage = paginations[`cast-${id}`]?.page || 1;
  const reviewPage = paginations[`reviews-${id}`]?.page || 1;
  const itemsPerPage = paginations[`cast-${id}`]?.items || 4;
  const reviewsPerPage = 4;

  const selectedSeason = selectedSeasons[`series-${id}`] || 1;

  const { data: reviewsData } = useQuery({
    queryKey: [type === "movie" ? "movieReviews" : "seriesReviews", id],
    queryFn: () =>
      type === "movie" ? getMovieReviews(id) : getSeriesReviews(id),
    enabled: !!id,
  });

  const { data: creditsData } = useQuery({
    queryKey: [type === "movie" ? "movieCredits" : "seriesCredits", id],
    queryFn: () =>
      type === "movie" ? getMovieCredits(id) : getSeriesCredits(id),
    enabled: !!id,
  });

  const { data: seasonsData } = useQuery({
    queryKey: ["seasonsData", selectedSeason, id],
    queryFn: () => getSeasonDetails(selectedSeason, id),
    enabled: type === "series" && !!id,
  });

  // const { data: episodeData } = useQuery({
  //   queryKey: ['episodeData', season_number, episode_number, id],
  //   queryFn: () => getEpisodeDetails(season_number, episode_number, id),
  //   enabled: type === "series" && !!id,
  // });

  const toggleReview = (reviewId: string) => {
    setExpandedReview(reviewId, !expandedReviews[reviewId]);
  };

  useEffect(() => {
    const handleResize = () => {
      let items = 4;
      if (window.innerWidth >= 1920) items = 8;
      else if (window.innerWidth >= 1440) items = 6;
      else if (window.innerWidth >= 768) items = 6;

      setPaginationState(`cast-${id}`, { items });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id, setPaginationState]);

  const getStarFill = (index: number, rating: number) => {
    const stars = rating / 2;
    if (index < Math.floor(stars)) return "full";
    if (index < stars) return "half";
    return "empty";
  };

  const director = creditsData?.crew?.find(
    (person: any) => person.job === "Director",
  );

  const actors =
    creditsData?.cast.filter(
      (p: any) =>
        p.known_for_department === "Acting" && p.profile_path !== null,
    ) || [];
  const totalCastPages = Math.ceil(actors.length / itemsPerPage);
  const displayedActors = actors.slice(
    (castPage - 1) * itemsPerPage,
    castPage * itemsPerPage,
  );

  const reviews = reviewsData?.results || [];
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage,
  );

  const handleCastPageChange = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? castPage + 1 : castPage - 1;
    setPaginationState(`cast-${id}`, { page: newPage });
  };

  const handleReviewPageChange = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? reviewPage + 1 : reviewPage - 1;
    setPaginationState(`reviews-${id}`, { page: newPage });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const currentItem = data;

  const releaseYear =
    type === "movie"
      ? currentItem.release_date?.slice(0, 4)
      : currentItem.first_air_date?.slice(0, 4);

  const seasons = type === "series" ? currentItem.seasons.slice(1) || [] : [];

  return (
    <section className={css.contentSection}>
      <div className={css.description + " " + css.overview}>
        <span className={css.title}>Description</span>
        <p className={css.value}>{currentItem.overview}</p>
      </div>
      <div className={css.details}>
        <div className={css.detail}>
          <span className={css.title}>
            <Icon name="date" width={20} height={20} />
            Realeased Year
          </span>
          <span className={css.value}>{releaseYear || "N/A"}</span>
        </div>
        <div className={css.detail}>
          <span className={css.title}>
            <Icon name="lang" width={20} height={20} />
            Language
          </span>
          <div className={css.cont}>
            <span className={css.value}>
              {currentItem.original_language?.toUpperCase()}
            </span>
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
        {director && (
          <div className={css.detail}>
            <span className={css.title}>Director</span>
            <div className={css.directorCard}>
              {director.profile_path && (
                <Image
                  src={tmdbPosterSrc(director.profile_path)}
                  alt={director.name}
                  width={55}
                  height={60}
                  className={css.directorImage}
                />
              )}
              <div className={css.directorInfo}>
                <p className={css.value}>{director.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {type === "series" && seasons.length > 0 && (
        <div className={css.seriesDetails}>
          <h3 className={css.seriesDetailTitle}>Seasons and Episodes</h3>
          <div className={css.seasonsSelector}>
            {seasons.map((season: any) => (
              <button
                key={season.id}
                className={`${css.seasonBtn} ${selectedSeason === season.season_number ? css.active : ""}`}
                onClick={() =>
                  setSelectedSeasons(`series-${id}`, season.season_number)
                }
              >
                <div className={css.seasonInfo}>
                <span className={css.season}>Season {season.season_number}</span>
                <span className={css.quantity}>{season.episode_count} episodes</span>
                </div>
                <div className={css.seasonBtnContent}>
                  <Icon name=""/>
                </div>
              </button>
            ))}
          </div>
          {seasonsData && (
            <div className={css.episodesList}>
              {seasonsData.episodes?.map((episode: any) => (
                <div key={episode.id} className={css.episodeCard}>
                  <span className={css.episodeNumber}>
                    {episode.episode_number}
                  </span>
                  {episode.still_path && (
                    <Image
                      src={tmdbPosterSrc(episode.still_path)}
                      alt={episode.name}
                      width={120}
                      height={70}
                      className={css.episodeImage}
                    />
                  )}
                  <div className={css.episodeInfo}>
                    <p className={css.episodeName}>{episode.name}</p>
                    <p className={css.episodeDescr}>{episode.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={css.cast}>
        <div className={css.castHeader}>
          <span className={css.title}>Cast</span>
          <div className={css.pagination}>
            <button
              className={css.paginationBtn}
              onClick={() => handleCastPageChange("prev")}
              disabled={castPage === 1}
            >
              <Icon name="left" width={22} height={22} />
            </button>
            <button
              className={css.paginationBtn}
              onClick={() => handleCastPageChange("next")}
              disabled={castPage === totalCastPages}
            >
              <Icon name="right" width={18} height={18} />
            </button>
          </div>
        </div>
        <div className={css.castGrid}>
          {displayedActors.map((person: any) => (
            <div key={person.id} className={css.castCard}>
              {person.profile_path && (
                <Image
                  src={tmdbPosterSrc(person.profile_path)}
                  alt={person.name}
                  width={70}
                  height={75}
                  className={css.castImage}
                />
              )}
              {/* <p className={css.castName}>{person.name}</p> */}
            </div>
          ))}
        </div>
      </div>
      <div className={css.reviews}>
        <div className={css.castHeader}>
          {" "}
          <span className={css.title}>Reviews</span>
          <div className={css.pagination}>
            <button
              className={css.paginationBtn}
              onClick={() => handleReviewPageChange("prev")}
              disabled={reviewPage === 1}
            >
              <Icon name="left" width={22} height={22} />
            </button>
            <button
              className={css.paginationBtn}
              onClick={() => handleReviewPageChange("next")}
              disabled={reviewPage === totalReviewPages}
            >
              <Icon name="right" width={18} height={18} />
            </button>
          </div>
        </div>

        <div className={css.reviewsList}>
          {displayedReviews.map((review: any) => {
            const isExpanded = expandedReviews[review.id];
            const shouldTruncate = review.content.length > 250;
            const displayContent = isExpanded
              ? review.content
              : review.content.slice(0, 250) + (shouldTruncate ? "..." : "");

            return (
              <div key={review.id} className={css.reviewCard}>
                <div className={css.header}>
                  <div className={css.info}>
                    <p className={css.name}>
                      {review.author_details.name ||
                        review.author_details.username}
                    </p>
                    <p className={css.reviewDate}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {review.author_details.rating && (
                    <div className={css.cont}>
                      <div className={css.stars}>
                        {[...Array(5)].map((_, i) => {
                          const fillType = getStarFill(
                            i,
                            review.author_details.rating,
                          );
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
                                    fillType === "half"
                                      ? css.starHalf
                                      : css.starFull
                                  }
                                />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className={css.reviewBody}>
                  <p className={css.reviewContent}>{displayContent} </p>

                  {shouldTruncate && (
                    <div className={css.readMoreWrapper}>
                      <button
                        className={css.readMoreBtn}
                        onClick={() => toggleReview(review.id)}
                      >
                        {isExpanded ? " Show Less" : " Read More"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
