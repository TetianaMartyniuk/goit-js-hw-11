import { Notify } from "notiflix";
import { Axios } from "axios";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new simpleLightbox('.gallery a', {
        captions: true,
        captionSelector: "img",
        captionsData: "alt",
        captionPosition: "outside",
        captionDelay: 250,
    })

const refs = {
    searchForm: document.querySelector(".search-form"),
    buttonSearch: document.querySelector('button[type="submit"]'),
    buttonLoadMore: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery")
}

const { searchForm, buttonSearch, buttonLoadMore, gallery } = refs;

let page;
const limit = 40;
let totalHits;
let limitPages = totalHits / limit;
let request;


const keyAPI = "29393880-351538220907d4562d5b0c880";
buttonLoadMore.classList.add("hidden")

searchForm.addEventListener("submit", searchPhotos)
buttonLoadMore.addEventListener("click", showMorePhotos)

// lightBox();



function searchPhotos(e) {
  e.preventDefault();
  page = 1;
    gallery.innerHTML = "";
    request = "";
    request = e.target.firstElementChild.value;
    handlePhotos(request);
}

async function handlePhotos(request) {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${keyAPI}&q=${request}&image-type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json()
      });
    markupPhotos(response);
    if (gallery.children.length >= totalHits) {
          buttonLoadMore.classList.add("hidden");
           return Notify.warning("We're sorry, but you've reached the end of search results.")     
      }
  } catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };
}

async function showMorePhotos(e) {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${keyAPI}&q=${request}&image-type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        })
      addMarkupPhotos(response);
      if (gallery.children.length >= totalHits) {
          buttonLoadMore.classList.add("hidden");
           return Notify.warning("We're sorry, but you've reached the end of search results.")     
      }
    //   lightBox();
      
  } catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
}


function markupPhotos(obg) {
    const array = obg.hits;
    if (array.length === 0) {
        buttonLoadMore.classList.add("hidden")
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
        }
    let markup = generateMarkup(array);
    gallery.innerHTML = markup;
    // lightBox();
  lightbox.refresh();
    page += 1;
    totalHits = obg.totalHits;
    Notify.info(`Hooray! We found ${totalHits} images.`)
}

function addMarkupPhotos(obg) {
    console.log(obg);
    const array = obg.hits;
    if (array.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
    }
    page += 1;
    const markup = generateMarkup(array);
    gallery.insertAdjacentHTML("beforeend", markup);
    // lightBox();
  lightbox.refresh();
  
}

const generateMarkup = (array) => {
    const markup = array.map((item) => {
        const photoObj = item;
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photoObj;
        return `<a href="${largeImageURL}">
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350"/>
            <div class="info">
                <p class="info-item">
                <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads: ${downloads}</b>
                </p>
            </div>
        </div></a>`
    }).join("")
    buttonLoadMore.classList.remove("hidden");
    return markup;
}

// const lightBox = () => {
//     const lightbox = new simpleLightbox('.gallery a', {
//         captions: true,
//         captionSelector: "img",
//         captionsData: "alt",
//         captionPosition: "outside",
//         captionDelay: 250,
//     })
// }