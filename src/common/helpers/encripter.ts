import { hashSync } from 'bcryptjs';

export const hashPassword = (password: string) => {
    return hashSync(password, 10);
}

export const comparePassword = (password: string, hash: string) => {
    return hashSync(password, 10) === hash;
}

// export const generateToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
// }

// export const verifyToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }

// export const generateRefreshToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
// }

// export const verifyRefreshToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }

// export const generateAccessToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
// }

// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }
