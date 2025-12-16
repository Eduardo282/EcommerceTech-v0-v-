import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function buildContext({ req, res }) {
  // Intenta obtener el token de la cookie primero, luego del encabezado
  const token = req.cookies.token || (req.headers.authorization || '').replace('Bearer ', '');

  if (!token) return { user: null, res };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    return { user, res };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { user: null, res };
  }
}
