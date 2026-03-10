"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function CareersPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "");
    const lastName = String(data.get("lastName") ?? "");
    const email = String(data.get("email") ?? "");
    const whyUs = String(data.get("whyUs") ?? "");

    const subject = encodeURIComponent(`${t("careers.details.title")} Application - ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Position: ${t("careers.details.title")}\n` +
        `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n\n` +
        `${t("careers.form.whyUs")}:\n${whyUs}\n\n` +
        `Resume attachment should be included manually in your email client.`
    );

    window.location.href = `mailto:info@usrobotx.com?subject=${subject}&body=${body}`;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-600 p-10 text-white">
        <h1 className="text-4xl font-bold">{t("careers.hero.title")}</h1>
        <p className="mt-3 text-lg text-white/90">{t("careers.hero.subtitle")}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold">{t("careers.openingsTitle")}</h2>
        <button
          type="button"
          className="mt-5 w-full rounded-2xl border border-gray-200 p-6 text-left transition hover:border-black"
          onClick={() => setOpen(true)}
        >
          <h3 className="text-2xl font-semibold">{t("careers.card.title")}</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-gray-100 px-3 py-1">{t("careers.card.location")}</span>
            <span className="rounded-full bg-gray-100 px-3 py-1">{t("careers.card.type")}</span>
          </div>
        </button>
      </section>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold">{t("careers.details.title")}</h2>
              <button
                type="button"
                className="rounded border border-gray-300 px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                {t("careers.details.close")}
              </button>
            </div>

            <div className="mt-5 grid gap-2 text-sm md:grid-cols-2">
              <p>
                <span className="font-semibold">{t("careers.details.compensationLabel")}:</span>{" "}
                {t("careers.details.compensationValue")}
              </p>
              <p>
                <span className="font-semibold">{t("careers.details.jobTypeLabel")}:</span>{" "}
                {t("careers.details.jobTypeValue")}
              </p>
              <p className="md:col-span-2">
                <span className="font-semibold">{t("careers.details.locationLabel")}:</span>{" "}
                {t("careers.details.locationValue")}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">{t("careers.details.descriptionLabel")}</h3>
              <p className="mt-2 text-gray-700">{t("careers.details.descriptionValue")}</p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold">{t("careers.details.applyTitle")}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span>{t("careers.form.firstName")}</span>
                  <input name="firstName" required className="rounded border border-gray-300 px-3 py-2" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>{t("careers.form.lastName")}</span>
                  <input name="lastName" required className="rounded border border-gray-300 px-3 py-2" />
                </label>
              </div>
              <label className="flex flex-col gap-1">
                <span>{t("careers.form.email")}</span>
                <input name="email" type="email" required className="rounded border border-gray-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1">
                <span>{t("careers.form.resume")}</span>
                <input name="resume" type="file" className="rounded border border-gray-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1">
                <span>{t("careers.form.whyUs")}</span>
                <textarea
                  name="whyUs"
                  rows={4}
                  placeholder={t("careers.form.placeholderWhyUs")}
                  className="rounded border border-gray-300 px-3 py-2"
                />
              </label>
              <button type="submit" className="rounded bg-black px-5 py-2 text-white">
                {t("careers.details.submit")}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}