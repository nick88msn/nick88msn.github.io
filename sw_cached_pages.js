// Cache individual pages
const cacheName = "v1";

const cacheAssets = [
    'index.html',
    'main.css',
    'bg.jpg',
    'main.js',
    '../smooth_scroll/image1.jpg',
    '../smooth_scroll/image2.jpg',
    '../smooth_scroll/image3.jpg'
]

// Cache entire website

// Call Install Event
self.addEventListener('install', (event)=>{
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching files');
            cache.addAll(cacheAssets)
        }).then(() => self.skipWaiting())
    );
})


// Call Activate Event
self.addEventListener('activate', (event)=>{
    console.log('Service Worker: Activated');
    // Remove unwanted cached (old version)
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache)
                    }
                })
            )
        })
    );
});

// Call Fetch Event

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});