importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
workbox.precaching.precacheAndRoute([{
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/css/style.css',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/script.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '1'
    },
    {
        url: '/js/notif.js',
        revision: '1'
    },
    {
        url: '/js/view.js',
        revision: '3'
    },
    {
        url: '/img/logo.png',
        revision: '1'
    },
    {
        url: '/img/logo192.png',
        revision: '1'
    },
    {
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/favorites.html',
        revision: '1'
    },
    {
        url: '/pages/scheduled.html',
        revision: '1'
    },
    {
        url: "/idb-2.1.3/lib/idb.js",
        revision: '1'
    },
]);

workbox.routing.registerRoute(
    new RegExp('^https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'API'
    })
);

self.addEventListener('fetch', (event) => {
    if (event.request.url.endsWith('.svg')) {
        // Referencing workbox.strategies will now work as expected.
        const cacheFirst = new workbox.strategies.CacheFirst();
        event.respondWith(cacheFirst.handle({
            request: event.request
        }));
    }
});

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