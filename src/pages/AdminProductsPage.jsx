import PropTypes from 'prop-types';
import { useAdminProducts } from './useAdminProducts';

export function AdminProductsPage() {
  const {
    busy,
    categories,
    categoryError,
    creatingCategory,
    deletingProduct,
    editProduct,
    form,
    handleCategory,
    handleDelete,
    handleSubmit,
    isAdmin,
    loadingCategories,
    loadingMe,
    loadingProducts,
    newCategory,
    refetchCategories,
    regularProducts,
    resetForm,
    setNewCategory,
    trendingLimitReached,
    trendingProducts,
    updateField,
  } = useAdminProducts();

  if (loadingMe) {
    return <main className="min-h-[60vh] p-8 text-white">Verificando permisos...</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[60vh] p-8 text-white">
        <div className="mx-auto max-w-xl rounded-2xl bg-[#111115] p-8">
          <h1 className="text-2xl text-[#E4D9AF]">Acceso administrativo</h1>
          <p className="mt-3 text-[#898989]">
            Iniciá sesión con una cuenta administradora para gestionar el catálogo.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08080b] px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[420px_1fr]">
        <section className="h-fit rounded-2xl border border-white/10 bg-[#111115] p-6 lg:sticky lg:top-32">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#F9B61D]">Backoffice</p>
              <h1 className="mt-1 text-2xl text-[#E4D9AF]">
                {form.id ? 'Editar producto' : 'Nuevo producto'}
              </h1>
            </div>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-[#898989] cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminField label="Título">
              <input
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                required
                className="admin-input"
              />
            </AdminField>
            <AdminField label="Descripción">
              <textarea
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                rows={3}
                className="admin-input"
              />
            </AdminField>
            <div className="grid grid-cols-2 gap-3">
              <AdminField label="Precio">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.originalPrice}
                  onChange={(event) => updateField('originalPrice', event.target.value)}
                  required
                  className="admin-input"
                />
              </AdminField>
              <AdminField label="Precio oferta">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.descuentoPrice}
                  onChange={(event) => updateField('descuentoPrice', event.target.value)}
                  className="admin-input"
                />
              </AdminField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <AdminField label="Inventario">
                <input
                  type="number"
                  min="0"
                  value={form.inventory}
                  onChange={(event) => updateField('inventory', event.target.value)}
                  required
                  className="admin-input"
                />
              </AdminField>
              <AdminField label="Tienda">
                <select
                  value={form.rubro}
                  onChange={(event) => updateField('rubro', event.target.value)}
                  className="admin-input"
                >
                  <option value="TECHNOLOGY">Technology</option>
                  <option value="GAMING">Gaming</option>
                </select>
              </AdminField>
            </div>
            <AdminField label="Categoría">
              <select
                value={form.categoryId}
                onChange={(event) => updateField('categoryId', event.target.value)}
                required
                disabled={loadingCategories || Boolean(categoryError)}
                className="admin-input"
              >
                <option value="">
                  {loadingCategories
                    ? 'Cargando categorías...'
                    : categoryError
                      ? 'No se pudieron cargar las categorías'
                      : 'Seleccioná una categoría'}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </AdminField>
            {categoryError && (
              <button
                type="button"
                onClick={() => refetchCategories()}
                className="text-left text-xs text-red-300 underline cursor-pointer"
              >
                Reintentar carga de categorías
              </button>
            )}
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="Nueva categoría"
                className="admin-input"
              />
              <button
                type="button"
                onClick={handleCategory}
                disabled={creatingCategory}
                className="rounded-lg border border-[#F9B61D]/40 px-3 text-sm text-[#F9B61D] cursor-pointer disabled:opacity-50"
              >
                Crear
              </button>
            </div>
            <AdminField label="Imágenes (una URL por línea)">
              <textarea
                value={form.images}
                onChange={(event) => updateField('images', event.target.value)}
                rows={4}
                required
                className="admin-input"
              />
            </AdminField>
            <AdminField label="Características (una por línea)">
              <textarea
                value={form.features}
                onChange={(event) => updateField('features', event.target.value)}
                rows={3}
                className="admin-input"
              />
            </AdminField>
            <AdminField label="Etiqueta">
              <input
                value={form.badge}
                onChange={(event) => updateField('badge', event.target.value)}
                placeholder="Nuevo, Oferta..."
                className="admin-input"
              />
            </AdminField>
            <fieldset className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <legend className="px-2 text-sm text-[#F9B61D]">Ubicación en la tienda</legend>
              <label className="flex items-center gap-2 text-sm text-[#E4D9AF]">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => updateField('active', event.target.checked)}
                />
                Producto visible en la tienda
              </label>
              <label className="flex items-start gap-2 text-sm text-[#E4D9AF]">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(event) => updateField('isTrending', event.target.checked)}
                  disabled={trendingLimitReached}
                  className="mt-1"
                />
                <span>
                  Mostrar en Productos en tendencias
                  <span className="mt-1 block text-xs text-[#898989]">
                    {trendingLimitReached
                      ? 'Los 2 cupos están ocupados. Quitá uno antes de seleccionar otro.'
                      : 'El producto ocupará uno de los 2 cupos y será visible automáticamente.'}
                  </span>
                </span>
              </label>
            </fieldset>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-[#F9B61D] px-4 py-3 font-semibold text-black cursor-pointer disabled:opacity-50"
            >
              {busy ? 'Guardando...' : form.id ? 'Guardar cambios' : 'Publicar producto'}
            </button>
          </form>
        </section>

        <section className="space-y-10">
          {loadingProducts ? (
            <p className="text-[#898989]">Cargando catálogo...</p>
          ) : (
            <>
              <ProductAdminSection
                eyebrow="Selección editorial"
                title="Productos en tendencias · máximo 2"
                products={trendingProducts}
                emptyMessage="Todavía no seleccionaste productos para Tendencias."
                onEdit={editProduct}
                onDelete={handleDelete}
                deleting={deletingProduct}
                highlighted
              />
              <ProductAdminSection
                eyebrow="Catálogo"
                title={`${regularProducts.length} productos generales`}
                products={regularProducts}
                emptyMessage="Todos los productos actuales están marcados como tendencia."
                onEdit={editProduct}
                onDelete={handleDelete}
                deleting={deletingProduct}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductAdminSection({
  eyebrow,
  title,
  products,
  emptyMessage,
  onEdit,
  onDelete,
  deleting,
  highlighted = false,
}) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#F9B61D]">{eyebrow}</p>
        <h2 className="text-2xl text-[#E4D9AF]">
          {title} <span className="text-base text-[#898989]">({products.length})</span>
        </h2>
      </div>
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#111115]/60 p-6 text-sm text-[#898989]">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.id}
              className={`flex gap-4 rounded-2xl bg-[#111115] p-4 ${
                highlighted
                  ? 'border border-[#F9B61D]/40 shadow-[0_0_24px_rgba(249,182,29,0.08)]'
                  : 'border border-white/10'
              }`}
            >
              <img
                src={product.images?.[0]}
                alt=""
                className="h-24 w-24 rounded-xl bg-black object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-[#E4D9AF]">{product.title}</h3>
                    <p className="text-sm text-[#898989]">
                      ${Number(product.descuentoPrice ?? product.originalPrice).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {highlighted && (
                      <span className="rounded-full bg-[#F9B61D]/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#F9B61D]">
                        Tendencia
                      </span>
                    )}
                    <span
                      className={product.active ? 'text-xs text-green-400' : 'text-xs text-red-300'}
                    >
                      {product.active ? 'Visible' : 'Oculto'}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#898989]">
                  Stock {product.inventory || 0} · {product.reviewsCount || 0} reseñas ·{' '}
                  {product.likesCount || 0} likes
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-sm cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product)}
                    disabled={deleting}
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-300 cursor-pointer disabled:opacity-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function AdminField({ label, children }) {
  return (
    <label className="block text-sm text-[#E4D9AF]">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}

AdminField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

ProductAdminSection.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool,
};
