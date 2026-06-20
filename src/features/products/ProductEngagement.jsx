import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { toast } from 'sonner';
import {
  GET_ME,
  PRODUCT_ENGAGEMENT_QUERY,
  PRODUCT_REVIEWS_QUERY,
} from '../../graphql/queries';
import {
  DELETE_PRODUCT_REVIEW,
  RECORD_PRODUCT_VIEW,
  SAVE_PRODUCT_REVIEW,
  TOGGLE_PRODUCT_LIKE,
} from '../../graphql/mutations';
import { socket } from '../../lib/socketClient';

export function ProductEngagement({ productId }) {
  const client = useApolloClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [draftChanged, setDraftChanged] = useState(false);
  const { data: meData } = useQuery(GET_ME);
  const {
    data: engagementData,
    loading: engagementLoading,
    refetch: refetchEngagement,
  } = useQuery(PRODUCT_ENGAGEMENT_QUERY, {
    variables: { productId },
    skip: !productId,
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: reviewsData,
    loading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery(PRODUCT_REVIEWS_QUERY, {
    variables: { productId, limit: 20 },
    skip: !productId,
    fetchPolicy: 'cache-and-network',
  });
  const [toggleLike, { loading: togglingLike }] = useMutation(TOGGLE_PRODUCT_LIKE);
  const [recordView] = useMutation(RECORD_PRODUCT_VIEW);
  const [saveReview, { loading: savingReview }] = useMutation(SAVE_PRODUCT_REVIEW);
  const [deleteReview, { loading: deletingReview }] = useMutation(DELETE_PRODUCT_REVIEW);

  const engagement = engagementData?.productEngagement;
  const reviews = useMemo(() => reviewsData?.productReviews || [], [reviewsData]);
  const ownReview = reviews.find((review) => review.user.id === meData?.me?.id);
  const displayedRating = draftChanged ? rating : ownReview?.rating || rating;
  const displayedComment = draftChanged ? comment : ownReview?.comment || comment;

  const syncProductCache = useCallback((nextEngagement) => {
    if (!nextEngagement) return;
    const cacheId = client.cache.identify({
      __typename: 'Product',
      id: String(productId),
    });
    if (!cacheId) return;
    client.cache.modify({
      id: cacheId,
      fields: {
        likesCount: () => nextEngagement.likesCount,
        reviewsCount: () => nextEngagement.reviewsCount,
        rating: () => nextEngagement.rating,
        viewsCount: () => nextEngagement.viewsCount,
      },
    });
  }, [client, productId]);

  useEffect(() => {
    if (!productId) return undefined;
    const viewKey = `product-viewed:${productId}`;
    if (!sessionStorage.getItem(viewKey)) {
      sessionStorage.setItem(viewKey, '1');
      recordView({ variables: { productId } })
        .then(({ data }) => syncProductCache(data?.recordProductView))
        .catch(() => sessionStorage.removeItem(viewKey));
    }
    if (!socket.connected) socket.connect();

    const refresh = async () => {
      const [{ data }] = await Promise.all([refetchEngagement(), refetchReviews()]);
      syncProductCache(data?.productEngagement);
    };

    socket.emit('product:join', productId);
    socket.on('product:engagement-updated', refresh);
    socket.on('product:review-saved', refresh);
    socket.on('product:review-deleted', refresh);

    return () => {
      socket.emit('product:leave', productId);
      socket.off('product:engagement-updated', refresh);
      socket.off('product:review-saved', refresh);
      socket.off('product:review-deleted', refresh);
    };
  }, [productId, recordView, refetchEngagement, refetchReviews, syncProductCache]);

  const requireSession = () => {
    if (meData?.me) return true;
    toast.error('Iniciá sesión para participar.');
    return false;
  };

  const handleLike = async () => {
    if (!requireSession()) return;
    try {
      const { data } = await toggleLike({
        variables: { productId },
        refetchQueries: [{ query: PRODUCT_ENGAGEMENT_QUERY, variables: { productId } }],
      });
      syncProductCache(data?.toggleProductLike);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReview = async (event) => {
    event.preventDefault();
    if (!requireSession()) return;
    try {
      await saveReview({
        variables: {
          productId,
          rating: Number(displayedRating),
          comment: displayedComment,
        },
      });
      const [, { data }] = await Promise.all([refetchReviews(), refetchEngagement()]);
      syncProductCache(data?.productEngagement);
      setDraftChanged(false);
      toast.success(ownReview ? 'Reseña actualizada.' : 'Reseña publicada.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview({ variables: { productId } });
      setRating(5);
      setComment('');
      setDraftChanged(false);
      const [, { data }] = await Promise.all([refetchReviews(), refetchEngagement()]);
      syncProductCache(data?.productEngagement);
      toast.success('Reseña eliminada.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="mt-6 border-t border-white/10 pt-5" aria-label="Product reviews">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm text-[#E4D9AF]">Opiniones</h3>
          <p className="text-xs text-[#898989]">
            {engagementLoading
              ? 'Cargando actividad...'
              : `${engagement?.rating || 0}/5 · ${engagement?.reviewsCount || 0} reseñas`}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLike}
          disabled={togglingLike}
          className="rounded-xl border border-white/10 px-3 py-2 text-sm text-[#E4D9AF] cursor-pointer disabled:opacity-50"
          aria-pressed={engagement?.liked || false}
        >
          {engagement?.liked ? '♥' : '♡'} {engagement?.likesCount || 0}
        </button>
      </div>

      <form onSubmit={handleReview} className="space-y-3 mb-6">
        <label className="block text-xs text-[#E4D9AF]">
          Calificación
          <select
            value={displayedRating}
            onChange={(event) => {
              setRating(Number(event.target.value));
              setComment(displayedComment);
              setDraftChanged(true);
            }}
            className="mt-1 w-full rounded-lg bg-[#2c2c30] px-3 py-2 text-white"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} estrellas
              </option>
            ))}
          </select>
        </label>
        <textarea
          value={displayedComment}
          onChange={(event) => {
            setComment(event.target.value);
            setRating(displayedRating);
            setDraftChanged(true);
          }}
          minLength={3}
          maxLength={2000}
          required
          rows={3}
          placeholder="Contá tu experiencia con este producto"
          className="w-full resize-y rounded-lg bg-[#2c2c30] px-3 py-2 text-sm text-white placeholder:text-[#898989]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={savingReview}
            className="rounded-lg bg-[#F9B61D] px-4 py-2 text-sm font-semibold text-black cursor-pointer disabled:opacity-50"
          >
            {ownReview ? 'Actualizar reseña' : 'Publicar reseña'}
          </button>
          {ownReview && (
            <button
              type="button"
              onClick={handleDeleteReview}
              disabled={deletingReview}
              className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-300 cursor-pointer disabled:opacity-50"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {reviewsLoading && reviews.length === 0 && (
          <p className="text-sm text-[#898989]">Cargando reseñas...</p>
        )}
        {!reviewsLoading && reviews.length === 0 && (
          <p className="text-sm text-[#898989]">Todavía no hay reseñas. Sé el primero.</p>
        )}
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl bg-white/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-[#E4D9AF]">{review.user.name}</strong>
              <span className="text-xs text-[#FACE2F]">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="mt-2 text-sm text-[#b5b5b5] whitespace-pre-wrap">{review.comment}</p>
            <time className="mt-2 block text-[11px] text-[#737373]">
              {new Date(review.updatedAt).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}

ProductEngagement.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
