import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}
interface NewsApiResponse {
  results: Array<{
    title: string;
    source_id: string;
    link: string;
    pubDate: string;
  }>;
}
const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null
};

export const fetchNews = createAsyncThunk(
  'news/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<NewsApiResponse>(
        `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&q=crypto&language=en`
      );
      
      return response.data.results.slice(0, 5).map((article) => ({
        title: article.title,
        source: article.source_id,
        url: article.link,
        publishedAt: article.pubDate
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch news articles';
      return rejectWithValue(message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default newsSlice.reducer;