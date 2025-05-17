import { serverUrl } from "../constant";

export const fetchCoinDetails = async (tokenMint: string) => {
  try {
    const res = await fetch(`${serverUrl}/coin_detail/data/${tokenMint}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error fetching coin details');
    }

    return data.data;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
};
