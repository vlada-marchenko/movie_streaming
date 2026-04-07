/* eslint-disable @typescript-eslint/no-explicit-any */
import css from "./ItemContent.module.css";
import Icon from "@/components/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/lib/movies";
import { getSeriesCredits } from "@/lib/series";
import Image from "next/image";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import { useEffect, useState } from "react";
import { getMovieReviews } from "@/lib/movies";
import { getSeriesReviews } from "@/lib/series";

interface Props {
  type: "movie" | "series";
  data: any;
}

export default function ItemContent({ type, data }: Props) {
  const id = data?.id;
  const [castPage, setCastPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 4;
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});

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

  const toggleReview = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reviews = reviewsData?.results || [];
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1440) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1920) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
      setCastPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const releaseYear =
    type === "movie"
      ? currentItem.release_date?.slice(0, 4)
      : currentItem.first_air_date?.slice(0, 4);

  const actors =
    creditsData?.cast.filter(
      (person: any) =>
        person.known_for_department === "Acting" &&
        person.profile_path !== null,
    ) || [];
  const totalPages = Math.ceil(actors.length / itemsPerPage);
  const displayedActors = actors.slice(
    (castPage - 1) * itemsPerPage,
    castPage * itemsPerPage,
  );

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
      </div>
      <div className={css.cast}>
        <div className={css.castHeader}>
          <span className={css.title}>Cast</span>
          <div className={css.pagination}>
            <button
              className={css.paginationBtn}
              onClick={() => setCastPage((prev) => prev - 1)}
              disabled={castPage === 1}
              aria-label="Previous cast page"
            >
              <Icon name="left" width={22} height={22} />
            </button>
            <button
              className={css.paginationBtn}
              onClick={() => setCastPage((prev) => prev + 1)}
              disabled={castPage === totalPages}
              aria-label="Next cast page"
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
          {/* Використовуємо той самий клас для стилю */}
          <span className={css.title}>Reviews</span>
          <div className={css.pagination}>
            <button
              className={css.paginationBtn}
              onClick={() => setReviewPage((prev) => prev - 1)}
              disabled={reviewPage === 1}
            >
              <Icon name="left" width={22} height={22} />
            </button>
            <button
              className={css.paginationBtn}
              onClick={() => setReviewPage((prev) => prev + 1)}
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
