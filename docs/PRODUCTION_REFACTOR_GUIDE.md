# Production Refactor Guide

Este documento marca el camino mínimo para llevar el ecommerce a un estándar más profesional sin sobreingeniería. El proyecto funciona; el objetivo no es “reescribir todo”, sino reducir deuda real: duplicación, componentes gigantes, catálogos hardcodeados, dependencias sin uso y resolvers mezclando demasiadas responsabilidades.

## Quick path

1. Congelar alcance: no agregues features nuevas hasta limpiar catálogo, producto y checkout.
2. Eliminar bloat evidente: dependencias sin uso, `build/` versionado, APIs CMS duplicadas.
3. Unificar catálogo: todos los productos deben venir de GraphQL/MongoDB, no de arrays hardcodeados en páginas.
4. Dividir `ProductPreview.jsx` y `server/src/graphql/resolvers.js` por responsabilidad.
5. Agregar checks mínimos: build frontend, smoke backend y una prueba pequeña para lógica de carrito/precios.

## Code Review

- `src/components/ProductPreview.jsx` tiene demasiadas responsabilidades: modal, galería, zoom, fullscreen, similares, rating, carrito y wishlist.
- Varias páginas (`PlantillasAuthPage`, `ComponentesUiUxPage`, `LibrosProgramacionPage`, `GuiasEstudioPage`, `ControladoresPage`) mantienen catálogos estáticos en paralelo a la base de datos.
- `server/src/graphql/resolvers.js` mezcla validación, reglas de negocio, persistencia, eventos socket y formateo de errores.
- Hay dependencias que parecen innecesarias: `@stripe/stripe-js`, `body-parser`, `mongodb`, `validator`, `prismjs`, `tailwind-scrollbar-hide`.
- `vite.config.js` conserva alias de librerías no instaladas/no usadas.
- `ThemeInjector` consume `/api/theme`, pero no existe un content type `theme` en Strapi.
- Wishlist y carrito duplican lógica de persistencia en `localStorage` y mezclan UI feedback con lógica de dominio.
- `build/` está versionado aunque ya aparece en `.gitignore`.

## Refactor Plan

### 1. Dependency hygiene

Eliminar primero lo que no aporta. Es el cambio más barato y reduce ruido.

```bash
pnpm remove @stripe/stripe-js tailwind-scrollbar-hide
pnpm --dir server remove body-parser mongodb validator @tailwindcss/vite tailwindcss
pnpm --dir cms remove prismjs
```

Verificar antes de borrar: `rg "dependency-name" src server cms`.

### 2. Unify product mapping

Crear una sola función de normalización. Hoy cada pantalla interpreta precio, imagen, rating y categoría a su manera.

```js
// src/features/products/productMapper.js
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop';

export function mapProduct(product) {
  const images = Array.isArray(product.images)
    ? [...new Set(product.images.filter(Boolean))]
    : [];

  const price = Number(product.descuentoPrice ?? product.originalPrice ?? 0);
  const originalPrice = product.descuentoPrice ? Number(product.originalPrice ?? 0) : null;

  return {
    id: String(product.id),
    name: product.title,
    description: product.description ?? '',
    category: product.category?.name ?? 'General',
    price,
    originalPrice,
    rating: Number(product.rating ?? 0),
    reviews: Number(product.reviewsCount ?? 0),
    likes: Number(product.likesCount ?? 0),
    image: images[0] ?? FALLBACK_IMAGE,
    images: images.length ? images : [FALLBACK_IMAGE],
    badge: product.descuentoPrice ? 'Oferta' : product.badge,
    isTrending: product.isTrending === true,
  };
}
```

### 3. Replace static catalog pages

En vez de seis páginas con arrays propios, usar una sola página parametrizada.

```jsx
// src/pages/CatalogPage.jsx
import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../graphql/queries';
import { mapProduct } from '../features/products/productMapper';
import { FeaturedProducts } from '../components/FeaturedProducts';

export function CatalogPage({ title, category, rubro }) {
  const [search, setSearch] = useState('');

  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      filter: { active: true, category, rubro, search },
      pagination: { page: 1, pageSize: 24 },
      sort: 'NEWEST',
    },
  });

  const products = useMemo(
    () => (data?.products ?? []).map(mapProduct),
    [data]
  );

  if (loading) return <main className="p-8 text-white">Loading products...</main>;
  if (error) return <main className="p-8 text-red-400">Could not load products.</main>;

  return (
    <main className="min-h-screen bg-[#08080b] px-4 py-10">
      <header className="mx-auto mb-8 max-w-7xl">
        <h1 className="text-3xl text-[#E4D9AF]">{title}</h1>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="mt-4 rounded-xl bg-black px-4 py-3 text-white"
        />
      </header>

      <FeaturedProducts products={products} title={title} />
    </main>
  );
}
```

Uso esperado en rutas:

```jsx
<Route
  path="plantillas-dashboard"
  element={<CatalogPage title="Dashboard templates" category="Dashboards" />}
/>
```

### 4. Split ProductPreview by responsibility

`ProductPreview` debería orquestar, no contener todo.

```txt
src/features/products/preview/
  ProductPreview.jsx          // container modal
  ProductGallery.jsx          // images, thumbnails, expand
  ProductPurchasePanel.jsx    // price, quantity, cart/buy
  SimilarProducts.jsx         // related products
  ProductMeta.jsx             // description/specs/includes
```

Container mínimo:

