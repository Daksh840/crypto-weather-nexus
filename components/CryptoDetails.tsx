import type { CryptoDetails } from '../lib/api/crypto'; // Updated import path
import DOMPurify from 'dompurify';

// Inside the component

export default function CryptoDetails({ data }: { data: CryptoDetails }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {data.name} ({data.symbol})
      </h1>
      <div 
  className="prose max-w-none"
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(data.description) 
  }}
/>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-2xl font-bold">${data.price.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">24h Change</p>
          <p className={`text-2xl font-bold ${data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.change24h.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-2xl font-bold">${data.marketCap.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About {data.name}</h2>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
}