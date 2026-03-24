"use client";

import css from "./Header.module.css";
import Icon from "../../components/Icon/Icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/uiStore";

export default function Header() {
  const openMenu = useUiStore((state) => state.headerMenuOpen);
  const toggleHeaderMenu = useUiStore((state) => state.toggleHeaderMenu);
  const toggleMenu = () => toggleHeaderMenu();
  const pathname = usePathname();

  const activeClass = (path: string) => (pathname === path ? css.active : "");
  const activeMobClass = (path: string) =>
    pathname === path ? css.activeMob : "";

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
          <div className={`${css.cont} ${activeClass("/")}`}>
            <Link href="/" className={css.navLink}>
              Home
            </Link>
          </div>
          <div className={`${css.cont} ${activeClass("/movies")}`}>
            <Link href="/movies" className={css.navLink}>
              Movies&Shows
            </Link>
          </div>
          <div className={`${css.cont} ${activeClass("/support")}`}>
            <Link href="/support" className={css.navLink}>
              Support
            </Link>
          </div>
          <div className={`${css.cont} ${activeClass("/subscriptions")}`}>
            <Link href="/subscriptions" className={css.navLink}>
              Subscriptions
            </Link>
          </div>
        </nav>
        <div className={css.empty}></div>
        <button className={css.burger} onClick={toggleMenu}>
          <Icon name="menu" width={32} height={32} className={css.menu} />
        </button>
        {openMenu && (
          <div className={css.backdrop} onClick={toggleMenu}>
            <nav className={css.navMob}>
              <div className={css.cont}>
                <Link
                  href="/"
                  className={`${css.navLinkMob} ${activeMobClass("/")}`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="/movies"
                  className={`${css.navLinkMob} ${activeMobClass("/movies")}`}
                  onClick={toggleMenu}
                >
                  Movies&Shows
                </Link>
                <Link
                  href="/support"
                  className={`${css.navLinkMob} ${activeMobClass("/support")}`}
                  onClick={toggleMenu}
                >
                  Support
                </Link>
                <Link
                  href="/subscriptions"
                  className={`${css.navLinkMob} ${activeMobClass("/subscriptions")}`}
                  onClick={toggleMenu}
                >
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
