/* eslint-disable react-refresh/only-export-components */
export const Book = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
export const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
export const ShoppingCart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
export const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
export const Heart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
export const Zap = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
export const Award = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);
export const BookOpen = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
export const Coffee = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);
export const Terminal = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

// datos de los libros
export const BOOKS_DATA = [
  {
    id: 1,
    title: 'Clean Code: A Handbook',
    author: 'Robert C. Martin',
    price: 45.99,
    rating: 4.9,
    reviews: 3200,
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    category: 'Software Engineering',
    badge: 'Best Seller',
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    price: 39.99,
    rating: 4.8,
    reviews: 2100,
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop',
    category: 'Career',
    badge: 'Classic',
    description: 'Your journey to mastery. The classic guide to becoming a better programmer.',
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 29.99,
    rating: 4.5,
    reviews: 1500,
    image:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop',
    category: 'JavaScript',
    badge: null,
    description: 'Unearthing the rugged nature of JavaScript and its elegant parts.',
  },
  {
    id: 4,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    price: 55.0,
    rating: 5.0,
    reviews: 5000,
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    category: 'Architecture',
    badge: 'Must Read',
    description: 'The big ideas behind reliable, scalable, and maintainable systems.',
  },
  {
    id: 5,
    title: "You Don't Know JS",
    author: 'Kyle Simpson',
    price: 35.5,
    rating: 4.7,
    reviews: 1800,
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop',
    category: 'JavaScript',
    badge: 'Deep Dive',
    description:
      'A series of books diving deep into the core mechanisms of the JavaScript language.',
  },
  {
    id: 6,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    price: 85.0,
    rating: 4.6,
    reviews: 1200,
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop',
    category: 'Computer Science',
    badge: 'Academic',
    description: 'The bible of algorithms. Comprehensive and rigorous.',
  },
];

export const CATEGORIES = [
  'Todos',
  'Software Engineering',
  'JavaScript',
  'Architecture',
  'Career',
  'Computer Science',
];

export function mapBookToProduct(book) {
  return {
    id: `book-${book.id}`,
    name: book.title,
    category: book.category,
    price: book.price,
    originalPrice: null,
    rating: book.rating,
    reviews: book.reviews,
    image: book.image,
    sales: Math.max(25, Math.round(book.reviews / 12)),
    badge: book.badge || 'Libro',
    features: [book.author, book.category, 'Formato digital'],
    description: book.description,
    longDescription: `${book.description} Incluye una lectura recomendada para desarrolladores que buscan profundizar en ${book.category.toLowerCase()} y mejorar criterio técnico.`,
    details: [
      `Autor: ${book.author}`,
      `Categoría: ${book.category}`,
      `Valoración promedio: ${book.rating}`,
      `Más de ${book.reviews} reseñas verificadas`,
    ],
    includes: ['Formato PDF/EPUB', 'Acceso inmediato', 'Actualizaciones de edición'],
  };
}
