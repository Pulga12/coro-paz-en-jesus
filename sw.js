const CACHE_NAME = "coro-paz-en-jesus-v3-3-0";
const APP_SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "version.json",
  "manifest.webmanifest",
  "assets/logo-coro.jpeg",
  "assets/icon.svg",
  "data/app-data.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(activateNewVersion());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isAppFile = requestUrl.origin === self.location.origin;
  const isStaticAsset = requestUrl.pathname.includes("/assets/");

  if (isAppFile && !isStaticAsset) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(cacheFirst(event.request));
});

async function activateNewVersion() {
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
  await self.clients.claim();

  const clients = await self.clients.matchAll({ type: "window" });
  await Promise.all(clients.map((client) => {
    if ("navigate" in client) {
      return client.navigate(client.url);
    }
    return undefined;
  }));
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-store" });
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}
