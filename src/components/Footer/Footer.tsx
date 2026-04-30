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
            <span className={css.title}>Home</span>
            <Link href="/#genres" className={css.item}>
              Categories
            </Link>
            <Link href="/#plans" className={css.item}>
              Pricing
            </Link>
            <Link href="/#faq" className={css.item}>
              FAQ
            </Link>
          </div>
          <div className={css.box}>
            <span className={css.title}>Movies</span>
            <Link href="/movies?tab=movies/#genres" className={css.item}>
              Genres
            </Link>
            <Link href="/movies?tab=movies/#trending" className={css.item}>
              Trending
            </Link>
            <Link href="/movies?tab=movies/#new" className={css.item}>
              New Release
            </Link>
            <Link href="/movies?tab=movies/#must-watch" className={css.item}>
              Popular
            </Link>
          </div>
          <div className={css.box}>
            <span className={css.title}>Shows</span>
            <Link href="/movies?tab=shows#show-genres" className={css.item}>
              Genres
            </Link>
            <Link href="/movies?tab=shows#show-trending" className={css.item}>
              Trending
            </Link>
            <Link href="/movies?tab=shows#show-new" className={css.item}>
              New Release
            </Link>
            <Link
              href="/movies?tab=shows#must-watch-series"
              className={css.item}
            >
              Popular
            </Link>
          </div>
          <div className={css.box}>
            <span className={css.title}>Support</span>
            <Link href="/support" className={css.item}>
              Contact Us
            </Link>
          </div>
          <div className={css.box}>
            <span className={css.title}>Subscription</span>
            <Link href="/subscriptions" className={css.item}>
              Plans
            </Link>
            <Link href="/subscriptions/#features" className={css.item}>
              Features
            </Link>
          </div>
          <div className={css.box}>
            <Link href="/" className={css.title}>
              Connect With Us
            </Link>
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
              <Link href="/" className={css.it}>
                Terms of Use
              </Link>
              <span className={css.l}>|</span>
              <Link href="/" className={css.it}>
                Privacy Policy
              </Link>
              <span className={css.l}>|</span>
              <Link href="/" className={css.it}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
