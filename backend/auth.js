import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const jwt_Secret = process.env.JWT_SECRET;

export function middleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, jwt_Secret)
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}