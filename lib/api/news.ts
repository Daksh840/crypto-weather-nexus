// lib/api/news.ts
import axios from 'axios';

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      'https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&q=crypto&language=en'
    );
    return response.data.results.slice(0, 5).map((article: any) => ({
      title: article.title,
      source: article.source_id,
      url: article.link,
      publishedAt: article.pubDate
    }));
  } catch {
    throw new Error('Failed to fetch news articles');
  }
};