import 'dotenv/config';
import { Product } from '../src/models/Product.js';
import { connectDB } from '../src/config/db.js';

async function setRubrosSmart() {
  try {
    await connectDB(process.env.MONGODB_URI);

    const allProducts = await Product.find();

    if (allProducts.length === 0) {
      console.log('No products found.');
      return;
    }

    const gamingKeywords = [
      'Gaming',
      'Controller',
      'Arcade',
      'Pixel',
      'Royale',
      'Skins',
      'HUD',
      'Stream',
      'Twitch',
      'Esports',
      'Console',
      'SFX',
      'Map',
      'Pack',
      'Asset',
      'Fantasy',
      'RPG',
      'FPS',
      'Headset',
      'Soundtrack',
      'Arena',
      'Cyber',
    ];
    const techKeywords = [
      'Dashboard',
      'UI Kit',
      'App',
      'Website',
      'Code',
      'Script',
      'Template',
      'SaaS',
      'Admin',
      'Analytics',
      'Mobile',
    ];

    for (const product of allProducts) {
      let rubro = 'TECHNOLOGY'; // Default

      const titleLower = product.title.toLowerCase();

      // Check for Gaming keywords
      if (gamingKeywords.some((k) => titleLower.includes(k.toLowerCase()))) {
        rubro = 'GAMING';
      }
      // Check for Tech keywords (override if specific)
      else if (techKeywords.some((k) => titleLower.includes(k.toLowerCase()))) {
        rubro = 'TECHNOLOGY';
      }
      // If ambiguous, fallback to previous logic (50/50 split based on ID or something, but here we'll just keep default or random if needed)
      // For now, let's stick to the keyword match.

      product.rubro = rubro;
      await product.save();
      console.log(`Updated ${product.title} -> ${rubro}`);
    }

    console.log('Successfully updated product rubros with smart logic.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating rubros:', error);
    process.exit(1);
  }
}

setRubrosSmart();
