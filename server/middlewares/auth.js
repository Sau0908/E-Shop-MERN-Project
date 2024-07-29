import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.JWT_SECRET || "test");
    req.userId = decodeData?.id;
    req.userEmail = decodeData?.email;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (req.userEmail === adminEmail) {
      next();
    } else {
      res.status(403).json({ message: "Access Denied. You are not an admin." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { auth, isAdmin };
