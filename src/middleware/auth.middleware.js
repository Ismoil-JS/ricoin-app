import userService from "../module/user/user.service.js";
import { config } from "dotenv";
import { verifyToken } from "../utility/jwt.utility.js";
config();

// Authorize user
export const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, authorization denied." });  

    const verified = verifyToken(token);
    if (!verified)
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied." });

      
    req.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin authorization
export const adminAuth = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user);
  
    if (user[0].role !== 'admin')
      return res
        .status(401)
        .json({ message: "Admin resources access denied." });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};