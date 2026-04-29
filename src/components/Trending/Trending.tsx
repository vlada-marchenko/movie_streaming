/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTrendingMovies } from "@/lib/movies";
import { getTrendingSeries } from "@/lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Trending.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useEffect } from "react";
import Link from "next/link";
import { useUiStore } from "@/store/uiStore";
import { memo } from "react";

interface Props {
  type: "movies" | "series";
}

const formatPopularity = (num: number) => {
  const scaled = Math.floor(num * 100);
  if (scaled >= 1000000)
    return (scaled / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (scaled >= 1000)
    return (scaled / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return scaled.toString();
};

function Trending({ type }: Props) {
  const paginationKey = `trending-${type}`;
  const pagination = useUiStore((state) => state.paginations[paginationKey]);
  const setPaginationState = useUiStore((state) => state.setPaginationState);

  const { mobile = false, page = 1, items = 2 } = pagination || {};

  useEffect(() => {
    const handleItemsPerPage = () => {
      if (window.innerWidth < 1440) {
        setPaginationState(paginationKey, { items: 2, mobile: true, page: 1 });
      } else if (window.innerWidth < 1920) {
        setPaginationState(paginationKey, { items: 5, mobile: false });
      } else {
        setPaginationState(paginationKey, { items: 5, mobile: false });
      }
    };

    handleItemsPerPage();
    window.addEventListener("resize", handleItemsPerPage);

    return () => {
      window.removeEventListener("resize", handleItemsPerPage);
    };
  }, [paginationKey, setPaginationState]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["trending", type],
    queryFn: () =>
      type === "movies" ? getTrendingMovies("week") : getTrendingSeries("week"),
  });

  const total = data ? Math.ceil(data.results.length / items) : 0;

  if (isLoading) {
    return (
      <section className={css.container}>
        <div
          className={css.skeletonLoader}
          style={{
            height: "400px",
            background: "#1a1a1a",
            borderRadius: "12px",
          }}
        />
      </section>
    );
  }
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
                onClick={() =>
                  setPaginationState(paginationKey, { page: page - 1 })
                }
                disabled={page === 1}
                aria-label="View previous trending items"
              >
                <Icon name="left" width={22} height={22} aria-hidden="true" />
              </button>

              <div className={css.num}>
                {[...Array(total)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setPaginationState(paginationKey, { page: i + 1 })
                    }
                    className={`${css.dot} ${page === i + 1 ? css.activeDot : ""}`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className={css.right}
                onClick={() =>
                  setPaginationState(paginationKey, { page: page + 1 })
                }
                disabled={page === total}
                aria-label="View more trending items"
              >
                <Icon name="right" width={18} height={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className={css.grid}>
          {displayData.map((item: any, index: number) => (
            <Link
              href={`/movies/${item.id}?type=${type === "movies" ? "movies" : "series"}`}
              key={item.id}
              className={css.card}
            >
              <Image
                className={css.img}
                src={tmdbPosterSrc(item.poster_path)}
                alt={item.title || item.name}
                width={158}
                height={180}
                priority={index < 3}
                sizes="(max-width: 767px) 158px, (max-width: 1439px) 192px, 252px"
              />
              <div className={css.down}>
                <p className={css.name}>{item.title || item.name}</p>
                <div className={css.popularity}>
                  <Icon name="eye" width={24} height={24} />
                  <p className={css.text}>
                    {formatPopularity(item.popularity)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Trending);
