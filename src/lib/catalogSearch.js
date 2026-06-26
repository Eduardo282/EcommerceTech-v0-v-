export function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getSearchQueryFromParams(searchParams) {
  return searchParams.get('q') || searchParams.get('search') || '';
}

export function itemMatchesSearch(item, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const searchable = [
    item?.name,
    item?.title,
    item?.description,
    item?.longDescription,
    item?.category,
    item?.type,
    item?.badge,
    ...(Array.isArray(item?.features) ? item.features : []),
    ...(Array.isArray(item?.tags) ? item.tags : []),
  ];

  return normalizeSearchText(searchable.filter(Boolean).join(' ')).includes(normalizedQuery);
}

export function filterCatalogItems(items, query) {
  return items.filter((item) => itemMatchesSearch(item, query));
}

export function buildSearchTarget(item, query) {
  const params = new URLSearchParams();
  params.set('q', query);
  params.set('highlight', String(item.id));

  return `${item.path}?${params.toString()}#catalog-results`;
}

export function toSearchItem(product, path, type) {
  return {
    ...product,
    id: String(product.id),
    name: product.name || product.title,
    path,
    type,
  };
}

export function buildDynamicProductSearchItems(products) {
  return products
    .filter(Boolean)
    .map((product) => toSearchItem(product, '/nuevos-lanzamientos', product.category || 'Producto'));
}
