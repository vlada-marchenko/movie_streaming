"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../lib/movies";
import { getTrendingSeries } from "../../lib/series";
import { useMemo } from "react";
import { useEffect } from "react";
import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../components/Icon/Icon";
import { useSwipeable } from "react-swipeable";
import GenreSectionMovies from "@/components/GenreSectionMovies/GenreSectionMovies";
import GenreSectionShows from "@/components/GenreSectionShows/GenreSectionShows";
import Trending from "@/components/Trending/Trending";
import { tmdbBackdropSrc } from "@/lib/tmdbImage";
import Releases from "@/components/Releases/Releases";
import { useUiStore } from "@/store/uiStore";
import MustWatch from "@/components/MustWatch/MustWatch";

export default function MoviesPage() {
  const currentSlide = useUiStore((state) => state.movieCurrentSlide);
  const setCurrentSlide = useUiStore((state) => state.setMovieCurrentSlide);
  const activeTab = useUiStore((state) => state.movieActiveTab);
  const setActiveTab = useUiStore((state) => state.setMovieActiveTab);

  const { data: moviesData } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMovies("week"),
    staleTime: 1000 * 60 * 60,
  });

  const { data: tvData } = useQuery({
    queryKey: ["trendingTVShows"],
    queryFn: () => getTrendingSeries("week"),
    staleTime: 1000 * 60 * 60,
  });

  const slides = useMemo(() => {
    if (moviesData?.results && tvData?.results) {
      return [...moviesData.results.slice(0, 2), ...tvData.results.slice(0, 2)];
    }
    return [];
  }, [moviesData, tvData]);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [setCurrentSlide, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, setCurrentSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrev(),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

if (slides.length === 0) {
    return (
      <div className={css.page}>
         <div className={css.heroPlaceholder} style={{ height: '70vh', background: '#111' }} />
         <div className={css.loadingText}>Loading your entertainment...</div>
      </div>
    );
  }

  const handleTabSwitch = (tab: "movies" | "shows") => {
    setActiveTab(tab);
  };

  const currentItem = slides[currentSlide];
  if (!currentItem) return null;
  const itemType = currentItem.title ? "movies" : "series";

  return (
    <div className={css.page}>
      <div className={css.container}>
        <section className={css.hero} {...handlers}>
          <div className={css.bg}>
            <Image
              src={tmdbBackdropSrc(
                currentItem.backdrop_path,
                currentItem.poster_path,
              )}
              alt={currentItem.title || currentItem.name}
              className={css.bgImage}
              fill
              priority
              fetchPriority="high"
              loading="eager"
              sizes="100vw"
            />
            <div className={css.overlay}></div>
          </div>

          <div className={css.content}>
            <h1 className={css.title}>
              {currentItem.title || currentItem.name}
            </h1>
            <p className={css.text}>{currentItem.overview}</p>

            <Link
              href={`/movies/${currentItem.id}?type=${itemType}`}
              className={css.btn}
            >
              <Icon name="now" width={24} height={24} />
              Play Now
            </Link>

            <button
              className={css.arrowLeft}
              onClick={goToPrev}
              aria-label="Previous slide"
            >
              <Icon name="left" width={30} height={30} />
            </button>
            <button
              className={css.arrowRight}
              onClick={goToNext}
              aria-label="Next slide"
            >
              <Icon name="right" width={22} height={22} />
            </button>

            <div className={css.pag}>
              {slides.map((_, i) => (
                <button
                  className={`${css.dot} ${i === currentSlide ? css.dotActive : ""}`}
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className={css.switch}>
        <button
          onClick={() => handleTabSwitch("movies")}
          className={` ${css.btnn} ${activeTab === "movies" ? css.btnActive : ""}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabSwitch("shows")}
          className={` ${css.btnn} ${activeTab === "shows" ? css.btnActive : ""}`}
        >
          Shows
        </button>
      </div>

      {activeTab === "movies" ? (
        <div className={css.movies}>
          <GenreSectionMovies />
          <Trending type="movies" />
          <Releases type="movies" />
          <MustWatch type="movies" />
        </div>
      ) : (
        <div className={css.shows}>
          <GenreSectionShows />
          <Trending type="series" />
          <Releases type="series" />
          <MustWatch type="series" />
        </div>
      )}
    </div>
  );
}
