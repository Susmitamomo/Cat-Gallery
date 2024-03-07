const API_KEY = "live_7St5azyKpVsWaB1duAHXYlrDv09bpQKC9YPBsiWzIjOOtHXOxzV5QTFuyqNKpiHx";

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export { fetchData };
