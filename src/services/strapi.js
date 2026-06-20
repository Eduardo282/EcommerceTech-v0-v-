const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const fetchAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

    if (!params.populate) {
      url.searchParams.append('populate', '*');
    }

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Fallo al obtener datos de Strapi: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error al obtener datos de Strapi:', error);
    return null;
  }
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
