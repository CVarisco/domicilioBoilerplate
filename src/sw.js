/* eslint-disable no-undef */

self.__precacheManifest = [].concat(self.__precacheManifest || []);

const isNav = (event) => event.request.mode === "navigate";

if ("serviceWorker" in navigator) {
   console.log("Will the service worker register?");
   navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
         console.log("Yes, it did.");
      })
      .catch((err) => {
         console.log("No it didn't. This happened:", err);
      });
}

/**
 * Adding this before `precacheAndRoute` lets us handle all
 * the navigation requests even if they are in precache.
 */
workbox.routing.registerRoute(
   ({ event }) => isNav(event),
   new workbox.strategies.NetworkFirst({
      // this cache is plunged with every new service worker deploy so we dont need to care about purging the cache.
      cacheName: workbox.core.cacheNames.precache,
      networkTimeoutSeconds: 5, // if u dont start getting headers within 5 sec fallback to cache.
      plugins: [
         new workbox.cacheableResponse.Plugin({
            statuses: [200],
         }),
      ],
   })
);

workbox.routing.registerRoute(
   new RegExp(`${process.env.PREACT_APP_DATA_SOURCE}`),
   new workbox.strategies.StaleWhileRevalidate({
      cacheName: "GHapi",
      plugins: [
         new workbox.cacheableResponse.Plugin({
            statuses: [200],
         }),
         new workbox.expiration.Plugin({
            maxEntries: 5,
            maxAgeSeconds: 24 * 60 * 60, // 24h
         }),
      ],
   })
);

workbox.precaching.precacheAndRoute(
   [`${process.env.PREACT_APP_DATA_SOURCE}`, ...self.__precacheManifest],
   {}
);

workbox.routing.setCatchHandler(({ event }) => {
   if (isNav(event))
      return caches.match(workbox.precaching.getCacheKeyForURL("/index.html"));
   return Response.error();
});
