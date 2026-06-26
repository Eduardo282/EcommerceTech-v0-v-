const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map();
const pendingRequests = new Map();

function isFreshCacheEntry(cached) {
  return cached && Date.now() - cached.timestamp <= CACHE_TTL_MS;
}

export const fetchAPI = async (endpoint, params = {}) => {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  if (!params.populate) {
    url.searchParams.append('populate', '*');
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const cacheKey = url.toString();
  const cached = responseCache.get(cacheKey);
  if (isFreshCacheEntry(cached)) return cached.data;

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const request = (async () => {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Fallo al obtener datos de Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    responseCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  })();

  pendingRequests.set(cacheKey, request);

  try {
    return await request;
  } catch (error) {
    console.error('Error al obtener datos de Strapi:', error);
    if (cached) return cached.data;
    return null;
  } finally {
    pendingRequests.delete(cacheKey);
  }
};

export const clearStrapiCache = () => {
  responseCache.clear();
  pendingRequests.clear();
};

export const getHeaderConfig = async () => {
  const data = await fetchAPI('header');
  return data?.data || null;
};

export const getFooterConfig = async () => {
  const data = await fetchAPI('footer');
  return data?.data || null;
};

export const getNewsletterConfig = async () => {
  const data = await fetchAPI('newsletter');
  return data?.data || null;
};

export const getHeroConfig = async () => {
  const data = await fetchAPI('hero');
  return data?.data || null;
};

export const getCategoriesConfig = async () => {
  const data = await fetchAPI('category');
  return data?.data || null;
};

export const getTrustBannerConfig = async () => {
  const data = await fetchAPI('trust-banner');
  return data?.data || null;
};

export const getFeaturedProductsConfig = async () => {
  const data = await fetchAPI('featured-product');
  return data?.data || null;
};
