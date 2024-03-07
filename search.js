import { fetchData } from './api.js';

async function searchCats(query) {
    const url = `https://api.thecatapi.com/v1/breeds`;
    try {
        const breeds = await fetchData(url);
        if (breeds.length > 0) {
            // If breed(s) found, get images of the first breed
            const breedId = breeds[0].id;
            const imagesUrl = `https://api.thecatapi.com/v1/images/search?breed_ids={breed_id}&limit=10`;
            const images = await fetchData(imagesUrl);
            return images;
        } else {
            throw new Error('Breed not found');
        }
    } catch (error) {
        console.error('Error searching cats:', error);
        throw error;
    }
}

export { searchCats };
