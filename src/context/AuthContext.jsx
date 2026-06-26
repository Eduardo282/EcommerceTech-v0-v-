import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { toast } from 'sonner';
import { GET_ME } from '../graphql/queries';
import { RUBROS } from './rubroConstants';
import { AuthContext } from './AuthContextBase';
import { useRubro } from './useRubro';

export function AuthProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [guestDrawer, setGuestDrawer] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const { rubro, setIsSeller, setRubro, setStore } = useRubro();
  const { data: authData, loading: authLoading, error: authError } = useQuery(GET_ME);

  const user = authData?.me ?? null;
  const isAuthed = Boolean(user);
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!isAuthed && !authLoading && !authError) {
      if (rubro !== RUBROS.TECHNOLOGY) setRubro(RUBROS.TECHNOLOGY);
      setIsSeller(false);
      setStore({ name: null, description: null });
    }
  }, [authError, authLoading, isAuthed, rubro, setIsSeller, setRubro, setStore]);

  const openAuth = useCallback(() => {
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const closeGuestDrawer = useCallback(() => {
    setGuestDrawer(null);
  }, []);

  const requireAuth = useCallback((reason = 'default') => {
    if (reason === 'cart' || reason === 'cartView') {
      setGuestDrawer('cart');
      return;
    }

    if (reason === 'wishlist' || reason === 'wishlistView') {
      setGuestDrawer('wishlist');
      return;
    }

    const messageByReason = {
      default: {
        description: 'Tu cuenta nos permite guardar tu actividad y preferencias.',
        title: 'Inicia sesión para continuar',
      },
      seller: {
        description: 'Necesitás una cuenta para administrar tus publicaciones.',
        title: 'Inicia sesión para vender productos',
      },
    };
    const message = messageByReason[reason] || messageByReason.default;

    toast.info(message.title, { description: message.description });
    if (reason === 'seller') return;

    setAuthOpen(true);
  }, []);

  const handleAuthSuccess = useCallback(
    ({ mode, wantsSeller, userName, user: authenticatedUser } = {}) => {
      setAuthOpen(false);
      setGuestDrawer(null);

      if (authenticatedUser?.isSeller) {
        if (authenticatedUser?.rubro) setRubro(authenticatedUser.rubro);
        setIsSeller(true);
        setStore({
          description: authenticatedUser?.storeDescription || null,
          name: authenticatedUser?.storeName || null,
        });
      } else if ((mode === 'login' || mode === 'register') && authenticatedUser) {
        if (!wantsSeller) {
          setRubro(RUBROS.TECHNOLOGY);
          setIsSeller(false);
          setStore({ name: null, description: null });
        }
      }

      if (mode === 'register' && wantsSeller && !authenticatedUser?.isSeller) {
        setOnboardingOpen(true);
        return;
      }

      toast.success(`Bienvenido ${userName || ''}!`, {
        description: mode === 'login' ? 'Has iniciado sesión' : 'Tu cuenta ha sido creada',
      });
    },
    [setIsSeller, setRubro, setStore]
  );

  const value = useMemo(
    () => ({
      authError,
      authLoading,
      authOpen,
      closeAuth,
      closeGuestDrawer,
      guestDrawer,
      handleAuthSuccess,
      isAuthed,
      onboardingOpen,
      openAuth,
      requireAuth,
      setGuestDrawer,
      setOnboardingOpen,
      user,
      userId,
    }),
    [
      authError,
      authLoading,
      authOpen,
      closeAuth,
      closeGuestDrawer,
      guestDrawer,
      handleAuthSuccess,
      isAuthed,
      onboardingOpen,
      openAuth,
      requireAuth,
      user,
      userId,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
