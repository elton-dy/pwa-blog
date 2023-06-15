const CACHE_NAME = 'pwa-app-cache-v2';
const CACHE_FILES = [
    '/',
    'style.css',
    'api.js',
    'offline.html',
    'post.html',
    'output.css',
    // Ajoutez ici d'autres fichiers que vous souhaitez mettre en cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_FILES);
        })()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })()
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);

            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                return await fetch(event.request);
            } catch (e) {
                if (event.request.url.includes('post.html')) {
                    return cache.match('post.html');
                } else {
                    return cache.match('offline.html');
                }
            }
        })()
    );
});
