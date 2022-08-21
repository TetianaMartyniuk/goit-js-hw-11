
function handlePhotos(request) {
    fetch(`https://pixabay.com/api/?key=${keyAPI}&q=${request}&image-type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        })
        .then((response) => {
            markupPhotos(response);
            lightBox();
        })
        .catch(() => { Notify.failure("Sorry, there are no images matching your search query. Please try again.")})
    
}


function showMorePhotos(e) {
    fetch(`https://pixabay.com/api/?key=${keyAPI}&q=${request}&image-type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        })
        .then((response) => {
            addPhotosMarkUp(response);
            lightBox();
            console.log(gallery.children.length);
        })
        .then(() => {
            if (gallery.children.length >= 500) {
                buttonLoadMore.classList.add("hidden")
                Notify.warning("We're sorry, but you've reached the end of search results.")
                return
            }
        })
        .catch(() => { Notify.failure("Sorry, there are no images matching your search query. Please try again.")})
    
}