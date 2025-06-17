// components/NewsFeed.tsx
'use client';

import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers/store';

interface NewsArticle {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
}

const NewsFeed = ({ articles }: { articles: NewsArticle[] }) => {
  const { darkMode } = useAppSelector((state: RootState) => state.preferences);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Latest Crypto News</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {article.source}
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;