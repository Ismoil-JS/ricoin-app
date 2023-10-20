import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

