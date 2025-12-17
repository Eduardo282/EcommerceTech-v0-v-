# PRD — Create Professional Ecommerce Design

Fecha: 2025-12-16

## 1) Resumen

Este proyecto es una plantilla/implementación de ecommerce moderna con:

- **Frontend** en React + Vite + Tailwind, con componentes UI de tienda (hero, categorías, destacados, carrito lateral, wishlist, auth modal, onboarding de vendedores).
- **Backend** Node/Express con **GraphQL (Apollo Server)**, autenticación por cookies (JWT) y persistencia en **MongoDB/Mongoose**.
- **CMS** en **Strapi 5** para administrar contenido editorial (header/hero/footer/newsletter/trust banner, etc.) consumido desde el frontend.
- **Chat en tiempo real** con Socket.IO (y atajo a WhatsApp).

## 2) Objetivos

### Objetivos de producto

- Entregar una experiencia de compra atractiva y rápida para explorar productos, ver detalle, y preparar un flujo de checkout.
- Permitir gestión de contenido no-técnica vía CMS (textos, secciones de home, banners, etc.).
- Proveer una API de catálogo y órdenes vía GraphQL con auth y roles.

### Objetivos de negocio

- Acelerar el time-to-market (base de ecommerce reutilizable).
- Soportar multi-rubro (p.ej. TECHNOLOGY / GAMING) para personalización del catálogo.

## 3) Alcance

### En alcance (MVP funcional)

**Frontend (React):**

- Home con secciones: hero, categorías, productos destacados/tendencia, trust banner, newsletter, footer.
- Navegación (header) y rutas principales.
- Modal de autenticación (login/registro).
- Carrito lateral (agregar/quitar items, subtotal/total).
- Wishlist lateral.
- Widget de chat (Socket.IO) + acceso a WhatsApp.
- Onboarding de vendedor (marcar intención de vender y completar perfil).

**Backend (GraphQL):**

- Auth: `registerUser`, `loginUser`, `logoutUser`, `me`.
- Catálogo: `products`, `product`, `categories`, `category`.
- Admin: `createCategory`, `createProduct`, `updateProduct`, `deleteProduct` (solo admin).
- Órdenes: `createOrder`, `orders`, `order`.
- Socket.IO: broadcast de eventos de chat.

**CMS (Strapi):**

- CRUD de contenido para secciones como: header, hero, footer, newsletter, trust banner, categorías, featured products y otras entradas bajo `cms/src/api/*`.

### Fuera de alcance (por ahora)

- Integración real con pasarela de pago (Stripe/MercadoPago/PayPal), webhooks y conciliación.
- Gestión completa de envíos (tarifas por zona, carriers, tracking).
- Panel admin del ecommerce separado (más allá del CMS de contenido y scripts/operaciones).
- Moderación/almacenamiento persistente del chat (actualmente es broadcast sin DB).

## 4) Usuarios y roles

- **Visitante (guest):** navega catálogo, ve productos, usa chat.
- **Comprador registrado:** wishlist, carrito y creación de órdenes.
- **Vendedor:** perfil de vendedor (rubro + tienda).
- **Admin:** gestiona productos/categorías por GraphQL (y contenidos por Strapi).
- **Soporte:** usa chat/WhatsApp para ayudar.

## 5) Historias de usuario (priorizadas)

1. Como visitante, quiero ver la home con contenido editable para entender la propuesta.
2. Como visitante, quiero explorar categorías y ver productos.
3. Como usuario, quiero registrarme/iniciar sesión para guardar mi sesión.
4. Como usuario, quiero agregar productos al carrito y ver el total.
5. Como usuario, quiero guardar favoritos en wishlist.
6. Como usuario, quiero contactar soporte por chat o WhatsApp.
7. Como vendedor, quiero activar mi perfil de vendedor y definir rubro y datos de tienda.
8. Como usuario, quiero crear una orden con mis items.
9. Como admin, quiero crear/editar productos y categorías.

## 6) Requisitos funcionales

### 6.1 Frontend

- **Ruteo:** rutas base y páginas (home/categorías/plantillas/recursos).
- **Home:** renderiza secciones y datos de contenido desde Strapi cuando aplique.
- **Auth modal:**
  - Login (email + password).
  - Registro (name + email + password) y opción “I want to sell products”.
  - Al éxito: reset del store de Apollo para refrescar `me` y datos dependientes.
- **Carrito:**
  - Sidebar que se abre/cierra, lista items, permite remover.
  - Calcula subtotal/total (maneja precios string/number).
  - Botón “Proceder al pago” (placeholder hasta integrar pagos).
- **Wishlist:**
  - Sidebar similar a carrito (listar y remover).
