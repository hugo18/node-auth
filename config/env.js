import dotenv from 'dotenv';
dotenv.config();

export const config = {
    jwtsecret: process.env.JWT_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};