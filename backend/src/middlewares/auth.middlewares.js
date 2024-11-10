import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token" });
  }
};
