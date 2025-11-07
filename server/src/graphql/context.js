import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function buildContext({ req }) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return { user: null };
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    return { user };
  } catch (e) {
    return { user: null };
  }
}
