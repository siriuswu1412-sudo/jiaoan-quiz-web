var CACHE = "jiaoan-quiz-v2";
var FILES = [
  "./",
  "./index.html",
  "./交安刷题系统.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./robots.txt"
];
self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key !== CACHE; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).catch(function () { return caches.match(event.request); }));
});
