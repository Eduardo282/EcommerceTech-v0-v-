import { useEffect } from 'react';

function getSearchTargetSelector(highlightId) {
  const safeHighlightId = String(highlightId).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `[data-search-id="${safeHighlightId}"]`;
}

export function useSearchHighlight(highlightId, dependency, durationMs = 3000) {
  useEffect(() => {
    if (!highlightId) return;

    let target = null;
    let removeHighlightTimerId;

    const scrollTimerId = window.setTimeout(() => {
      target = document.querySelector(getSearchTargetSelector(highlightId));
      target?.classList.add('search-highlight-card');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      removeHighlightTimerId = window.setTimeout(() => {
        target?.classList.remove('search-highlight-card');
      }, durationMs);
    }, 120);

    return () => {
      window.clearTimeout(scrollTimerId);
      window.clearTimeout(removeHighlightTimerId);
      target?.classList.remove('search-highlight-card');
    };
  }, [dependency, durationMs, highlightId]);
}
