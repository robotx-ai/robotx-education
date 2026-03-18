const ACCESS_TOKEN_KEY = "robotx_access_token";
const REFRESH_TOKEN_KEY = "robotx_refresh_token";
const SESSION_EXPIRES_AT_KEY = "robotx_session_expires_at";

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

function getTokenExpiry(accessToken: string) {
  try {
    const payload = JSON.parse(decodeBase64Url(accessToken.split(".")[1] || ""));
    if (typeof payload?.exp === "number") {
      return payload.exp * 1000;
    }
  } catch {
    // Ignore malformed tokens.
  }
  return null;
}

export function saveSession(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  const expiresAt = getTokenExpiry(accessToken);
  if (expiresAt) {
    window.localStorage.setItem(SESSION_EXPIRES_AT_KEY, String(expiresAt));
  } else {
    window.localStorage.removeItem(SESSION_EXPIRES_AT_KEY);
  }
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(SESSION_EXPIRES_AT_KEY);
}

export function getSessionExpiresAt() {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_EXPIRES_AT_KEY);
  if (stored) {
    const expiresAt = Number(stored);
    return Number.isFinite(expiresAt) ? expiresAt : null;
  }

  const accessToken = getAccessToken();
  return accessToken ? getTokenExpiry(accessToken) : null;
}

export function isSessionActive() {
  if (typeof window === "undefined") return false;
  const accessToken = getAccessToken();
  if (!accessToken) return false;
  const expiresAt = getSessionExpiresAt();
  if (!expiresAt) return true;
  return Date.now() < expiresAt;
}
