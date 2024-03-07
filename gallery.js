const API_KEY = "live_7St5azyKpVsWaB1duAHXYlrDv09bpQKC9YPBsiWzIjOOtHXOxzV5QTFuyqNKpiHx";

async function uploadCatImage(imageData) {
    const url = 'https://api.thttps://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify(imageData)
        });
        if (!response.ok) {
            throw new Error('Failed to upload cat image');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading cat image:', error);
        // Handle the error appropriately or log it
        throw error; 
    }
}

export { uploadCatImage };
