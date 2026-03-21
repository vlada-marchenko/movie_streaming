"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../lib/movies";
import { getTrendingSeries } from "../../lib/series";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../components/Icon/Icon";
import { useSwipeable } from "react-swipeable";
import GenreSectionMovies from "@/components/GenreSectionMovies/GenreSectionMovies";
import GenreSectionShows from "@/components/GenreSectionShows/GenreSectionShows";


export default function MoviesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("movies");


  const { data: moviesData } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMovies("week"),
  });

  const { data: tvData } = useQuery({
    queryKey: ["trendingTVShows"],
    queryFn: () => getTrendingSeries("week"),
  });

  const slides = useMemo(() => {
    if (moviesData?.results && tvData?.results) {
      const movies = moviesData.results || [];
      const tvShows = tvData.results || [];

      const allItems = [...movies, ...tvShows];

      // eslint-disable-next-line react-hooks/purity
      const shuffled = allItems.sort(() => Math.random() - 0.5);

      const random = shuffled.slice(0, 4);

      return random;
    }
    return [];
  }, [moviesData, tvData]);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

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
    return <div className={css.loading}>Loading...</div>;
  }

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };


  const currentItem = slides[currentSlide];

  return (
    <div className={css.page}>
    <div className={css.container}>
      <section className={css.hero} {...handlers}>
        <div className={css.bg}>
          <Image
            src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
            alt={currentItem.title || currentItem.name}
            className={css.bgImage}
            fill
          />
          <div className={css.overlay}></div>
        </div>

        <div className={css.content}>
          <h1 className={css.title}>{currentItem.title || currentItem.name}</h1>
          <p className={css.text}>{currentItem.overview}</p>

          <Link href="" className={css.btn}>
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
              >
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
          <div className={css.switch}>
      <button onClick={() => handleTabSwitch('movies')} className={` ${css.btnn} ${activeTab === 'movies' ? css.btnActive : ''}`}>Movies</button>
      <button onClick={() => handleTabSwitch('shows')} className={` ${css.btnn} ${activeTab === 'shows' ? css.btnActive : ''}`}>Shows</button>
    </div>

    {activeTab === 'movies' ? (
      <div className={css.movies}>
        <GenreSectionMovies />
      </div>
    ) : (
      <div className={css.shows}>
        <GenreSectionShows />
      </div>
    )}

    </div>
  );
}
