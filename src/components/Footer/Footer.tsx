"use client";

import css from "./Footer.module.css";
import Icon from "../Icon/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={css.page}>
      <div className={css.content}>
        <div className={css.main}>
          <div className={css.box}>
            <Link href="/#home" className={css.title}>Home</Link>
            <Link href="/#genres" className={css.item}>Categories</Link>
            <Link href="/#plans" className={css.item}>Pricing</Link>
            <Link href="/#faq" className={css.item}>FAQ</Link>
          </div>
          <div className={css.box}>
            <Link href="/#movies" className={css.title}>Movies</Link>
            <Link href="/#movie-genres" className={css.item}>Genres</Link>
            <Link href="/#movie-trending" className={css.item}>Trending</Link>
            <Link href="/#movie-new" className={css.item}>New Release</Link>
            <Link href="/#movie-popular" className={css.item}>Popular</Link>
          </div>
          <div className={css.box}>
            <Link href="/#shows" className={css.title}>Shows</Link>
            <Link href="/#show-genres" className={css.item}>Genres</Link>
            <Link href="/#show-trending" className={css.item}>Trending</Link>
            <Link href="/#show-new" className={css.item}>New Release</Link>
            <Link href="/#show-popular" className={css.item}>Popular</Link>
          </div>
          <div className={css.box}>
            <Link href="/#support" className={css.title}>Support</Link>
            <Link href="/#contact" className={css.item}>Contact Us</Link>
          </div>
          <div className={css.box}>
            <Link href="/#subscription" className={css.title}>Subscription</Link>
            <Link href="/#plans" className={css.item}>Plans</Link>
            <Link href="/#features" className={css.item}>Features</Link>
          </div>
          <div className={css.box}>
            <Link href="/" className={css.title}>Connect With Us</Link>
            <div className={css.icons}>
              <Link href="/" className={css.icon} aria-label="Facebook">
                <Icon name="f" width={22} height={22} />
              </Link>
              <Link href="/" className={css.icon} aria-label="Twitter">
                <Icon name="t" width={22} height={22} />
              </Link>
              <Link href="/" className={css.icon} aria-label="LinkedIn">
                <Icon name="in" width={22} height={22} />
              </Link>
            </div>
          </div>
        </div>
        <div className={css.under}>
          <div className={css.divider}></div>
          <div className={css.copy}>
            <span className={css.text}>
              @2023 streamvib, All Rights Reserved
            </span>
            <div className={css.neath}>
              <Link href="/" className={css.it}>Terms of Use</Link>
              <span className={css.l}>|</span>
              <Link href="/" className={css.it}>Privacy Policy</Link>
              <span className={css.l}>|</span>
              <Link href="/" className={css.it}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
