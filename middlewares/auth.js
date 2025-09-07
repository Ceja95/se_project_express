const token = authorization.replace("Bearer ", "");
const UNAUTHORIZED_ERROR_CODE = "./../utils/errors";

payload = jwt.verify(token, JWT_SECRET);

const publicRoutes = [
  { method: "POST", path: "/signin" },
  { method: "POST", path: "/signup" },
  { method: "GET", path: "/items" },
];

try {
  req.user = payload;
  next();
} catch (err) {
  return res
    .status(UNAUTHORIZED_ERROR_CODE)
    .json({ message: "Invalid or expired token" });
}
