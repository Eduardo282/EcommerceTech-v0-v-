import { useMemo, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { toast } from 'sonner';
import { CATEGORIES_QUERY, GET_ME, PRODUCTS_QUERY } from '../graphql/queries';
import {
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../graphql/mutations';

const EMPTY_FORM = {
  id: '',
  title: '',
  description: '',
  originalPrice: '',
  descuentoPrice: '',
  inventory: '0',
  categoryId: '',
  rubro: 'TECHNOLOGY',
  badge: '',
  images: '',
  features: '',
  active: true,
  isTrending: false,
};

function linesToArray(value) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function productToForm(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    originalPrice: String(product.originalPrice ?? ''),
    descuentoPrice: String(product.descuentoPrice ?? ''),
    inventory: String(product.inventory ?? 0),
    categoryId: product.category?.id || '',
    rubro: product.rubro || 'TECHNOLOGY',
    badge: product.badge || '',
    images: (product.images || []).join('\n'),
    features: (product.features || []).join('\n'),
    active: product.active !== false,
    isTrending: product.isTrending === true,
  };
}

function formToProductInput(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    originalPrice: Number(form.originalPrice),
    images: linesToArray(form.images),
    categoryId: form.categoryId,
    inventory: Number(form.inventory),
    active: form.active,
    isTrending: form.isTrending,
    rubro: form.rubro,
    badge: form.badge.trim() || null,
    features: linesToArray(form.features),
    descuentoPrice: form.descuentoPrice === '' ? null : Number(form.descuentoPrice),
  };
}

export function useAdminProducts() {
  const client = useApolloClient();
  const [form, setForm] = useState(EMPTY_FORM);
  const [newCategory, setNewCategory] = useState('');
  const { data: meData, loading: loadingMe } = useQuery(GET_ME);
  const {
    data: categoryData,
    loading: loadingCategories,
    error: categoryError,
    refetch: refetchCategories,
  } = useQuery(CATEGORIES_QUERY);
  const productVariables = useMemo(
    () => ({
      filter: {},
      sort: 'NEWEST',
      pagination: { page: 1, pageSize: 100 },
    }),
    []
  );
  const {
    data: productData,
    loading: loadingProducts,
    refetch: refetchProducts,
  } = useQuery(PRODUCTS_QUERY, { variables: productVariables });
  const [createCategory, { loading: creatingCategory }] = useMutation(CREATE_CATEGORY);
  const [createProduct, { loading: creatingProduct }] = useMutation(CREATE_PRODUCT);
  const [updateProduct, { loading: updatingProduct }] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct, { loading: deletingProduct }] = useMutation(DELETE_PRODUCT);

  const categories = categoryData?.categories || [];
  const products = productData?.products || [];
  const trendingProducts = products.filter((product) => product.isTrending);
  const regularProducts = products.filter((product) => !product.isTrending);
  const trendingLimitReached = trendingProducts.length >= 2 && !form.isTrending;
  const busy = creatingProduct || updatingProduct;

  const updateField = (field, value) =>
    setForm((current) => {
      if (field === 'isTrending' && value === true) {
        return { ...current, isTrending: true, active: true };
      }
      if (field === 'active' && value === false) {
        return { ...current, active: false, isTrending: false };
      }
      return { ...current, [field]: value };
    });

  const resetForm = () => setForm(EMPTY_FORM);

  const editProduct = (product) => {
    setForm(productToForm(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const { data } = await createCategory({ variables: { name: newCategory.trim() } });
      setNewCategory('');
      await refetchCategories();
      updateField('categoryId', data.createCategory.id);
      toast.success('Categoría creada.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = formToProductInput(form);

    try {
      if (form.id) {
        await updateProduct({ variables: { id: form.id, input } });
        toast.success('Producto actualizado.');
      } else {
        await createProduct({ variables: { input } });
        toast.success('Producto publicado.');
      }
      resetForm();
      await refetchProducts();
      await client.refetchQueries({ include: [PRODUCTS_QUERY] });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.title}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await deleteProduct({ variables: { id: product.id } });
      if (form.id === product.id) resetForm();
      await refetchProducts();
      await client.refetchQueries({ include: [PRODUCTS_QUERY] });
      toast.success('Producto eliminado.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
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
    isAdmin: meData?.me?.role === 'admin',
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
  };
}
