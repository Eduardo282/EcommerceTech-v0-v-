import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { SET_SELLER_PROFILE } from '../graphql/mutations';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';

export function SellerOnboarding({ open, onClose }) {
  const { setRubro, setIsSeller, setStore } = useRubro();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  // rubro temporal solo para este modal
  const [localRubro, setLocalRubro] = useState(RUBROS.TECHNOLOGY);

  const [commit, { loading }] = useMutation(SET_SELLER_PROFILE);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl rounded-2xl p-6 z-10"
        style={{
          background: '#111115',
          borderColor: 'rgba(234, 179, 8, 0.28)',
          boxShadow: '0 24px 60px rgba(0,0,0,.6)',
          backdropFilter: 'blur(14px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Become a Seller"
      >
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <header className="mb-6">
          <p className="text-sm text-amber-200/70">{step} / 2</p>
          <h2 className="text-2xl font-display text-amber-100">Become a Seller</h2>
          <p className="text-amber-200/70">Setup your seller account</p>
        </header>

        {step === 1 && (
          <section>
            <p className="text-sm text-amber-200/70 mb-4">What type of products will you sell?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                className={`p-4 rounded-xl text-left cursor-pointer ${
                  localRubro === RUBROS.TECHNOLOGY ? 'bg-amber-500/10' : 'bg-transparent'
                }`}
                onClick={() => setLocalRubro(RUBROS.TECHNOLOGY)}
              >
                <h3 className="text-amber-100 font-medium">Technology</h3>
                <p className="text-amber-200/70 text-sm">Dashboards, templates, plugins, courses</p>
              </button>
              <button
                className={`p-4 rounded-xl text-left cursor-pointer ${
                  localRubro === RUBROS.GAMING ? 'bg-amber-500/10' : 'bg-transparent'
                }`}
                onClick={() => setLocalRubro(RUBROS.GAMING)}
              >
                <h3 className="text-amber-100 font-medium">Gaming</h3>
                <p className="text-amber-200/70 text-sm">Game keys, assets, soundtracks, tools</p>
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-5 cursor-pointer py-2 rounded-lg text-amber-100"
                style={{ borderColor: 'rgba(234, 179, 8, 0.4)' }}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-amber-200/80 mb-1">Store Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full focus:outline-none px-3 py-2 rounded-lg text-amber-100"
                  style={{
                    background: '#2c2c30',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-amber-200/80 mb-1">Store Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  className="w-full focus:outline-none px-3 py-2 rounded-lg text-amber-100"
                  style={{
                    background: '#2c2c30',
                  }}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="px-5 py-2 rounded-lg text-amber-100 cursor-pointer"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                disabled={!name || loading}
                className={` ${!name || loading ? 'cursor-not-allowed' : 'cursor-pointer'} px-5 py-2 rounded-lg text-amber-100 disabled:opacity-50`}
                onClick={async () => {
                  try {
                    await commit({
                      variables: {
                        rubro: localRubro,
                        storeName: name,
                        storeDescription: desc,
                      },
                    });
                    setRubro(localRubro);
                    setIsSeller(true);
                    setStore({ name, description: desc });
                    onClose?.();
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                Create Store
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

SellerOnboarding.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
