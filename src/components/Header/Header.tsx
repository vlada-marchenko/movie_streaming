'use client'

import css from "./Header.module.css";
import Icon from "../../components/Icon/Icon";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <header className={css.page}>
      <div className={css.content}>
        <Link href="/" className={css.logo}>
          <Image
            className={css.logoImg}
            src="/logo-stream.png"
            alt="logo"
            width={116}
            height={35}
          />
        </Link>
        <nav className={css.nav}>
          <div className={css.cont}>
            <Link href={"/"} className={css.navLink}>
              Home
            </Link>
          </div>
          <div className={css.cont}>
            <Link href={"/movies"} className={css.navLink}>
              Movies&Shows
            </Link>
          </div>
          <div className={css.cont}>
            <Link href={"/support"} className={css.navLink}>
              Support
            </Link>
          </div>
          <div className={css.cont}>
            <Link href={"/subscriptions"} className={css.navLink}>
              Subscriptions
            </Link>
          </div>
        </nav>
        <div className={css.empty}></div>
            <button
                className={css.burger}
                onClick={() => setOpenMenu(!openMenu)}
              >
                  <Icon
                    name="menu"
                    width={32}
                    height={32}
                    className={css.menu}
                  />
            </button>
        {openMenu && (
          <div className={css.backdrop} onClick={toggleMenu}>
            <nav className={css.navMob}>
              <div className={css.cont}>
                <Link href={"/"} className={css.navLinkMob} onClick={toggleMenu}>
                  Home
                </Link>
              </div>
              <div className={css.cont}>
                <Link href={"/movies"} className={css.navLinkMob} onClick={toggleMenu}>
                  Movies&Shows
                </Link>
              </div>
              <div className={css.cont}>
                <Link href={"/support"} className={css.navLinkMob} onClick={toggleMenu}>
                  Support
                </Link>
              </div>
              <div className={css.cont}>
                <Link href={"/subscriptions"} className={css.navLinkMob} onClick={toggleMenu}>
                  Subscriptions
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
