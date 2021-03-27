const CACHE_NAME = "wedelia-v39";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/wedding-flower.html",
  "/pages/about.html",
  "/pages/bouquet-flower.html",
  "/pages/account.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/aset/w3.png",
  "/aset/bouqet-flo-img/rsz_1bf1.jpg",
  "/aset/bouqet-flo-img/rsz_bf3.jpg",
  "/aset/bouqet-flo-img/rsz_2bf4.jpg",
  "/aset/wedding_img_flow/rsz_1wf2.jpg",
  "/aset/wedding_img_flow/rsz_1wf3.jpg",
  "/aset/wedding_img_flow/rsz_1wf4.jpg",
  "/aset/rsz_1wedeliashop2.jpg",
  "/aset/rsz_wedeliashop1.jpg",
  "/icons/icon512.png",
  "/icons/icon384.png",
  "/icons/icon192.png",
  "/icons/icon144.png",
  "/icons/icon128.png",
  "/manifest.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});
