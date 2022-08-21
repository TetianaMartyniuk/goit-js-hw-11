import { Notify } from "notiflix";
import { Axios } from "axios";

const refs = {
    searchForm: document.querySelector(".search-form"),
    buttonSearch: document.querySelector('button[type="submit"]'),
    buttonLoadMore: document.querySelector(".load-more")
}

const { searchForm, buttonSearch, buttonLoadMore } = refs;

// Кожне зображення описується об'єктом, з якого тобі цікаві 
// тільки наступні властивості:
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

const keyAPI = "29393880-351538220907d4562d5b0c880";
buttonLoadMore.classList.add("hidden")

searchForm.addEventListener("submit", searchPhotos)

function searchPhotos(e) {
    e.preventDefault();
    let request = e.target.firstElementChild.value;
    console.log(request);
    handlePhotos(request);
}

function handlePhotos(request) {
    fetch(`https://pixabay.com/api/?key=${keyAPI}&q=${request}&image-type=photo&orientation=horizontal&safesearch=true`)
        .then(response)
        .catch((error) => {console.log(error)});
    
}