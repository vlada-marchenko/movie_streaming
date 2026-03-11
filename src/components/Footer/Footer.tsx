'use client'

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
            <span className={css.item}>Categories</span>
            <span className={css.item}>Pricing</span>
            <span className={css.item}>FAQ</span>
          </div>
          <div className={css.box}>
            <span className={css.title}>Movies</span>
            <span className={css.item}>Genres</span>
            <span className={css.item}>Trending</span>
            <span className={css.item}>New Release</span>
            <span className={css.item}>Popular</span>
          </div>
          <div className={css.box}>
            <span className={css.title}>Shows</span>
            <span className={css.item}>Genres</span>
            <span className={css.item}>Trending</span>
            <span className={css.item}>New Release</span>
            <span className={css.item}>Popular</span>
          </div>
          <div className={css.box}>
            <span className={css.title}>Support</span>
            <span className={css.item}>Contact Us</span>
          </div>
          <div className={css.box}>
            <span className={css.title}>Subscription</span>
            <span className={css.item}>Plans</span>
            <span className={css.item}>Features</span>
          </div>
          <div className={css.box}>
            <span className={css.title}>Connect With Us</span>
            <div className={css.icons}>
              <Link href="/" className={css.icon}>
                <Icon name="f" width={22} height={22} />
              </Link>
              <Link href="/" className={css.icon}>
                <Icon name="t" width={22} height={22} />
              </Link>
              <Link href="/" className={css.icon}>
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
              <span className={css.it}>Terms of Use</span>
              <span className={css.l}>|</span>
              <span className={css.it}>Privacy Policy</span>
              <span className={css.l}>|</span>
              <span className={css.it}>Cookie Policy</span>
            </div>
            </div>
          </div>
      </div>
    </footer>
  );
}
