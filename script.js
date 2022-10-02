const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

let photosArray = [];

//unsplash api
const apiKey = 'tVBTmv_xn3CrghrjhTBDWdqydOuDjH3bzOfvq9XI6uI';
let count = 5;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



// check if each image is loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count=30;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.urls.alt_description,
            title: photo.urls.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get Photos from API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

//Scroll event handler
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
