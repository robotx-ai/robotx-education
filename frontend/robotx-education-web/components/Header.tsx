"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession, isSessionActive } from "@/lib/auth";
import { useI18n } from "@/i18n/I18nProvider";

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      const active = isSessionActive();
      if (!active) {
        clearSession();
      }
      setIsLoggedIn(active);
    };

    syncSession();
    const interval = window.setInterval(syncSession, 30000);
    window.addEventListener("storage", syncSession);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setAccountMenuOpen(false);
    }
  }, [isLoggedIn]);

  function handleLogout() {
    clearSession();
    setIsLoggedIn(false);
    setAccountMenuOpen(false);
    router.push("/");
  }

  const authButton = isLoggedIn ? (
    <div className="relative">
      <button
        type="button"
        aria-label={t("common.account")}
        aria-expanded={accountMenuOpen}
        onClick={() => setAccountMenuOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      </button>

      {accountMenuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <Link
            href="/profile"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => setAccountMenuOpen(false)}
          >
            {t("common.profile")}
          </Link>
          <button
            type="button"
            className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
            onClick={handleLogout}
          >
            {t("common.logout")}
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      href="/login"
      aria-label={t("auth.login")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
        <path d="M10 12h11m0 0-3.5-3.5M21 12l-3.5 3.5" />
      </svg>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl w-1/3 xl:w-1/4 font-bold">
          RobotX Education
        </Link>

        <div className="hidden w-full justify-center items-center gap-6 md:flex">
          <nav className="w-full">
            <ul className="flex w-full justify-center text-lg items-center gap-6">
              <li>
                <Link href="/">{t("header.nav.home")}</Link>
              </li>
              <li>
                <Link href="/about">{t("header.nav.about")}</Link>
              </li>
              <li className="group relative">
                <Link href="/courses" className="inline-flex py-2">
                  {t("header.nav.courses")}
                </Link>
                <div className="invisible absolute left-1/2 -translate-x-1/2 top-full z-50 mt-2 w-[580px] rounded-xl border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/courses#ai-subject-grid"
                      className="rounded-lg border border-gray-200 p-3 transition hover:border-black"
                    >
                      <Image
                        src="/assets/home/learn-openai.jpeg"
                        alt="AI course"
                        width={200}
                        height={200}
                        className="h-40 w-full rounded-md object-contain"
                      />
                      <h3 className="mt-3 font-semibold">{t("header.tracks.aiTitle")}</h3>
                      <p className="mt-1 text-sm text-gray-600">{t("header.tracks.aiDesc")}</p>
                    </Link>
                    <Link
                      href="/courses#robot-subject-grid"
                      className="rounded-lg border border-gray-200 p-3 transition hover:border-black"
                    >
                      <Image
                        src="/assets/courses/originman/originman-1.png"
                        alt="Robot course"
                        width={200}
                        height={200}
                        className="h-40 w-full rounded-md object-contain"
                      />
                      <h3 className="mt-3 font-semibold">{t("header.tracks.robotTitle")}</h3>
                      <p className="mt-1 text-sm text-gray-600">{t("header.tracks.robotDesc")}</p>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/events">{t("header.nav.events")}</Link>
              </li>
              <li>
                <Link href="/partners">{t("header.nav.partners")}</Link>
              </li>
              <li>
                <Link href="/donation">{t("header.nav.donate")}</Link>
              </li>
            </ul>
          </nav>

          {authButton}

          <select
            aria-label={t("common.language")}
            className="rounded-full border border-gray-300 px-2 py-1 text-sm"
            value={locale}
            onChange={(event) => setLocale(event.target.value as "en" | "zh")}
          >
            <option value="en">{t("common.english")}</option>
            <option value="zh">{t("common.chinese")}</option>
          </select>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {authButton}
          <select
            aria-label={t("common.language")}
            className="rounded-full border border-gray-300 px-2 py-1 text-sm"
            value={locale}
            onChange={(event) => setLocale(event.target.value as "en" | "zh")}
          >
            <option value="en">EN</option>
            <option value="zh">中</option>
          </select>
          <button
            type="button"
            className="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={t("common.menu")}
          >
            {t("common.menu")}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-3 md:hidden">
          <nav className="flex flex-col gap-3 text-base">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              {t("header.nav.home")}
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              {t("header.nav.about")}
            </Link>
            <button
              type="button"
              className="flex items-center justify-between text-left"
              onClick={() => setMobileCoursesOpen((prev) => !prev)}
              aria-expanded={mobileCoursesOpen}
            >
              {t("header.nav.courses")}
              <span>{mobileCoursesOpen ? "-" : "+"}</span>
            </button>
            {mobileCoursesOpen && (
              <div className="grid gap-3 rounded-lg bg-gray-50 p-3">
                <Link
                  href="/courses#ai-subject-grid"
                  className="rounded border border-gray-200 bg-white p-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className="font-semibold">{t("header.tracks.aiTitle")}</p>
                  <p className="text-sm text-gray-600">{t("header.tracks.aiDesc")}</p>
                </Link>
                <Link
                  href="/courses#robot-subject-grid"
                  className="rounded border border-gray-200 bg-white p-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  
                  <p className="font-semibold">{t("header.tracks.robotTitle")}</p>
                  <p className="text-sm text-gray-600">{t("header.tracks.robotDesc")}</p>
                </Link>
              </div>
            )}
            <Link href="/events" onClick={() => setMobileMenuOpen(false)}>
              {t("header.nav.events")}
            </Link>
            <Link href="/partners" onClick={() => setMobileMenuOpen(false)}>
              {t("header.nav.partners")}
            </Link>
            <Link href="/donation" onClick={() => setMobileMenuOpen(false)}>
              {t("header.nav.donate")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
