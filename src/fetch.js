import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';


export async function fetchImages(query, page = 1) {
    const searchQuery = query.trim()
    if (searchQuery ==='') {
        Notiflix.Notify.failure('Please, enter key word')
        return null
    }
    const searchParams = new URLSearchParams({
        key: "39267664-2bc18c2ff9f132c4867ec917a",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 40, 
        page: page,
    })
    try {
        const response = await axios.get(`https://pixabay.com/api/?${searchParams}`) 
        return response.data
    } catch (error) {
        console.error('Błąd podczas pobierania obrazków:', error);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return null
    }
}