```jsx
// src/features/products/preview/ProductPreview.jsx
import { createPortal } from 'react-dom';
import { ProductGallery } from './ProductGallery';
import { ProductPurchasePanel } from './ProductPurchasePanel';
import { ProductMeta } from './ProductMeta';

export function ProductPreview({ product, open, onClose, onAddToCart }) {
  if (!open || !product) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/70 p-4">
      <section className="mx-auto grid max-w-7xl grid-cols-[1fr_400px] rounded-2xl bg-[#111115]">
        <ProductGallery images={product.images} name={product.name} />
        <ProductPurchasePanel product={product} onAddToCart={onAddToCart} onClose={onClose} />
        <ProductMeta product={product} />
      </section>
    </div>,
    document.body
  );
}
```

### 5. Move business rules out of GraphQL resolvers

Los resolvers deben coordinar. La regla “máximo 2 productos en tendencia” pertenece a un servicio de dominio.

```js
// server/src/services/productService.js
const MAX_TRENDING_PRODUCTS = 2;

export function createProductService({ Product, Category }) {
  async function ensureTrendingCapacity(excludedProductId = null) {
    const query = { isTrending: true };
    if (excludedProductId) query._id = { $ne: excludedProductId };

    const count = await Product.countDocuments(query);
    if (count >= MAX_TRENDING_PRODUCTS) {
      throw new Error('Only 2 trending products are allowed. Remove one first.');
    }
  }

  async function createProduct(input, user) {
    const categoryExists = await Category.exists({ _id: input.categoryId });
    if (!categoryExists) throw new Error('A valid category is required.');

    if (input.isTrending) await ensureTrendingCapacity();

    return Product.create({
      title: input.title,
      description: input.description,
      originalPrice: input.originalPrice,
      descuentoPrice: input.descuentoPrice ?? null,
      images: input.images ?? [],
      category: input.categoryId,
      inventory: input.inventory ?? 0,
      active: input.isTrending ? true : input.active ?? true,
      isTrending: input.isTrending ?? false,
      rubro: input.rubro ?? user?.rubro ?? 'TECHNOLOGY',
    });
  }

  return { createProduct, ensureTrendingCapacity };
}
```

Resolver más limpio:

```js
// server/src/graphql/resolvers/productMutations.js
import { GraphQLError } from 'graphql';

function toGraphQLError(error) {
  return new GraphQLError(error.message, {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

export function createProductMutations({ productService }) {
  return {
    createProduct: async (_, { input }, context) => {
      try {
        context.requireAdmin();
        const product = await productService.createProduct(input, context.user);
        return product.populate('category');
      } catch (error) {
        throw toGraphQLError(error);
      }
    },
  };
}
```

### 6. Standardize error handling in Express

```js
// server/src/http/asyncRoute.js
export function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
```

```js
// server/src/http/errorMiddleware.js
export function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : error.message,
  });
}
```

Uso:

```js
app.post(
  '/create-checkout-session',
  express.json(),
  asyncRoute(async (req, res) => {
    const session = await createCheckoutSession(req.body.items, req.get('origin'));
    res.json({ id: session.id, url: session.url });
  })
);

app.use(errorMiddleware);
```

### 7. Keep cart logic pure

Separar reglas de carrito de React. Esto facilita tests y evita bugs de UI.

```js
// src/features/cart/cartModel.js
export function addCartItem(items, product, amount = 1) {
  const quantity = Math.max(1, Number(amount) || 1);
  const existing = items.find((item) => item.id === product.id);

  if (!existing) return [...items, { ...product, quantity }];

  return items.map((item) =>
    item.id === product.id
      ? { ...item, quantity: item.quantity + quantity }
      : item
  );
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity ?? 1),
    0
  );
}
```

Check mínimo:

```js
// src/features/cart/cartModel.test.js
import { addCartItem, getCartTotal } from './cartModel';

const cart = addCartItem([], { id: '1', price: 10 }, 2);
console.assert(cart[0].quantity === 2, 'adds quantity');
console.assert(getCartTotal(cart) === 20, 'calculates total');
```

## Checklist de producción

- [ ] Un solo origen de verdad para productos: MongoDB/GraphQL.
- [ ] No arrays de productos hardcodeados en páginas.
- [ ] No endpoints CMS duplicando catálogo.
- [ ] `ProductPreview` dividido en componentes pequeños.
- [ ] Resolvers GraphQL delegan reglas a servicios.
- [ ] Dependencias sin uso eliminadas.
- [ ] `build/` removido del tracking de Git.
- [ ] Manejo de errores HTTP centralizado.
- [ ] Smoke test backend y build frontend pasan.

## Verificación mínima

```bash
pnpm build
pnpm lint
pnpm --dir server start
pnpm --dir server smoke:commerce
```

## Justificación técnica

- SRP: cada archivo cambia por una sola razón: UI, dominio, persistencia o transporte.
- DRY: el catálogo, el mapeo de producto y el cálculo de carrito viven en un solo lugar.
- KISS: se eliminan capas especulativas y dependencias que no aportan.
- Clean Code: early returns y funciones pequeñas reducen anidación y hacen más fácil testear.
- Robustez: errores HTTP/GraphQL se normalizan y no filtran detalles internos.
- Desacoplamiento: React deja de decidir reglas de negocio y GraphQL deja de cargar toda la lógica de dominio.

## Orden recomendado de implementación

1. Limpieza segura: dependencias, alias, `build/`, helpers muertos.
2. Cart y wishlist puros.
3. Product mapper único.
4. CatalogPage única.
5. ProductPreview dividido.
6. Servicios backend para productos, engagement y checkout.
7. Tests mínimos.

No conviertas esto en una “arquitectura enterprise” gigante. Primero borrá lo que sobra; después separá solo lo que duele.
