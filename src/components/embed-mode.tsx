"use client";

import { useEffect } from "react";

export function EmbedMode() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("embed") !== "1") return;
    document.documentElement.dataset.embed = "true";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,follow";
    return () => {
      delete document.documentElement.dataset.embed;
    };
  }, []);
  return null;
}
