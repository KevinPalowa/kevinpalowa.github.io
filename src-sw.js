importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
    ({
        url
    }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api',
    })
);
workbox.routing.registerRoute(
    ({
        url
    }) => url.origin === 'https://upload.wikimedia.org',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'svg',
    })
);

self.addEventListener('push', function (event) {
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    console.log(body);
    const options = {
        body: body,
        icon: '/img/logo.png',
        badge: '/img/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Football brother', options)
    );
});