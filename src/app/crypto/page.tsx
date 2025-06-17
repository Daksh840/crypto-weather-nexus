// import { fetchCryptoDetails, CryptoDetails } from '@/lib/api/crypto'; // Updated import path

import { fetchCryptoDetails } from '../../../lib/api/crypto';
import CryptoDetails from '../../components/CryptoDetails';

export default async function CryptoPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await fetchCryptoDetails(params.id);

  return <CryptoDetails data={data} />;
}

export async function generateStaticParams() {
  return ['bitcoin', 'ethereum', 'binancecoin'].map((id) => ({ id }));
}
