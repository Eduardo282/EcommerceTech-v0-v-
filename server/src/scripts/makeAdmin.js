import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

async function run() {
  // Simple argv parser: soporta --email=value o --email value o -e value
  const argv = process.argv.slice(2);
  let email = process.env.EMAIL || null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    
    if (arg.startsWith('--email=')) {
      email = arg.split('=')[1];
      break;
    } else if (arg === '--email' || arg === '-e') {
      email = argv[i + 1];
      break;
    } else {
      // Fallbacks: acepta un correo sin prefijo o incluso "-- alguien@example.com"
      const cleaned = arg.replace(/^--+/, '');
      if (!email && cleaned.includes('@') && cleaned.includes('.')) {
        email = cleaned;
      }
    }
  }

  if (!email) {
    console.error('Uso: npm run make-admin -- --email=user@example.com');
    process.exit(1);
  }

  await connectDB(process.env.MONGODB_URI);
  const user = await User.findOne({ email });

  if (!user) {
    console.error(`Usuario no encontrado: ${email}`);
    process.exit(1);
  }
  if (user.role === 'admin') {
    console.log(`El usuario ${email} ya es admin`);
    process.exit(0);
  }
  
  user.role = 'admin';

  await user.save();
  console.log(`✅ Promovido a admin: ${email}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
