"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clearSession, getAccessToken } from "@/lib/auth";
import { useI18n } from "@/i18n/I18nProvider";

type Profile = {
  fullName: string | null;
  email: string;
  orgName: string | null;
  orgEmail: string | null;
  eduVerified: boolean;
};

function ProfilePageContent() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pswdmessage, setPSWDMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error" | "info">(
    "info",
  );
  const [pswdmessageTone, setPSWDMessageTone] = useState<"success" | "error" | "info">(
    "info",
  );
  const [verifiedPopup, setVerifiedPopup] = useState(false);

  function normalizeEmail(value: string) {
    return value.trim().toLowerCase();
  }

  function isAllowedOrgEmail(value: string) {
    const email = normalizeEmail(value);
    return (
      email.endsWith(".edu") ||
      email.includes(".edu.") ||
      email.endsWith(".org") ||
      email.endsWith(".school") ||
      /\.[aA][cC]\.[a-z]+$/.test(email) ||
      /\.[kK]12\.[a-z]+$/.test(email)
    );
  }

  async function loadProfile() {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }
    const response = await fetch("/.netlify/functions/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      clearSession();
      router.push("/login");
      return;
    }
    const data = (await response.json()) as Profile;
    setProfile(data);
    setFullName(data.fullName || "");
    setOrgName(data.orgName || "");
    setOrgEmail(data.orgEmail || "");
  }

  async function updateProfile() {
    if (orgEmail && !isAllowedOrgEmail(orgEmail)) {
      setMessage(t("profile.orgEmailInvalid"));
      setMessageTone("error");
      return;
    }

    const token = getAccessToken();
    if (!token) return;
    const response = await fetch("/.netlify/functions/profile", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fullName, orgName, orgEmail }),
    });
    if (!response.ok) {
      setMessage(t("profile.updateFailed"));
      setMessageTone("error");
      return;
    }
    const data = (await response.json()) as Profile;
    setProfile(data);
    setMessage(t("profile.updateSuccess"));
    setMessageTone("success");
  }

  async function verifyOrganization() {
    if (!orgEmail || !orgName) {
      setMessage(t("profile.verifyFailed"));
      setMessageTone("error");
      return;
    }

    if (!isAllowedOrgEmail(orgEmail)) {
      setMessage(t("profile.orgEmailInvalid"));
      setMessageTone("error");
      return;
    }

    const token = getAccessToken();
    if (!token) return;
    const response = await fetch("/.netlify/functions/org-verify-request", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orgEmail, orgName }),
    });
    if (!response.ok) {
      setMessage(t("profile.verifyFailed"));
      setMessageTone("error");
      return;
    }
    setMessage(t("profile.verifySent"));
    setMessageTone("success");
  }

  async function handleUnverify() {
    setOrgEmail("");
    setOrgName("");
    await updateProfile();
  }

  async function handleVerifyLink(token: string) {
    const response = await fetch("/.netlify/functions/org-verify-confirm", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    if (response.ok) {
      setVerifiedPopup(true);
      await loadProfile();
    }
  }

  useEffect(() => {
    loadProfile();
    const token = searchParams.get("org_verify");
    if (token) {
      handleVerifyLink(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        {t("profile.loading")}
      </main>
    );
  }

  async function sendResetEmail() {
    if (!profile) {
      return;
    }
    const email = profile.email;
    const response = await fetch("/.netlify/functions/forgot-password", {
      method: "POST",
      body: JSON.stringify({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      }),
    });
    if (response.ok) {
      setPSWDMessage(t("profile.resetSent"));
      setPSWDMessageTone("success");
    } else {
      const data = await response.json().catch(() => ({}));
      setPSWDMessage(data?.message || t("profile.resetFailed"));
      setPSWDMessageTone("error");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      <section className="rounded-2xl border border-black bg-white p-6">
        <h1 className="text-3xl font-bold">
          {t("profile.greeting")} {profile.fullName || profile.email}
        </h1>
      </section>

      <section className="rounded-2xl border border-black bg-white p-6 space-y-3">
        <h2 className="text-2xl font-bold">{t("profile.identityTitle")}</h2>
        <p>
          <strong>{t("profile.fullName")}: </strong>
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="ml-2 rounded border border-black px-2 py-1"
          />
        </p>
        <p>
          <strong>{t("profile.email")}: </strong>
          {profile.email}
        </p>
        <p>
          <strong>{t("profile.password")}: </strong> ******{" "}
          <button className="ml-2 text-sm underline" onClick={sendResetEmail}>
            {t("profile.resetPassword")}
          </button>
        </p>
        {pswdmessage && (
          <p
            className={`text-sm ${
              pswdmessageTone === "success"
                ? "text-green-700"
                : pswdmessageTone === "error"
                  ? "text-red-600"
                  : "text-gray-700"
            }`}
          >
            {pswdmessage}
          </p>
        )}
        <button
          className="mt-3 rounded-full border border-black bg-black px-4 py-2 text-white"
          onClick={updateProfile}
        >
          {t("profile.save")}
        </button>
      </section>

      <section className="rounded-2xl border border-black bg-white p-6 space-y-3">
        <h2 className="text-2xl font-bold">{t("profile.orgTitle")}</h2>
        <label className="block">
          <span className="font-semibold">{t("profile.orgName")}</span>
          <input
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            className="mt-2 w-full rounded border border-black px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="font-semibold">{t("profile.orgEmail")}</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={orgEmail}
              onChange={(event) => setOrgEmail(event.target.value)}
              className="w-full rounded border border-black px-3 py-2"
            />
            {profile.eduVerified && <span className="text-green-600">✔</span>}
          </div>
        </label>
        {message && (
          <p
            className={`text-sm ${
              messageTone === "success"
                ? "text-green-700"
                : messageTone === "error"
                  ? "text-red-600"
                  : "text-gray-700"
            }`}
          >
            {message}
          </p>
        )}
        {!profile.eduVerified ? (
          <button
            className="rounded-full border border-black bg-black px-4 py-2 text-white"
            onClick={verifyOrganization}
          >
            {t("profile.verifyOrg")}
          </button>
        ) : (
          <button
            className="rounded-full border border-black px-4 py-2"
            onClick={handleUnverify}
          >
            {t("profile.unverify")}
          </button>
        )}
      </section>

      {verifiedPopup && (
        <div className="modal-overlay fixed inset-0 z-40 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-2xl border border-black bg-white p-6 text-center">
            <button
              className="absolute right-4 top-3"
              onClick={() => setVerifiedPopup(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold">{t("profile.verifiedTitle")}</h2>
            <p className="mt-2 whitespace-pre-line text-gray-700">
              {t("profile.verifiedMessage")}
            </p>
            <a
              href="/courses"
              className="mt-4 inline-block rounded-full border border-black bg-black px-4 py-2 text-white"
            >
              {t("profile.exploreCourses")}
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-4xl px-6 py-10" />}>
      <ProfilePageContent />
    </Suspense>
  );
}
