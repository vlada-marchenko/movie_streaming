"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../lib/movies";
import { getTrendingSeries } from "../../lib/series";
import { useMemo } from "react";
import { useEffect } from "react";
import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../components/Icon/Icon";
import { useSwipeable } from "react-swipeable";
import { tmdbBackdropSrc } from "@/lib/tmdbImage";
import { useUiStore } from "@/store/uiStore";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname} from "next/navigation";
import { Suspense } from "react";

const GenreSectionMovies = dynamic(
  () => import("@/components/GenreSectionMovies/GenreSectionMovies"),
  {
    loading: () => (
      <div style={{ height: "342px", margin: "40px 0" }}>
        <div
          style={{
            width: "150px",
            height: "30px",
            background: "#262626",
            marginBottom: "20px",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "178px",
              height: "201px",
              background: "#1a1a1a",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              width: "178px",
              height: "201px",
              background: "#1a1a1a",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    ),
  },
);

const GenreSectionShows = dynamic(
  () => import("@/components/GenreSectionShows/GenreSectionShows"),
  {
    loading: () => (
      <div style={{ height: "342px", margin: "40px 0" }}>
        <div
          style={{
            width: "150px",
            height: "30px",
            background: "#262626",
            marginBottom: "20px",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "178px",
              height: "201px",
              background: "#1a1a1a",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              width: "178px",
              height: "201px",
              background: "#1a1a1a",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    ),
  },
);

const Trending = dynamic(() => import("@/components/Trending/Trending"), {
  loading: () => (
    <div style={{ height: "400px", padding: "5px 0", marginTop: "20px" }} />
  ),
});

const Releases = dynamic(() => import("@/components/Releases/Releases"), {
  loading: () => (
    <div style={{ height: "400px", padding: "5px 0", marginTop: "20px" }} />
  ),
});

const MustWatch = dynamic(() => import("@/components/MustWatch/MustWatch"), {
  loading: () => <div style={{ height: "400px" }} />,
});

function MoviesPageContent() {
  const currentSlide = useUiStore((state) => state.movieCurrentSlide);
  const setCurrentSlide = useUiStore((state) => state.setMovieCurrentSlide);
  const activeTab = useUiStore((state) => state.movieActiveTab);
  const setActiveTab = useUiStore((state) => state.setMovieActiveTab);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMovies("week"),
    staleTime: 1000 * 60 * 60,
  });

  const { data: tvData, isLoading: isLoadingTV } = useQuery({
    queryKey: ["trendingTVShows"],
    queryFn: () => getTrendingSeries("week"),
    staleTime: 1000 * 60 * 60,
  });

useEffect(() => {
  const tabParam = searchParams.get("tab");
  
  if (tabParam === "shows" || tabParam === "movies") {
    if (activeTab !== tabParam) {
      setActiveTab(tabParam);
    }
  } else {
    if (activeTab !== "movies") {
      setActiveTab("movies");
    }
  }
}, [searchParams, setActiveTab, activeTab]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const slides = useMemo(() => {
    const m = moviesData?.results?.slice(0, 2) || [];
    const t = tvData?.results?.slice(0, 2) || [];
    return [...m, ...t];
  }, [moviesData?.results, tvData?.results]);

  useEffect(() => {
    if (slides.length === 0) return;

    const setupTimer = () => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 10000);
      return timer;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any;
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        timerId = setupTimer();
      });
    } else {
      timerId = setupTimer();
    }

    return () => clearInterval(timerId);
  }, [setCurrentSlide, slides.length]);

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

  const handleTabSwitch = (tab: "movies" | "shows") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentItem = slides[currentSlide];

  if (isLoadingMovies || isLoadingTV || !currentItem) {
    return (
      <div className={css.page}>
        <div className={css.container}>
          <section className={css.heroSkeleton}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#1a1a1a",
                borderRadius: "12px",
              }}
            />
          </section>
        </div>
        <div className={css.switch}>
          <button className={`${css.btnn} ${css.btnActive}`}>
            Movies
          </button>
          <button className={css.btnn}>
            Shows
          </button>
        </div>
        <div className={css.movies}>
          <div style={{ minHeight: "342px", margin: "40px 0" }} />
          <div style={{ minHeight: "400px", margin: "20px 0" }} />
          <div style={{ minHeight: "400px", margin: "20px 0" }} />
          <div style={{ minHeight: "400px", margin: "20px 0" }} />
        </div>
      </div>
    );
  }

  const itemType = currentItem.title ? "movies" : "series";

  return (
    <div className={css.page}>
      <div className={css.container}>
        <section className={css.hero} {...handlers}>
          <div className={css.bg}>
            <Image
              src={tmdbBackdropSrc(
                currentItem.backdrop_path,
                currentItem.poster_path,
              )}
              alt={currentItem.title || currentItem.name}
              className={css.bgImage}
              fill
              priority
              fetchPriority="high"
              loading="eager"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 1224px, 1644px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%231a1a1a' width='1920' height='1080'/%3E%3C/svg%3E"
            />
            <div className={css.overlay}></div>
          </div>

          <div className={css.content}>
            <h1 className={css.title}>
              {currentItem.title || currentItem.name}
            </h1>
            <p className={css.text}>{currentItem.overview}</p>

            <Link
              href={`/movies/${currentItem.id}?type=${itemType}`}
              className={css.btn}
            >
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
                <span
                  className={`${css.dot} ${i === currentSlide ? css.dotActive : ""}`}
                  key={i}
                ></span>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className={css.switch}>
        <button
          onClick={() => handleTabSwitch("movies")}
          className={` ${css.btnn} ${activeTab === "movies" ? css.btnActive : ""}`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabSwitch("shows")}
          className={` ${css.btnn} ${activeTab === "shows" ? css.btnActive : ""}`}
        >
          Shows
        </button>
      </div>

      {activeTab === "movies" ? (
        <div className={css.movies}>
          <GenreSectionMovies />
          <Trending type="movies" />
          <Releases type="movies" />
          <MustWatch type="movies" />
        </div>
      ) : (
        <div className={css.shows}>
          <GenreSectionShows />
          <Trending type="series" />
          <Releases type="series" />
          <MustWatch type="series" />
        </div>
      )}
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <MoviesPageContent />
    </Suspense>
  );
}