- **Chat:**
  - Abrir/cerrar widget.
  - Enviar mensaje (socket `chat:message`).
  - Eliminar mensaje propio (socket `chat:delete`).
  - Limpiar local (actualmente local; si se desea global, se requiere evento/servidor).
  - Botón para abrir WhatsApp con mensaje prellenado.
- **Rubro:**
  - Selector y estado global para personalización/filtrado (context + hook).

### 6.2 Backend GraphQL

- **Autenticación:**
  - Cookie `token` httpOnly en login/registro.
  - `me` retorna usuario si existe sesión.
  - `logoutUser` limpia cookie.
- **Roles y permisos:**
  - Mutaciones admin-only validan `role === 'admin'`.
- **Catálogo:**
  - `products(filter, sort, pagination)` soporta búsqueda, filtro por categoría, rubro y rango de precio.
  - `product(id|slug)` retorna producto con categoría.
- **Órdenes:**
  - `createOrder(items, shippingAddress)` requiere auth.
  - Consultas `orders`/`order` devuelven órdenes del usuario autenticado.
- **Chat (Socket.IO):**
  - Broadcast simple de eventos: `chat:message`, `chat:delete` (y existe `chat:clear` en servidor).

### 6.3 CMS (Strapi)

- Debe permitir actualizar:
  - Header, hero, footer, newsletter, trust banner.
  - Categorías y configuraciones de productos destacados/tendencia.
- La API pública se consume desde el frontend con `GET /api/<endpoint>?populate=*`.

## 7) Requisitos no funcionales

- **Performance:**
  - LCP rápido en home (prioridad: imágenes optimizadas y carga progresiva).
  - Evitar over-fetching en Strapi (hoy se usa `populate=*`; optimizar en producción si crece el contenido).
- **Seguridad:**
  - Cookies httpOnly para JWT.
  - CORS controlado por `FRONTEND_ORIGIN` (permitir lista explícita en producción).
  - Sanitización/validación de inputs en mutaciones sensibles.
- **Confiabilidad:**
  - Endpoint `GET /health` para health checks.
- **SEO:**
  - `robots.txt` y `sitemap.xml` existentes en `public/` y `build/`.

## 8) Modelo de datos (alto nivel)

**User:** `name`, `email`, `role`, `isSeller`, `rubro`, `storeName`, `storeDescription`.

**Category:** `name`, `slug`, `parent`.

**Product:** `title`, `slug`, `description`, `originalPrice`, `descuentoPrice`, `images[]`, `category`, `inventory`, `attributes(JSON)`, `rating`, `active`, `rubro`, `badge`, `features[]`, `details[]`, `includes[]`, `longDescription`, `specs[]`.

**Order:** `user`, `items[{product, title, price, quantity}]`, `total`, `status`, `shippingAddress(JSON)`.

## 9) Integraciones y configuración

### Variables de entorno (propuesta)

**Frontend (Vite):**

- `VITE_GRAPHQL_URL` (default: `http://localhost:4000/graphql`)
- `VITE_STRAPI_URL` (default: `http://localhost:1337`)

**Backend (server):**

- `PORT` (default: 4000)
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_ORIGIN` (CSV de orígenes permitidos)
- `NODE_ENV`

## 10) Métricas de éxito

- Conversión de visita → “Add to cart”.
- Conversión de “Add to cart” → creación de orden.
- Tiempo promedio para encontrar un producto (búsqueda/filtrado).
- CTR del hero / featured products.
- Uso del chat (aperturas, mensajes enviados, clic a WhatsApp).

## 11) Riesgos / dependencias

- **Pagos/checkout:** el UI existe, pero sin integración real; definir proveedor y flujo.
- **CORS y cookies:** en producción (HTTPS + cross-site) se debe validar `sameSite` y dominios.
- **Chat:** sin persistencia ni moderación; para soporte real se recomienda almacenar en DB y roles.
- **Strapi populate=\*:** puede crecer demasiado; se recomienda especificar relaciones/fields.

## 12) Plan de entregas (sugerido)

- **Fase 1 (MVP UI + contenido):** home consumiendo Strapi, categorías, componentes base.
- **Fase 2 (Cuenta + catálogo real):** login/registro, queries de productos y filtros.
- **Fase 3 (Carrito → orden):** crear orden, shippingAddress, estados.
- **Fase 4 (Pagos):** integrar pasarela + webhooks.
- **Fase 5 (Operación):** admin UI o herramientas, analytics, hardening.

## 13) Preguntas abiertas

- ¿Cuál es el proveedor de pago objetivo y países/moneda?
- ¿El carrito y wishlist deben persistir (localStorage/DB) o solo memoria?
- ¿El catálogo viene 100% de GraphQL o parte desde Strapi?
- ¿Se requiere multi-idioma (i18n) en Strapi y frontend?
- ¿El chat debe ser 1:1 (soporte) y persistente o solo “broadcast demo”?
