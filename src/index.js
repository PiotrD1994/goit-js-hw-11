
import { fetchImages } from './fetch'

const button = document.querySelector('[type="submit"]')
const inputField = document.querySelector('[name="searchQuery"]')
const form = document.querySelector('.search-form')

form.addEventListener('submit', chosenGallery)

function chosenGallery (event) {
    event.preventDefault()
    const inputValue = inputField.value
    fetchImages(inputValue).then(data => {
        console.log(data)
    })
}
