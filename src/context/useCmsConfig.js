import { useContext } from 'react';
import { CmsConfigContext } from './CmsConfigContextBase';

export function useCmsConfig() {
  const context = useContext(CmsConfigContext);
  if (!context) {
    throw new Error('useCmsConfig must be used within CmsConfigProvider');
  }
  return context;
}
