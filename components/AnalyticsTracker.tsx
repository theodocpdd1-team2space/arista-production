"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  const key = "arista_session_id";

  let sessionId = localStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }

  return sessionId;
}

async function track(type: "page_view" | "click", path: string, label?: string) {
  try {
    const sessionId = getSessionId();

    await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        type,
        path,
        label,
        sessionId,
      }),
    });
  } catch {
    // silent
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_view", pathname);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a,button") as HTMLElement | null;

      if (!link) return;

      const text = link.textContent?.trim().replace(/\s+/g, " ").slice(0, 80);
      const href = link instanceof HTMLAnchorElement ? link.getAttribute("href") : null;

      const path = href || window.location.pathname;
      const label = text || href || "click";

      track("click", path, label);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
