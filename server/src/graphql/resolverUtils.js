import { GraphQLError } from 'graphql';

const authError = new GraphQLError('No autorizado', {
  extensions: { code: 'UNAUTHENTICATED' },
});

export function requireAuth(ctx) {
  if (!ctx.user) throw authError;
  return ctx.user;
}

export function requireAdmin(ctx) {
  const user = requireAuth(ctx);
  if (user.role !== 'admin') {
    throw new GraphQLError('Solo Administrador', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
  return user;
}
