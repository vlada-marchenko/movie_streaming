/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getNewMovies } from "@/lib/movies";
import { getNewSeries } from "@/lib/series";
import { useQuery } from "@tanstack/react-query";
import css from "./Releases.module.css";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

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

  // Supports both yyyy-mm-dd and dd-mm-yyyy.
  if (parts[0].length === 4) {
    [year, month, day] = parts;
  } else {
    [day, month, year] = parts;
  }

  const monthNumber = Number(month);
  if (monthNumber < 1 || monthNumber > 12) return value;

  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
}


export default function Releases({ type }: Props) {
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
    queryKey: ["new releases", type, page],
    queryFn: () =>
      type === "movies" ? getNewMovies(page) : getNewSeries(page),
  });

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
        <h3 className={css.title}>New Releases</h3>
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
          <Link href={'/'} key={item.id} className={css.card}>
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
                      Released at {formatReleaseDate(item.release_date || item.first_air_date)}
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
