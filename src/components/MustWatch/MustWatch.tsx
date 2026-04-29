/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTopRatedMovies } from "@/lib/movies";
import { getTopRatedSeries } from "@/lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./MustWatch.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useEffect } from "react";
import Link from "next/link";
import { useUiStore } from "@/store/uiStore";
import { memo } from "react";
import { useMemo } from "react";

interface Props {
  type: "movies" | "series";
}

function MustWatch({ type }: Props) {
  const paginationKey = `must watch ${type}`;
  const pagination = useUiStore((state) => state.paginations[paginationKey]);
  const { page = 1, items = 2, mobile = false } = pagination || {};
  const setPaginationState = useUiStore((state) => state.setPaginationState);

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
      type === "movies" ? getTopRatedMovies() : getTopRatedSeries(),
  });

  const formatVoteCount = (num: number) => {
    const scaled = Math.floor(num * 100);
    if (scaled >= 1000000)
      return (scaled / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (scaled >= 1000)
      return (scaled / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return scaled.toString();
  };

  const getStarFill = (index: number, rating: number) => {
    const stars = rating / 2;
    if (index < Math.floor(stars)) return "full";
    if (index < stars) return "half";
    return "empty";
  };

  const filteredResults = useMemo(() => {
    return data?.results.filter((item: any) => item.vote_count > 0) ?? [];
  }, [data?.results]);

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
    ? filteredResults
    : filteredResults.slice((page - 1) * items, page * items);

  const total = data ? Math.ceil(filteredResults.length / items) : 0;

  return (
    <section className={css.container}>
      <div className={css.content}>
        <div className={css.up}>
          <h3 className={css.title}>Must-watch {type}</h3>
          {!mobile && (
            <div className={css.pag}>
              <button
                className={css.left}
                onClick={() =>
                  setPaginationState(paginationKey, { page: page - 1 })
                }
                disabled={page === 1}
              >
                <Icon name="left" width={22} height={22} />
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
              >
                <Icon name="right" width={18} height={18} />
              </button>
            </div>
          )}
        </div>
        <div className={css.grid}>
          {displayData.map((item: any) => (
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
              />
              <div className={css.down}>
                <p className={css.name}>{item.title || item.name}</p>
                <div className={css.rating}>
                  <div className={css.stars}>
                    {[...Array(5)].map((_, i) => {
                      const fillType = getStarFill(i, item.vote_average);
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
                  <span className={css.text}>
                    {formatVoteCount(item.vote_count)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(MustWatch);
