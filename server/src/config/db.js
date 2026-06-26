import mongoose from 'mongoose';

export async function connectDB(uri, dbName) {
  if (!uri) throw new Error('MONGODB_URI es requerido');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    dbName,
  });
  console.log('✅ MongoDB conectado');
}
