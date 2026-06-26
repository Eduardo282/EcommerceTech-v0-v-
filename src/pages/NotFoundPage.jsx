import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="min-h-[70vh] bg-[#08080b] px-6 py-24 text-center text-[#E4D9AF]">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F9B61D]">404</p>
      <h1 className="mb-4 text-4xl font-display text-white">Page not found</h1>
      <p className="mx-auto mb-8 max-w-xl text-[#898989]">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        to="/"
        className="inline-flex rounded-xl bg-[#F9B61D] px-5 py-3 font-semibold text-[#08080b] transition-transform hover:scale-105"
      >
        Back to home
      </Link>
    </main>
  );
}
