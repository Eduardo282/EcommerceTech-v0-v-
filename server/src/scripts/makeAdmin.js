import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

async function run() {
  // Simple argv parser: supports --email=value or --email value or -e value
  const argv = process.argv.slice(2);
  let email = process.env.EMAIL || null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--email=")) {
      email = arg.split("=")[1];
      break;
    } else if (arg === "--email" || arg === "-e") {
      email = argv[i + 1];
      break;
    } else {
      // Fallbacks: accept a bare email or even "--someone@example.com"
      const cleaned = arg.replace(/^--+/, "");
      if (!email && cleaned.includes("@") && cleaned.includes(".")) {
        email = cleaned;
      }
    }
  }
  if (!email) {
    console.error("Usage: npm run make-admin -- --email=user@example.com");
    process.exit(1);
  }

  await connectDB(process.env.MONGODB_URI);
  const user = await User.findOne({ email });
  if (!user) {
    console.error(`User not found: ${email}`);
    process.exit(1);
  }
  if (user.role === "admin") {
    console.log(`User is already admin: ${email}`);
    process.exit(0);
  }
  user.role = "admin";
  await user.save();
  console.log(`✅ Promoted to admin: ${email}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
