import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { corsOptions } from '../config/cors.js';
import { config } from '../config/env.js';

let ioInstance = null;
const chatMessageOwners = new Map();

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  // Middleware de autenticación y autorización
  io.use((socket, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie;
      if (cookieHeader) {
        // Extraemos el JWT de la cookie 'token'
        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const decoded = jwt.verify(tokenMatch[1], config.jwtSecret);
          socket.user = decoded; // Guardamos la info del usuario (incluyendo el rol) en el socket
        }
      }
    } catch {
      // Token inválido o expirado. Lo dejamos conectar pero como anónimo.
    }
    next();
  });

  io.on('connection', (socket) => {
    const userRole = socket.user?.role || 'Anónimo';
    console.log(`🔌 Nuevo cliente conectado a Socket.IO: ${socket.id} (Rol: ${userRole})`);

    socket.on('product:join', (productId) => {
      // Sanitizamos y validamos el input para evitar inyección
      if (productId && typeof productId === 'string' && productId.length < 50) {
        socket.join(`product:${productId}`);
      }
    });

    socket.on('product:leave', (productId) => {
      if (productId && typeof productId === 'string') {
        socket.leave(`product:${productId}`);
      }
    });

    socket.on('chat:message', (msg) => {
      // 1. Sanitización estricta del mensaje para prevenir XSS
      if (!msg || typeof msg !== 'object') return;

      const safeMsg = {
        id: msg.id,
        text: String(msg.text || '')
          .substring(0, 500)
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;'), // Max 500 chars + sanitizar HTML
        senderId: socket.id, // 2. Forzamos la identidad real del emisor desde el socket, no confiamos en lo que manda
        timestamp: msg.timestamp || new Date().toISOString(),
        role: socket.user?.role || 'user',
      };

      if (safeMsg.id) {
        chatMessageOwners.set(String(safeMsg.id), socket.id);
      }

      io.emit('chat:message', safeMsg);
    });

    socket.on('chat:clear', () => {
      // Solo el Administrador puede vaciar el chat global
      if (socket.user?.role === 'admin') {
        chatMessageOwners.clear();
        io.emit('chat:clear');
      } else {
        console.warn(`Intento no autorizado de vaciar el chat por: ${socket.id}`);
      }
    });

    socket.on('chat:delete', (id) => {
      const messageId = String(id || '');
      const isOwner = chatMessageOwners.get(messageId) === socket.id;
      const isAdmin = socket.user?.role === 'admin';

      if (messageId && (isOwner || isAdmin)) {
        chatMessageOwners.delete(messageId);
        io.emit('chat:delete', messageId);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 Cliente desconectado:', socket.id);
    });
  });

  ioInstance = io;
  return io;
}

export function emitProductEvent(productId, eventName, payload) {
  if (!ioInstance || !productId) return;
  ioInstance.to(`product:${productId}`).emit(eventName, payload);
}
