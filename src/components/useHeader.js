import { useEffect, useRef, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';
import { LOGOUT_USER } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';
import { getHeaderConfig } from '../services/strapi';

export function useHeader() {
  const { isSeller, rubro, setRubro, setIsSeller, setStore } = useRubro();
  const { data } = useQuery(GET_ME);
  const [logout] = useMutation(LOGOUT_USER);
  const client = useApolloClient();

  const user = data?.me;
  const isAuthed = Boolean(user);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const [headerConfig, setHeaderConfig] = useState(null);
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
    getHeaderConfig().then((config) => {
      if (config) setHeaderConfig(config);
    });
  }, []);

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
    getColor: (key, fallback) => headerConfig?.[key] || fallback,
    headerConfig,
    isAuthed,
    isSeller,
    logoutUser,
    rubro,
    rubroShort: rubro === 'TECHNOLOGY' ? 'TEC' : rubro === 'GAMING' ? 'GAM' : '',
    setAccountOpen,
    setCategoriesOpen,
    user,
  };
}
