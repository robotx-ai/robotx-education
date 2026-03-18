"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function SignupPage() {
  const { t } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "info">("info");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageTone("info");

    const response = await fetch("/.netlify/functions/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(data?.message || t("auth.signupFailed"));
      setMessageTone("error");
      setLoading(false);
      return;
    }

    const acceptedText = Array.isArray(data?.debug?.accepted) && data.debug.accepted.length > 0
      ? ` (${data.debug.accepted.join(", ")})`
      : "";
    setMessage((data?.message || t("auth.verifyEmailSent")) + acceptedText);
    setMessageTone("info");
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/home/openclaw-learn.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white/70" />
      <form
        onSubmit={handleSignup}
        className="relative z-10 w-full max-w-md rounded-2xl border border-black bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-bold">{t("auth.signupTitle")}</h1>
        <p className="mt-2 text-gray-600">{t("auth.signupSubtitle")}</p>

        <label className="mt-6 flex flex-col gap-1">
          <span>{t("auth.fullName")}</span>
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="rounded border border-black px-3 py-2"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1">
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

        {message && (
          <p className={`mt-3 text-sm ${messageTone === "error" ? "text-red-600" : "text-gray-700"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full border border-black bg-black px-4 py-2 text-white"
        >
          {loading ? t("auth.loading") : t("auth.signupAction")}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t("auth.haveAccount")}{" "}
          <a className="underline" href="/login">
            {t("auth.loginAction")}
          </a>
        </p>
      </form>
    </main>
  );
}
