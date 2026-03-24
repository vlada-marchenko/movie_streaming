/* eslint-disable react-hooks/purity */
"use client";

import { getPopularMovies } from "../../lib/movies";
import { getPopularSeries } from "../../lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Trial.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";

export default function Trial() {
  const gridSize = useUiStore((state) => state.trialGridSize);
  const setTrialGridSize = useUiStore((state) => state.setTrialGridSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTrialGridSize(6);
      } else if (window.innerWidth < 1440) {
        setTrialGridSize(12);
      } else if (window.innerWidth < 1920) {
        setTrialGridSize(27);
      } else {
        setTrialGridSize(48);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setTrialGridSize]);

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
    <div className={css.container}>
      <div className={css.grid}>
        {gridContent.map((item, index) => (
          <div key={`${item.id}-${index}`} className={css.gridItem}>
            <Image
              src={tmdbPosterSrc(item.poster_path)}
              alt={item.title || item.name || ""}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1440px) 20vw, 15vw"
              className={css.poster}
            />
          </div>
        ))}
      </div>


        <div className={css.overlay}>
            <div className={css.content}>
            <h2 className={css.title}>Start your free trial today!</h2>
            <p className={css.text}>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
            </div>
            <button className={css.button}>Start a Free Trial</button>
        </div>
    </div>
)
}