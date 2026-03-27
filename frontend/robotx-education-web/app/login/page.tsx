"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { saveSession } from "@/lib/auth";
import { useI18n } from "@/i18n/I18nProvider";

function LoginPageContent() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("reset") === "success") {
      setMessage(t("auth.resetSuccess"));
    }

    if (typeof window === "undefined") return;
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (accessToken && refreshToken) {
      saveSession(accessToken, refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      router.push("/profile");
    }
  }, [router, searchParams, t]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/.netlify/functions/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(data?.message || t("auth.loginFailed"));
      setLoading(false);
      return;
    }
    saveSession(data.accessToken, data.refreshToken);
    router.push("/profile");
  }

  async function handleForgotPassword() {
    if (!email) {
      setMessage(t("auth.forgotPasswordHint"));
      return;
    }
    const response = await fetch("/.netlify/functions/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email, redirectTo: `${window.location.origin}/reset-password` }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setMessage(t("auth.resetEmailSent"));
    } else {
      setMessage(data?.message || t("auth.resetEmailFailed"));
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/courses/originman/originman-wave-1.png')] xl:bg-[url('/assets/home/openclaw-learn.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/70" />
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded-2xl border border-black bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-bold">{t("auth.loginTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.loginSubtitle")}</p>

        <label className="mt-6 flex flex-col gap-1">
          <span>{t("auth.email")}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded border border-black px-3 py-2"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1">
          <span>{t("auth.password")}</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded border border-black px-3 py-2"
          />
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="mt-3 text-sm text-gray-700 underline"
        >
          {t("auth.forgotPassword")}
        </button>

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full border border-black bg-black px-4 py-2 text-white"
        >
          {loading ? t("auth.loading") : t("auth.loginAction")}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t("auth.noAccount")}{" "}
          <a className="underline" href="/signup">
            {t("auth.signupAction")}
          </a>
        </p>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-[calc(100vh-80px)]" />}>
      <LoginPageContent />
    </Suspense>
  );
}
