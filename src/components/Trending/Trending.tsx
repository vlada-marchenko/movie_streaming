/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTrendingMovies } from "@/lib/movies";
import { getTrendingSeries } from "@/lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Trending.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
  type: "movies" | "series";
}

export default function Trending({ type }: Props) {
  const [mobile, setMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(2);

  useEffect(() => {
    const handleItemsPerPage = () => {
      if (window.innerWidth < 1440) {
        setItems(2);
        setMobile(true);
      } else if (window.innerWidth < 1920) {
        setItems(5);
        setMobile(false);
      } else {
        setItems(5);
        setMobile(false);
      }
    };

    handleItemsPerPage();
    window.addEventListener("resize", handleItemsPerPage);

    return () => {
      window.removeEventListener("resize", handleItemsPerPage);
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["trending", type],
    queryFn: () =>
      type === "movies" ? getTrendingMovies("week") : getTrendingSeries("week"),
  });

const formatPopularity = (num: number) => {
  const scaled = Math.floor(num * 100); 
  if (scaled >= 1000000) return (scaled / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (scaled >= 1000) return (scaled / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return scaled.toString();
};

  const total = data ? Math.ceil(data.results.length / items) : 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trending {type}</div>;

  const displayData = mobile 
    ? data.results 
    : data.results.slice((page - 1) * items, page * items);

  return (
    <section className={css.container}>
    <div className={css.content}>
      <div className={css.up}>
        <h3 className={css.title}>Trending Now</h3>
        {!mobile && (
          <div className={css.pag}>
            <button
              className={css.left}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <Icon name="left" width={22} height={22} />
            </button>

            <div className={css.num}>
              {[...Array(total)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`${css.dot} ${page === i + 1 ? css.activeDot : ""}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={css.right}
              onClick={() => setPage(page + 1)}
              disabled={page === total}
            >
              <Icon name="right" width={18} height={18} />
            </button>
          </div>
        )}
      </div>
      <div className={css.grid}>
        {displayData.map((item: any) => (
          <div key={item.id} className={css.card}>
            <Image
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              width={158}
              height={180}
            />
            <div className={css.down}>
                <p className={css.name}>{item.title || item.name}</p>
                <div className={css.popularity}>
                    <Icon name="eye" width={24} height={24} />
                    <p className={css.text}>{formatPopularity(item.popularity)}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
