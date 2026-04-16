'use client';

import FAQ from "@/components/FAQ/FAQ";
import css from "./page.module.css";
import { useUiStore } from "@/store/uiStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/lib/movies";
import { getPopularSeries } from "@/lib/series";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";

export default function SupportPage() {
    const gridSize = useUiStore((state) => state.trialGridSize);
    const setTrialGridSize = useUiStore((state) => state.setTrialGridSize);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setTrialGridSize(12);
        } else if (window.innerWidth < 1440) {
          setTrialGridSize(21);
        } else if (window.innerWidth < 1920) {
          setTrialGridSize(34);
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
  
    // eslint-disable-next-line react-hooks/purity
    const shuffled = allContent.sort(() => Math.random() - 0.5);
  
    const gridContent = shuffled.slice(0, gridSize);  


  return (
    <div className={css.containerr}>
      <div className={css.content}>
      <div className={css.intro}>
      <h1 className={css.title}>Welcome to our support page!</h1>
      <p className={css.text}>We are here to help you with any problems you may be having with our product.</p>
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
      </div>
      </div>
      </div>

      <FAQ />
    </div>
  );
}