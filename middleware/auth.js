const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in." });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch {
    res.status(401).json({ message: "Session expired. Please log in again." });
  }
}

const requireOwner = (req, res, next) =>
  req.user?.role === "owner" ? next() : res.status(403).json({ message: "Owners only." });

const requireCustomer = (req, res, next) =>
  req.user?.role === "customer" ? next() : res.status(403).json({ message: "Customers only." });

module.exports = { requireAuth, requireOwner, requireCustomer };