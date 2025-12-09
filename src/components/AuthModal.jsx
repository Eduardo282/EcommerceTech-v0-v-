import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations';
import { Store } from 'lucide-react';

export function AuthModal({ open, onClose, onSuccess }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wantsSeller, setWantsSeller] = useState(false);
  const [login, { loading: loggingIn }] = useMutation(LOGIN_USER);
  const [register, { loading: registering }] = useMutation(REGISTER_USER);
  const client = useApolloClient();

  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const { data } = await login({ variables: { email, password } });
        const user = data?.loginUser?.user;
        await client.resetStore();
        onSuccess?.({
          mode: 'login',
          userName: user?.name || email,
          user,
        });
      } else {
        const { data } = await register({
          variables: { name, email, password },
        });
        const user = data?.registerUser?.user;
        await client.resetStore();
        onSuccess?.({
          mode: 'register',
          wantsSeller,
          userName: user?.name || name || email,
          user,
        });
      }
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 z-10"
        style={{
          background: '#111115',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'login' ? 'Login' : 'Create Account'}
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-display text-amber-100">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-amber-200/70">
            {mode === 'login' ? 'Login to access your account' : 'Join our marketplace today'}
          </p>
        </header>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-amber-200/80 mb-1">Full Name</label>
              <input
                className="w-full px-3 py-2 rounded-lg text-amber-100 focus:outline-none"
                style={{
                  background: '#2c2c30',
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-amber-200/80 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg text-amber-100 focus:outline-none"
              style={{
                background: '#2c2c30',
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-amber-200/80 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg text-amber-100 focus:outline-none"
              style={{
                background: '#2c2c30',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {mode === 'register' && (
            <div
              className="rounded-xl p-3 flex items-start gap-3"
              style={{
                background: 'black',
              }}
            >
              <input
                id="wants-seller"
                type="checkbox"
                checked={wantsSeller}
                onChange={(e) => setWantsSeller(e.target.checked)}
                className="mt-1 accent-amber-500"
              />
              <label htmlFor="wants-seller" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 text-amber-100">
                  <Store className="h-5 w-5 text-white" />
                  <span className="font-medium">I want to sell products</span>
                </div>
                <p className="text-amber-200/70 text-sm ml-7">
                  Setup your seller account after registration
                </p>
              </label>
            </div>
          )}
          <button
            type="submit"
            disabled={loggingIn || registering}
            className="w-full mt-1 py-3 rounded-xl text-white cursor-pointer"
            style={{
              background: '#3E2F16',
            }}
          >
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-amber-200/70">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button className="underline cursor-pointer" onClick={() => setMode('register')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="underline cursor-pointer" onClick={() => setMode('login')}>
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};
