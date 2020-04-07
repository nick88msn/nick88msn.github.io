if(navigator.serviceWorker){
    console.log('Service workers supported');
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('sw_cached_sites.js')
        .then(reg => console.log('Service worker: Registered'))
        .catch(err => console.log('Service Worker: Error: ${err}'));
    })
}

const images = document.querySelectorAll('[data-src]');
const bg = document.querySelector('.bg');
var tl = gsap.timeline();

tl.fromTo(bg, {height: "0vh", opacity: 0}, {duration: 2, height: "100vh", opacity: 1, ease: "Power2.easeInOut"})

options = {
    threshold: 0,
    rootMargin: "-50px" //if you wanna preload the image before the user arrives there use a positive number
};

const imgObserver = new IntersectionObserver(callback,options);

function callback(entries, imgObserver){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else{
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}

function preloadImage(img){
    const src = img.getAttribute("data-src");
    if(!src){
        return;
    } else{
        img.src = src;
        tl.fromTo(img, {height: "0vh", opacity: 0}, {duration: 1.2, height: "50vh", opacity: 1, ease: "Power2.easeInOut"});
    }
}

images.forEach(image=>{
    imgObserver.observe(image);
})