"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getAccessToken, saveSession } from "@/lib/auth";
import { useI18n } from "@/i18n/I18nProvider";

export default function ResetPasswordPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (hash) {
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (accessToken && refreshToken) {
        saveSession(accessToken, refreshToken);
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }
    }
    setReady(true);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage(t("auth.passwordsMismatch"));
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setMessage(t("auth.resetSessionMissing"));
      return;
    }

    setLoading(true);
    const response = await fetch("/.netlify/functions/reset-password", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(data?.message || t("auth.resetFailed"));
      setLoading(false);
      return;
    }

    clearSession();
    router.push("/login?reset=success");
  }

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[url('/assets/home/openclaw-learn.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/70" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-black bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-bold">{t("auth.resetPasswordTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.resetPasswordSubtitle")}</p>

        <label className="mt-6 flex flex-col gap-1">
          <span>{t("auth.newPassword")}</span>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="rounded border border-black px-3 py-2"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1">
          <span>{t("auth.confirmPassword")}</span>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded border border-black px-3 py-2"
          />
        </label>

        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}

        <button
          type="submit"
          disabled={loading || !ready}
          className="mt-6 w-full rounded-full border border-black bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? t("auth.loading") : t("auth.resetAction")}
        </button>
      </form>
    </main>
  );
}
