const CACHE = "thuan-study-v1";
const BASE = new URL("./", self.location.href);
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const shell = new URL("index.html", BASE);
      const response = await fetch(shell, { cache: "reload" });
      if (!response.ok) throw new Error("Could not cache app shell");
      await cache.put(shell, response.clone());
      await cache.put(BASE, response.clone());
      const html = await response.text();
      const assets = [
        ...html.matchAll(/(?:src|href)="(\.\/assets\/[^"\s]+)"/g),
      ].map((m) => new URL(m[1], BASE).href);
      await cache.addAll([
        ...assets,
        new URL("icon.svg", BASE).href,
        new URL("icon-192.png", BASE).href,
        new URL("icon-512.png", BASE).href,
        new URL("manifest.webmanifest", BASE).href,
      ]);
      await self.skipWaiting();
    })(),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys())
        if (key.startsWith("thuan-study-") && key !== CACHE)
          await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== BASE.origin ||
    !url.pathname.startsWith(BASE.pathname)
  )
    return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.ok)
            (await caches.open(CACHE)).put(event.request, response.clone());
          return response;
        })
        .catch(
          async () =>
            (await caches.match(event.request)) ||
            (await caches.match(new URL("index.html", BASE))) ||
            Response.error(),
        ),
    );
  } else if (
    url.pathname.includes("/assets/") ||
    url.pathname.endsWith(".svg")
  ) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then(async (response) => {
            if (response.ok)
              (await caches.open(CACHE)).put(event.request, response.clone());
            return response;
          }),
      ),
    );
  }
});
