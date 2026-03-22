/* eslint-disable react-hooks/purity */
"use client";

import { getPopularMovies } from "../../lib/movies";
import { getPopularSeries } from "../../lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Hero.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import Icon from "../Icon/Icon";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function Hero() {
  const [gridSize, setGridSize] = useState(36);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        setGridSize(9);
      } else if (window.innerWidth < 768) {
        setGridSize(16);
      } else if (window.innerWidth < 1440) {
        setGridSize(30);
      } else if (window.innerWidth < 1920) {
        setGridSize(36);
      } else {
        setGridSize(48);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: moviesData } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([
        getPopularMovies(1),
        getPopularMovies(2),
      ]);
      return {
        results: [...(page1?.results || []), ...(page2?.results || [])],
      };
    },
  });

  const { data: tvData } = useQuery({
    queryKey: ["popularTVShows"],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([
        getPopularSeries(1),
        getPopularSeries(2),
      ]);
      return {
        results: [...(page1?.results || []), ...(page2?.results || [])],
      };
    },
  });

  const movies = moviesData?.results || [];
  const tvShows = tvData?.results || [];

  const allContent = [...movies, ...tvShows].filter((item) => item.poster_path);

  const shuffled = allContent.sort(() => Math.random() - 0.5);

  const gridContent = shuffled.slice(0, gridSize);

  return (
    <section className={css.page}>
      <div className={css.grid}>
        {gridContent.map((item, index) => (
          <div key={`${item.id}-${index}`} className={css.poster}>
            <Image
              src={tmdbPosterSrc(item.poster_path)}
              alt={item.title || item.name}
              className={css.image}
              width={143}
              height={143}
              unoptimized
              loading="eager"
            />
          </div>
        ))}
        <div className={css.gradientTop}></div>
        <div className={css.gradientBottom}></div>
      </div>

      <div className={css.content}>
        <div className={css.icon}>
          <Icon name="main" width={200} height={200} className={css.iconImage}/>
        </div>

        <h1 className={css.title}>The Best Streaming Experience</h1>
        <p className={css.text}>
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere.
        </p>

        <Link href="/" className={css.button}>
          <Icon name="now" width={20} height={20} />
          Start Watching Now
        </Link>
      </div>
    </section>
  );
}
