"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1>{t('footer.contact-us')}</h1>
        <h3>{t('footer.phone')}</h3>
        <br/>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}