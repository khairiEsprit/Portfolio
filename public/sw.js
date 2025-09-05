const CACHE_NAME = "portfolio-v1";
const STATIC_RESOURCES = [
  "/",
  "/about",
  "/projects",
  "/skills",
  "/experience",
  "/contact",
  "/pk.webp",
  "/favicon.ico",
  "/_next/static/css/",
  "/_next/static/chunks/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Only cache GET requests
  if (event.request.method !== "GET") return;

  // Skip API routes and external requests
  if (
    event.request.url.includes("/api/") ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseClone));
            }
            return fetchResponse;
          })
        );
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      })
  );
});
