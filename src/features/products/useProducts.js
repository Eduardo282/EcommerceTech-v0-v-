import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../../graphql/queries';
import { mapProduct } from './productMapper';

export function useProducts(rubro) {
  // GraphQL: productos destacados (por rating)
  const { data: featuredData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: 'RATING_DESC',
      pagination: { page: 1, pageSize: 8 },
      filter: { rubro },
    },
    fetchPolicy: 'cache-first',
  });

  // GraphQL: productos seleccionados como tendencia desde el backoffice
  const { data: trendingData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: 'NEWEST',
      pagination: { page: 1, pageSize: 12 },
      filter: { rubro, active: true, isTrending: true },
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const featuredProducts = useMemo(
    () => (featuredData?.products || []).map(mapProduct),
    [featuredData]
  );

  const trendingProducts = useMemo(
    () => (trendingData?.products || []).map(mapProduct),
    [trendingData]
  );

  return {
    featuredProducts,
    trendingProducts
  };
}
