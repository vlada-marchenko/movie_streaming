/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getNewMovies } from "@/lib/movies";
import { getNewSeries } from "@/lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Releases.module.css";
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

function formatReleaseDate(value?: string): string {
  if (!value) return "Unknown";

  const parts = value.split("-");
  if (parts.length !== 3) return value;

  let day = "";
  let month = "";
  let year = "";

  if (parts[0].length === 4) {
    [year, month, day] = parts;
  } else {
    [day, month, year] = parts;
  }

  const monthNumber = Number(month);
  if (monthNumber < 1 || monthNumber > 12) return value;

  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
}

function Releases({ type }: Props) {
  const paginationKey = `releases-${type}`;
  const mobile = useUiStore(
    (state) => state.paginations[paginationKey]?.mobile ?? false,
  );
  const page = useUiStore(
    (state) => state.paginations[paginationKey]?.page ?? 1,
  );
  const items = useUiStore(
    (state) => state.paginations[paginationKey]?.items ?? 2,
  );
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
    queryKey: ["new releases", type, page],
    queryFn: () =>
      type === "movies" ? getNewMovies(page) : getNewSeries(page),
  });

  const total = data ? Math.ceil(data.results.length / items) : 0;

  if (isLoading) {
    return <div style={{ minHeight: "400px" }} />;
  }
  if (error) return <div>Error loading trending {type}</div>;

  const displayData = mobile
    ? data.results
    : data.results.slice((page - 1) * items, page * items);

  return (
    <section className={css.container}>
      <div className={css.content}>
        <div className={css.up}>
          <h3 className={css.title}>New Releases</h3>
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
                <div className={css.date}>
                  <p className={css.text}>
                    Released at{" "}
                    {formatReleaseDate(
                      item.release_date || item.first_air_date,
                    )}
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

export default memo(Releases);
