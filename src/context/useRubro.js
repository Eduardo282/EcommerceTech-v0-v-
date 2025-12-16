import { useContext } from 'react';
import { RubroContext } from './RubroContextBase';

export function useRubro() {
  const ctx = useContext(RubroContext);
  if (!ctx) throw new Error('useRubro debe usarse dentro de RubroProvider');
  return ctx;
}
