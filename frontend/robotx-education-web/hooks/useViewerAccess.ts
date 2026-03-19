"use client";

import { useEffect, useState } from "react";
import { clearSession, getAccessToken, isSessionActive } from "@/lib/auth";

type ViewerAccess = {
  loading: boolean;
  loggedIn: boolean;
  eduVerified: boolean;
};

export function useViewerAccess(): ViewerAccess {
  const [state, setState] = useState<ViewerAccess>({
    loading: true,
    loggedIn: false,
    eduVerified: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!isSessionActive()) {
        clearSession();
        if (!cancelled) {
          setState({ loading: false, loggedIn: false, eduVerified: false });
        }
        return;
      }

      const token = getAccessToken();
      if (!token) {
        if (!cancelled) {
          setState({ loading: false, loggedIn: false, eduVerified: false });
        }
        return;
      }

      try {
        const response = await fetch("/.netlify/functions/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          clearSession();
          if (!cancelled) {
            setState({ loading: false, loggedIn: false, eduVerified: false });
          }
          return;
        }

        const profile = await response.json();

        if (!cancelled) {
          setState({
            loading: false,
            loggedIn: true,
            eduVerified: Boolean(profile?.eduVerified),
          });
        }
      } catch {
        if (!cancelled) {
          setState({ loading: false, loggedIn: Boolean(token), eduVerified: false });
        }
      }
    }

    loadProfile();

    const syncSession = () => {
      setState((current) => ({ ...current, loading: true }));
      loadProfile();
    };

    window.addEventListener("storage", syncSession);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return state;
}
