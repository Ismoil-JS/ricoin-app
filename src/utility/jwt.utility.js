import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, "secret");
}

export const verifyToken = (token) => {
    return jwt.verify(token, "secret");
}

