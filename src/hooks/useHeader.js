import { useEffect, useRef, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useTheme } from 'next-themes';
import { useAuth } from '../context/useAuth';
import { useRubro } from '../context/useRubro';
import { useCmsConfig } from '../context/useCmsConfig';
import { RUBROS } from '../context/rubroConstants';
import { LOGOUT_USER } from '../graphql/mutations';
import { getThemeColor } from '../lib/themeColors';

export function useHeader() {
  const { resolvedTheme } = useTheme();
  const { isAuthed, user } = useAuth();
  const { isSeller, rubro, setRubro, setIsSeller, setStore } = useRubro();
  const { headerConfig } = useCmsConfig();
  const [logout] = useMutation(LOGOUT_USER);
  const client = useApolloClient();

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    if (user.isSeller !== isSeller) setIsSeller(user.isSeller);
    if (user.rubro && user.rubro !== rubro) setRubro(user.rubro);
    if (user.storeName) {
      setStore({ name: user.storeName, description: user.storeDescription });
    }
  }, [user, isSeller, rubro, setIsSeller, setRubro, setStore]);

  useEffect(() => {
    const onDown = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const logoutUser = async () => {
    await logout();
    await client.resetStore();
    setRubro(RUBROS.TECHNOLOGY);
    setIsSeller(false);
    setStore({ name: null, description: null });
    setAccountOpen(false);
  };

  return {
    accountOpen,
    accountRef,
    categoriesOpen,
    categoriesRef,
    getColor: (key, fallback) => getThemeColor(headerConfig, key, fallback, resolvedTheme),
    headerConfig,
    isAuthed,
    isDark: resolvedTheme !== 'light',
    isSeller,
    logoutUser,
    rubro,
    rubroShort: rubro === 'TECHNOLOGY' ? 'TEC' : rubro === 'GAMING' ? 'GAM' : '',
    setAccountOpen,
    setCategoriesOpen,
    user,
  };
}
