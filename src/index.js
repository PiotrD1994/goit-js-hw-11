import Notiflix from 'notiflix'
import { fetchImages } from './fetch'
import simpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'
import 'notiflix/dist/notiflix-3.2.6.min.css';

const button = document.querySelector('[type="submit"]')
const inputField = document.querySelector('[name="searchQuery"]')
const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.load-more')

loadBtn.style.display = "none"

let page = 1
const limit = 40
let totalHits = 0

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputValue = inputField.value 
    page = 1 
    fetchAndShowImages(inputValue)
})

loadBtn.addEventListener('click', function() {
    if( page * limit >= totalHits) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {clickToClose: true})
        loadBtn.style.display = "none"
        return
    }
    const inputValue = inputField.value 
    page ++
    fetchAndShowImages(inputValue, true)
})

function fetchAndShowImages(query, append = false) {
    fetchImages(query, page = 1)
    .then(data => {
        if (!data.hits.length) {
            if(page === 1) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.", {clickToClose: true})
            } else {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {clickToClose: true})
                loadBtn.style.display = 'none'
            }
            return
        }
      totalHits = data.totalHits
      const markup = data.hits.map(image => `
      <div class="photo-card">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image" />
        </a>
        <div class="info">
        <p class="info-item">
        <b>Lubię to: ${image.likes}</b>
        </p>
        <p class="info-item">
        <b>Odsłony: ${image.views}</b>
        </p>
        <p class="info-item">
        <b>Komentarze: ${image.comments}</b>
        </p>
        <p class="info-item">
        <b>Pobrania: ${image.downloads}</b>
        </p>
        </div>
        </div>`).join('')
        if(append) {
            gallery.innerHTML += markup
        } else {
            gallery.innerHTML = markup
            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
             behavior: "smooth",
              });
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
        if (page * limit >= totalHits) {
            loadBtn.style.display = 'none'
        } else {
            loadBtn.style.display = 'block'
        }
        lightbox.refresh()
}).catch(error => {
    Notiflix.Notify.failure('Error during images downloading', {clickToClose: true})
})}


const lightbox = new simpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition:"bottom",
        enableKeyboard: true,
})




