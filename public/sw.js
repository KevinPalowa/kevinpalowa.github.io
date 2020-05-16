importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([{"revision":"ec1df3ba49973dcb9ff212f052d39483","url":"css/materialize.min.css"},{"revision":"a80d41ab7fdf8c19af07c6b6168cd8cc","url":"css/style.css"},{"revision":"5249de6f71180750123361b06eaf8faa","url":"idb-2.1.3/gulpfile.js"},{"revision":"a66942528a8af114e8a0ae4b517ab0be","url":"idb-2.1.3/lib/idb.js"},{"revision":"cd6144360ac344ad1a1dc15859c6d1bd","url":"idb-2.1.3/lib/node.js"},{"revision":"f7e3fdfc8211c8a43c92b20d21ee0aa2","url":"idb-2.1.3/test/idb.js"},{"revision":"76d2b3cf895f3868396cb1c72332cdc2","url":"idb-2.1.3/test/index.html"},{"revision":"708386652111d52a7b1562cac0734d92","url":"img/android-icon-192x192-dunplab-manifest-1417.png"},{"revision":"284b7cefc596b410ae51d18360b1f62e","url":"img/apple-icon-114x114-dunplab-manifest-1417.png"},{"revision":"b6876774b0d516963e4ab53a58d28f19","url":"img/apple-icon-120x120-dunplab-manifest-1417.png"},{"revision":"bc7d2ea751e1276513ed1e14018e2b3e","url":"img/apple-icon-144x144-dunplab-manifest-1417.png"},{"revision":"9c131fb811bde3bdc3ec77a4c5f31f6d","url":"img/apple-icon-152x152-dunplab-manifest-1417.png"},{"revision":"1f68fc539e897a0264dcb5bd76dfa702","url":"img/apple-icon-180x180-dunplab-manifest-1417.png"},{"revision":"cfe1a531c6738b8e96dfe0c933e63ae5","url":"img/apple-icon-57x57-dunplab-manifest-1417.png"},{"revision":"96d3f96706c22f6122e4c1e16f656764","url":"img/apple-icon-60x60-dunplab-manifest-1417.png"},{"revision":"7eadd5c395fc1de6e539cb02ff9f06fa","url":"img/apple-icon-72x72-dunplab-manifest-1417.png"},{"revision":"8e9da85858afafec45c36f0d677ec0c6","url":"img/apple-icon-76x76-dunplab-manifest-1417.png"},{"revision":"9bfce68e84725a77a5a670872be8b412","url":"img/favicon-16x16-dunplab-manifest-1417.png"},{"revision":"ee0a157eb1968a5080fbd9204e67c9bf","url":"img/favicon-32x32-dunplab-manifest-1417.png"},{"revision":"c290eb25194ee983e7ff7826f344b24d","url":"img/favicon-96x96-dunplab-manifest-1417.png"},{"revision":"a20a9d2d88583d415359d1fc208abc36","url":"img/logo.png"},{"revision":"63444b53cd4091e5936a0b231f9c22ad","url":"index.html"},{"revision":"c8f5d5ca4a4d3d0851741422ed4f56f3","url":"js/api.js"},{"revision":"cb51e7393bc8f452b91afded77e423df","url":"js/db.js"},{"revision":"5dcfc8944ed380b2215dc28b3f13835f","url":"js/materialize.min.js"},{"revision":"8b81c46413c45c663e275721da99cd9a","url":"js/notif.js"},{"revision":"d2939bb10a497f49a677e94dd3e0bfaf","url":"js/script.js"},{"revision":"8527992d2dd033f37dd78cd9f94c1cb7","url":"js/view.js"},{"revision":"096e4566b9d961ac0fc641f877daebeb","url":"nav.html"},{"revision":"ab08e4270dfe13164986fc6f9a7e6ee6","url":"pages/favorites.html"},{"revision":"ad986d9dc261468aef1f9735cdb17f7c","url":"pages/home.html"},{"revision":"a901208b2aa2e8835ed8883990a704bb","url":"pages/scheduled.html"},{"revision":"9cb154e9e611553aef8e81d8f0a1c51e","url":"workbox-f810d34f.js"}]);

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