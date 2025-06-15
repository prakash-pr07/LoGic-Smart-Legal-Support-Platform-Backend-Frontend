import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Check if user is Client
export const isClient = (req, res, next) => {
  if (req.user.role !== "Client") {
    return res.status(403).json({ message: "Access denied. Client only." });
  }
  next();
};

// ✅ Check if user is Lawyer
export const isLawyer = (req, res, next) => {
  if (req.user.role !== "Lawyer") {
    return res.status(403).json({ message: "Access denied. Lawyer only." });
  }
  next();
};

// ✅ Check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// ✅ Check if user is Premium
export const checkPremium = (req, res, next) => {
  if (!req.user || !req.user.isPremium) {
    return res.status(403).json({ message: "Access denied. Premium required." });
  }
  next();
};
