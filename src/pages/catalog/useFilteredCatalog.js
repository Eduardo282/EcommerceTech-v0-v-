import { useMemo, useState } from 'react';
import { includesQuery } from './catalogUtils';

export function useFilteredCatalog({ items, initialFilter, allFilter, filterBy, searchBy }) {
  const [activeCategory, setActiveCategory] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory = activeCategory === allFilter || filterBy(item, activeCategory);
        return matchesCategory && includesQuery(searchBy(item), searchQuery);
      }),
    [activeCategory, allFilter, filterBy, items, searchBy, searchQuery]
  );

  return {
    activeCategory,
    filteredItems,
    searchQuery,
    setActiveCategory,
    setSearchQuery,
  };
}
