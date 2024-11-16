
import axios from 'axios';
const API_KEY = "46865368-ded5de9c0791206e82b93b274";
const BASE_URL = 'https://pixabay.com/api/';



const fetchImages = async (query, page = 1, per_page = 15) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page,
                page
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching images:", error);
        throw error;
    }
};
      
      export { fetchImages };


