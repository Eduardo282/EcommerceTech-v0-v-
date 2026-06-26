import { useMemo } from 'react';
import { buildDynamicProductSearchItems } from '../../lib/catalogSearch';

export function useProductAggregation({
  cartItems = [],
  featuredProducts = [],
  trendingProducts = [],
  wishlistProducts = [],
}) {
  const allProducts = useMemo(() => {
    const products = [...featuredProducts, ...trendingProducts, ...wishlistProducts, ...cartItems];

    return Array.from(
      new Map(products.filter(Boolean).map((product) => [String(product.id), product])).values()
    );
  }, [cartItems, featuredProducts, trendingProducts, wishlistProducts]);

  const searchCatalogItems = useMemo(() => {
    const dynamicItems = buildDynamicProductSearchItems(allProducts);

    return Array.from(
      new Map(dynamicItems.map((item) => [`${item.path}:${item.id}`, item])).values()
    );
  }, [allProducts]);

  const productCategories = useMemo(() => {
    const uniqueProducts = new Map(
      [...featuredProducts, ...trendingProducts]
        .filter(Boolean)
        .map((product) => [String(product.id), product])
    );
    const categoryCounts = new Map();

    uniqueProducts.forEach((product) => {
      const categoryName = product.category?.trim();
      if (!categoryName) return;

      categoryCounts.set(categoryName, (categoryCounts.get(categoryName) || 0) + 1);
    });

    return Array.from(categoryCounts, ([name, productCount]) => ({
      name,
      productCount,
    })).sort((categoryA, categoryB) =>
      categoryA.name.localeCompare(categoryB.name, 'es', { sensitivity: 'base' })
    );
  }, [featuredProducts, trendingProducts]);

  return {
    allProducts,
    productCategories,
    searchCatalogItems,
  };
}
