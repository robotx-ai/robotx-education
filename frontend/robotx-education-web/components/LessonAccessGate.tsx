"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth";
import type { LessonAccess } from "@/lib/courseCatalog";
import { useI18n } from "@/i18n/I18nProvider";

type AccessState = "checking" | "granted" | "denied";

export default function LessonAccessGate({
  access,
  lessonTitle,
  children,
}: {
  access: LessonAccess;
  lessonTitle: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  const [accessState, setAccessState] = useState<AccessState>(
    access === "open" ? "granted" : "checking",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEduVerified, setIsEduVerified] = useState(false);

  useEffect(() => {
    if (access === "open") return;
    if (access === "paid") {
      setAccessState("denied");
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setIsLoggedIn(false);
      setAccessState("denied");
      return;
    }

    setIsLoggedIn(true);

    fetch("/.netlify/functions/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) {
          setAccessState("denied");
          return;
        }
        const profile = (await response.json()) as { eduVerified?: boolean };
        const verified = Boolean(profile.eduVerified);
        setIsEduVerified(verified);
        setAccessState(verified ? "granted" : "denied");
      })
      .catch(() => {
        setAccessState("denied");
      });
  }, [access]);

  if (accessState === "granted") {
    return <>{children}</>;
  }

  if (accessState === "checking") {
    return (
      <div className="lesson-access-card">
        <p className="lesson-access-eyebrow">{t("lessonAccess.checking")}</p>
        <h2 className="lesson-access-title">{lessonTitle}</h2>
        <p className="lesson-access-description">{t("lessonAccess.checkingBody")}</p>
      </div>
    );
  }

  return (
    <div className="lesson-access-card">
      <p className="lesson-access-eyebrow">
        {access === "paid" ? t("lessonAccess.paidBadge") : t("lessonAccess.eduBadge")}
      </p>
      <h2 className="lesson-access-title">{t("lessonAccess.lockedTitle")}</h2>
      <p className="lesson-access-description">
        {access === "paid"
          ? t("lessonAccess.paidBody")
          : isLoggedIn
            ? isEduVerified
              ? t("lessonAccess.genericLockedBody")
              : t("lessonAccess.eduBody")
            : t("lessonAccess.loginBody")}
      </p>
      <div className="lesson-access-actions">
        {!isLoggedIn && (
          <Link href="/login" className="lesson-primary-button">
            {t("lessonAccess.loginCta")}
          </Link>
        )}
        {isLoggedIn && access === "edu" && (
          <Link href="/profile" className="lesson-primary-button">
            {t("lessonAccess.verifyCta")}
          </Link>
        )}
      </div>
    </div>
  );
}
