"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl w-1/3 xl:w-1/4 font-bold">
          {t("header.brand")}
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
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-[580px] rounded-xl border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/courses/ai/openclaw"
                      className="rounded-lg border border-gray-200 p-3 transition hover:border-black"
                    >
                      <Image
                        src="/assets/home/openclaw-learn.webp"
                        alt="AI course"
                        width={100}
                        height={100}
                        className="h-24 w-full rounded-2xl bg-sky-50 object-cover"
                      />
                      <h3 className="mt-3 font-semibold">{t("header.tracks.aiTitle")}</h3>
                      <p className="mt-1 text-sm text-gray-600">{t("header.tracks.aiDesc")}</p>
                    </Link>
                    <Link
                      href="/courses/robot/humanoid/originman"
                      className="rounded-lg border border-gray-200 p-3 transition hover:border-black"
                    >
                      <Image
                        src="/window.svg"
                        alt="Robot course"
                        width={100}
                        height={100}
                        className="h-24 w-full rounded-md bg-amber-50 p-4 object-contain"
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
                  href="/courses/ai/openclaw"
                  className="rounded border border-gray-200 bg-white p-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className="font-semibold">{t("header.tracks.aiTitle")}</p>
                  <p className="text-sm text-gray-600">{t("header.tracks.aiDesc")}</p>
                </Link>
                <Link
                  href="/courses/robot/humanoid/originman"
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