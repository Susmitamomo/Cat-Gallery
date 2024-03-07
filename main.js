import { searchCats } from './search.js';
import { fetchCatImages } from './gallery.js';

document.addEventListener('DOMContentLoaded', async () => {
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    async function handleSearch() {
        const query = searchInput.value.trim();
        if (query !== '') {
            try {
                const catImages = await searchCats(query);
                renderImages(catImages);
            } catch (error) {
                console.error('Error searching cats:', error);
                // Handle error (e.g., display error message to the user)
            }
        }
    }

    function renderImages(images) {
        galleryContainer.innerHTML = ''; // Clear previous images
        images.forEach(catImage => {
            const img = document.createElement('img');
            img.src = catImage.url;
            img.alt = 'Cat Image';
            galleryContainer.appendChild(img);
        });
    }

    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    try {
        const catImages = await fetchCatImages();
        renderImages(catImages);
    } catch (error) {
        console.error('Error fetching cat images:', error);
        // Handle error (e.g., display error message to the user)
    }
});

 // Pagination
 const prevPageButton = document.getElementById('prev-page');
 const nextPageButton = document.getElementById('next-page');
 let currentPage = 1;
 const itemsPerPage = 10; // Adjust as needed

 prevPageButton.addEventListener('click', () => {
     if (currentPage > 1) {
         currentPage--;
         renderImages(catImages);
     }
 });

 nextPageButton.addEventListener('click', () => {
     currentPage++;
     renderImages(catImages);
 });

 // Favorites
 const favorites = []; // Array to store favorite cat images

 // Random Cat
 const randomCatButton = document.getElementById('random-cat');
 randomCatButton.addEventListener('click', async () => {
     try {
         const randomCatImage = await fetchRandomCat();
         renderImages([randomCatImage]);
     } catch (error) {
         console.error('Error fetching random cat:', error);
     }
 });

 // Filtering
 const breedFilter = document.getElementById('breed-filter');
 breedFilter.addEventListener('change', async () => {
     const selectedBreed = breedFilter.value;
     const filteredCatImages = catImages.filter(image => image.breed === selectedBreed);
     renderImages(filteredCatImages);
 });

 // Sorting
 const sortBySelect = document.getElementById('sort-by');
 sortBySelect.addEventListener('change', () => {
     const sortBy = sortBySelect.value;
     catImages.sort((a, b) => {
         if (sortBy === 'popularity') {
             return b.popularity - a.popularity;
         } else if (sortBy === 'upload-date') {
             return new Date(b.created_at) - new Date(a.created_at);
         }
     });
     renderImages(catImages);
 });

 

 // Function to fetch a random cat image
 async function fetchRandomCat() {
     const randomCatUrl = 'https://api.thecatapi.com/v1/images/search';
     const response = await fetch(randomCatUrl);
     const data = await response.json();
     return data[0];
 }

// Define a function to fetch the list of cat breeds from the API
async function fetchCatBreeds() {
    const breedsUrl = 'https://api.thecatapi.com/v1/breeds';
    const response = await fetch(breedsUrl);
    const data = await response.json();
    return data; // Return the list of cat breeds
}

// Define a function to populate the dropdown menu with cat breed options
function populateBreedsDropdown(breeds) {
    const breedFilter = document.getElementById('breed-filter');
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id; // Use breed ID as the option value
        option.textContent = breed.name; // Use breed name as the option text
        breedFilter.appendChild(option);
    });
}

// Call the fetchCatBreeds function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch cat breeds
    try {
        const catBreeds = await fetchCatBreeds();
        populateBreedsDropdown(catBreeds);
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
        // Handle error (display error message to the user)
    }

});


