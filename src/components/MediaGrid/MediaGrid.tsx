"use client";

import css from "./MediaGrid.module.css";
import Image from "next/image";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Link from "next/link";
import Icon from "../Icon/Icon";

interface MediaItem {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  vote_average: number;
  mediaType: "movie" | "tv";
}

interface MediaGridProps {
  items: MediaItem[];
  isLoading: boolean;
}

export default function MediaGrid({ items, isLoading }: MediaGridProps) {
  if (isLoading) {
    return (
      <div className={css.grid}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={css.skeleton} />
        ))}
      </div>
    );
  }

  return (
    <div className={css.grid}>
      {items.map((item, index) => (
        <Link
          key={`${item.mediaType}-${item.id}`}
          href={
            item.mediaType === "movie"
              ? `/movies/${item.id}`
              : `/movies/${item.id}?type=series`
          }
          className={css.gridItem}
        >
          <div className={css.imageWrapper}>
            {item.poster_path ? (
              <Image
                src={tmdbPosterSrc(item.poster_path)}
                alt={item.title || item.name}
                sizes="(max-width: 767px) 45vw, (max-width: 1439px) 20vw, 15vw"
                fill
                className={css.gridImage}
                priority={index === 0}
              />
            ) : (
              <div className={css.noPoster}>
                <Icon name="genres" width={32} height={32} />
              </div>
            )}
          </div>

          <div className={css.cardInfo}>
            <p className={css.cardTitle}>{item.title || item.name}</p>
            <div className={css.cardMeta}>
              <span
                className={`${css.badge} ${item.mediaType === "movie" ? css.movieBadge : css.tvBadge}`}
              >
                {item.mediaType === "movie" ? "Movie" : "TV"}
              </span>
              {item.vote_average > 0 && (
                <p className={css.cardRating}>
                  ★ {item.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
