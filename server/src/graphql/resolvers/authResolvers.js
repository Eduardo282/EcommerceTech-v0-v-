import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { User } from '../../models/User.js';
import { config } from '../../config/env.js';
import { requireAuth } from '../resolverUtils.js';

const authCookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createAuthToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: '7d',
  });
}

function setAuthCookie(res, token) {
  res.cookie('token', token, authCookieOptions);
}

export const authQueries = {
  me: (_, __, ctx) => ctx.user || null,
};

export const authMutations = {
  registerUser: async (_, { name, email, password }, { res }) => {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new GraphQLError('Email en uso', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const user = await User.create({ name, email, password });
    setAuthCookie(res, createAuthToken(user));

    return { user };
  },

  loginUser: async (_, { email, password }, { res }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new GraphQLError('Credenciales inválidas', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      throw new GraphQLError('Credenciales inválidas', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    }

    setAuthCookie(res, createAuthToken(user));

    return { user };
  },

  logoutUser: async (_, __, { res }) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: 'lax',
    });
    return true;
  },

  setSellerProfile: async (_, { rubro, storeName, storeDescription }, ctx) => {
    const user = requireAuth(ctx);
    return User.findByIdAndUpdate(
      user.id,
      {
        isSeller: true,
        rubro,
        storeName,
        storeDescription: storeDescription || '',
      },
      { new: true }
    );
  },
};
