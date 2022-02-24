import { articles_url, _api_key } from '../config/rest_consfig';

export async function getArticles() {
    try {
        let articles = await fetch('${articles_url}', {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json();
        articles = null;
        return result.articles;
    }
    catch(error) {
        throw error; 
    }
}