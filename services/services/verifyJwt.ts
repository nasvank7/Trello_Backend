import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
    token?: JwtPayload; 
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract token from cookies
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).send('Please authenticate');
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.token = decoded;

        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(401).send('Please authenticate');
    }
};
