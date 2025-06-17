"use client";
import React, { useEffect, useState } from "react";

const CryptoDetails = () => {
  const [crypto, setCrypto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_CRYPTO_API!);
        const data = await res.json();
        setCrypto(data);
        setLoading(false);
      } catch (err) {
        console.error("Crypto fetch failed:", err);
        setLoading(false);
      }
    };

    fetchCrypto();
  }, []);

  if (loading) return <div>Loading Crypto...</div>;
  if (!crypto) return <div>Crypto data not available</div>;

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Crypto Prices</h2>
      <p>Bitcoin: ${crypto.bitcoin.usd}</p>
      <p>Ethereum: ${crypto.ethereum.usd}</p>
    </div>
  );
};

export default CryptoDetails;
