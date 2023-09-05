
import { fetchImages } from './fetch'

const button = document.querySelector('[type="submit"]')
const inputField = document.querySelector('[name="searchQuery"]')

button.addEventListener('click', chosenGallery)

function chosenGallery () {
    const inputValue = inputField.value
    fetchImages(inputValue).then(data => {
        console.log(data)
    })
}
