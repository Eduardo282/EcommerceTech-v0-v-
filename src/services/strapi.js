const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

/**
 * Helper to get full image URL
 * @param {string} path 
 * @returns {string}
 */
export const getStrapiMedia = (path) => {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  return `${STRAPI_URL}${path}`;
};

/**
 * Fetch data from Strapi
 * @param {string} endpoint 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const fetchAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);
    
    // Add default populate parameter if not specified to get relations/media
    if (!params.populate) {
        url.searchParams.append('populate', '*');
    }

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const res = await fetch(url.toString());
    
    if (!res.ok) {
      throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return null;
  }
};


export const getHeaderConfig = async () => {
  const data = await fetchAPI('header');
  return data?.data || null;
};

export const getFuenteConfig = async () => {
  const data = await fetchAPI('fuente');
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

export const getProducts = async () => {
  const data = await fetchAPI('products', { populate: '*' });
  return data?.data || [];
};

